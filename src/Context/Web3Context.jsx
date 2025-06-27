import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';

const Web3Context = createContext();

// USDT Contract Address on BSC (BEP-20)
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

// USDT ABI (minimal - for balance and transfer functions)
const USDT_ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    'function name() view returns (string)'
];

// BSC Network Configuration
const BSC_NETWORK = {
    chainId: '0x38', // 56 in hex
    chainName: 'BSC Mainnet',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
};

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [balance, setBalance] = useState('0');
    const [usdtBalance, setUsdtBalance] = useState('0');
    const [chainId, setChainId] = useState(null);
    const [walletType, setWalletType] = useState(null);
    
    const toast = useToast();

    // Available wallet types
    const walletTypes = [
        {
            name: 'MetaMask',
            id: 'metamask',
            provider: 'ethereum',
            icon: '🦊',
            downloadUrl: 'https://metamask.io/download/',
        },
        {
            name: 'Trust Wallet',
            id: 'trustwallet',
            provider: 'ethereum',
            icon: '🛡️',
            downloadUrl: 'https://trustwallet.com/download',
        },
        {
            name: 'Binance Wallet',
            id: 'binance',
            provider: 'BinanceChain',
            icon: '🟡',
            downloadUrl: 'https://www.binance.org/en/smartChain',
        },
    ];

    // Check if wallet is installed
    const isWalletInstalled = (walletId) => {
        switch (walletId) {
            case 'metamask':
                return typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;
            case 'trustwallet':
                return typeof window !== 'undefined' && window.ethereum && window.ethereum.isTrust;
            case 'binance':
                return typeof window !== 'undefined' && window.BinanceChain;
            default:
                return false;
        }
    };

    // Get provider based on wallet type
    const getProvider = (walletId) => {
        switch (walletId) {
            case 'metamask':
            case 'trustwallet':
                return window.ethereum;
            case 'binance':
                return window.BinanceChain;
            default:
                return window.ethereum;
        }
    };

    // Connect to wallet
    const connectWallet = async (walletId = 'metamask') => {
        try {
            setIsConnecting(true);

            if (!isWalletInstalled(walletId)) {
                const wallet = walletTypes.find(w => w.id === walletId);
                toast({
                    title: `${wallet.name} Not Found`,
                    description: `Please install ${wallet.name} extension to continue.`,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
                window.open(wallet.downloadUrl, '_blank');
                return false;
            }

            const walletProvider = getProvider(walletId);
            const ethersProvider = new ethers.BrowserProvider(walletProvider);

            // Request account access
            const accounts = await ethersProvider.send('eth_requestAccounts', []);
            
            if (!accounts || accounts.length === 0) {
                throw new Error('No accounts found');
            }

            const signer = await ethersProvider.getSigner();
            const address = await signer.getAddress();
            const network = await ethersProvider.getNetwork();

            // Check if on BSC network
            if (network.chainId !== 56n) {
                try {
                    await walletProvider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: BSC_NETWORK.chainId }],
                    });
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask
                    if (switchError.code === 4902) {
                        try {
                            await walletProvider.request({
                                method: 'wallet_addEthereumChain',
                                params: [BSC_NETWORK],
                            });
                        } catch (addError) {
                            console.error('Failed to add BSC network:', addError);
                            throw new Error('Failed to add BSC network');
                        }
                    } else {
                        throw new Error('Failed to switch to BSC network');
                    }
                }
            }

            setProvider(ethersProvider);
            setSigner(signer);
            setAccount(address);
            setIsConnected(true);
            setChainId(network.chainId.toString());
            setWalletType(walletId);

            // Get balances
            await updateBalances(address, ethersProvider);

            // Store connection in localStorage
            localStorage.setItem('walletConnected', walletId);
            localStorage.setItem('walletAccount', address);

            toast({
                title: 'Wallet Connected!',
                description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            return true;

        } catch (error) {
            console.error('Failed to connect wallet:', error);
            toast({
                title: 'Connection Failed',
                description: error.message || 'Failed to connect wallet',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return false;
        } finally {
            setIsConnecting(false);
        }
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setSigner(null);
        setIsConnected(false);
        setBalance('0');
        setUsdtBalance('0');
        setChainId(null);
        setWalletType(null);

        // Clear localStorage
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAccount');

        toast({
            title: 'Wallet Disconnected',
            description: 'Your wallet has been disconnected.',
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
    };

    // Update balances
    const updateBalances = async (address, ethersProvider) => {
        try {
            // Get BNB balance
            const bnbBalance = await ethersProvider.getBalance(address);
            setBalance(ethers.formatEther(bnbBalance));

            // Get USDT balance
            const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, ethersProvider);
            const usdtBal = await usdtContract.balanceOf(address);
            setUsdtBalance(ethers.formatUnits(usdtBal, 18)); // USDT has 18 decimals on BSC

        } catch (error) {
            console.error('Failed to get balances:', error);
        }
    };

    // Send USDT transaction
    const sendUSDT = async (toAddress, amount) => {
        try {
            if (!signer || !isConnected) {
                throw new Error('Wallet not connected');
            }

            const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);
            const amountInWei = ethers.parseUnits(amount.toString(), 18);

            // Check balance
            const balance = await usdtContract.balanceOf(await signer.getAddress());
            if (balance < amountInWei) {
                throw new Error('Insufficient USDT balance');
            }

            // Send transaction
            const tx = await usdtContract.transfer(toAddress, amountInWei);
            
            toast({
                title: 'Transaction Sent',
                description: `Transaction hash: ${tx.hash}`,
                status: 'info',
                duration: 5000,
                isClosable: true,
            });

            // Wait for confirmation
            const receipt = await tx.wait();
            
            // Update balances
            await updateBalances(await signer.getAddress(), provider);

            return {
                success: true,
                hash: tx.hash,
                receipt,
            };

        } catch (error) {
            console.error('USDT transfer failed:', error);
            toast({
                title: 'Transaction Failed',
                description: error.message || 'Failed to send USDT',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return {
                success: false,
                error: error.message,
            };
        }
    };

    // Auto-reconnect on page load
    useEffect(() => {
        const autoConnect = async () => {
            const savedWallet = localStorage.getItem('walletConnected');
            const savedAccount = localStorage.getItem('walletAccount');
            
            if (savedWallet && savedAccount && isWalletInstalled(savedWallet)) {
                try {
                    const walletProvider = getProvider(savedWallet);
                    const accounts = await walletProvider.request({ method: 'eth_accounts' });
                    
                    if (accounts.includes(savedAccount)) {
                        await connectWallet(savedWallet);
                    } else {
                        // Clear saved data if account not found
                        localStorage.removeItem('walletConnected');
                        localStorage.removeItem('walletAccount');
                    }
                } catch (error) {
                    console.error('Auto-reconnect failed:', error);
                }
            }
        };

        autoConnect();
    }, []);

    // Listen for account changes
    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else if (accounts[0] !== account) {
                    setAccount(accounts[0]);
                    updateBalances(accounts[0], provider);
                }
            };

            const handleChainChanged = (chainId) => {
                setChainId(parseInt(chainId, 16).toString());
                window.location.reload(); // Refresh page on network change
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                if (window.ethereum.removeListener) {
                    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    window.ethereum.removeListener('chainChanged', handleChainChanged);
                }
            };
        }
    }, [account, provider]);

    const value = {
        // State
        account,
        provider,
        signer,
        isConnected,
        isConnecting,
        balance,
        usdtBalance,
        chainId,
        walletType,
        walletTypes,
        
        // Functions
        connectWallet,
        disconnectWallet,
        sendUSDT,
        updateBalances,
        isWalletInstalled,
        
        // Constants
        USDT_CONTRACT_ADDRESS,
        BSC_NETWORK,
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};

export default Web3Context;