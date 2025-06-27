import React from 'react';
import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
    Badge,
    Icon,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Tooltip,
} from '@chakra-ui/react';
import {
    FiRefreshCw,
    FiCopy,
    FiExternalLink,
    FiLogOut,
    FiDollarSign
} from 'react-icons/fi';
import { useWeb3 } from '../Context/Web3Context';
import { MdWallet } from 'react-icons/md';

const WalletStatus = ({ onConnect, size = 'md', variant = 'solid' }) => {
    const {
        account,
        isConnected,
        balance,
        usdtBalance,
        walletType,
        disconnectWallet,
        updateBalances,
        chainId
    } = useWeb3();

    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const copyAddress = async () => {
        if (account) {
            try {
                await navigator.clipboard.writeText(account);
                // You might want to add a toast here
            } catch (err) {
                console.error('Failed to copy address:', err);
            }
        }
    };

    const openInExplorer = () => {
        if (account) {
            window.open(`https://bscscan.com/address/${account}`, '_blank');
        }
    };

    const handleRefreshBalances = async () => {
        if (account && window.ethereum) {
            await updateBalances(account, window.ethereum);
        }
    };

    const getWalletIcon = () => {
        switch (walletType) {
            case 'metamask':
                return '🦊';
            case 'trustwallet':
                return '🛡️';
            case 'binance':
                return '🟡';
            default:
                return '👛';
        }
    };

    if (!isConnected) {
        return (
            <Button
                colorScheme="blue"
                leftIcon={<MdWallet />}
                onClick={onConnect}
                size={size}
                variant={variant}
            >
                Connect Wallet
            </Button>
        );
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="outline"
                size={size}
                bg={bgColor}
                border="2px"
                borderColor={borderColor}
                _hover={{ borderColor: 'blue.300' }}
                _active={{ borderColor: 'blue.400' }}
            >
                <HStack spacing={3}>
                    <Box fontSize="lg">{getWalletIcon()}</Box>
                    <VStack spacing={0} align="start">
                        <HStack spacing={2}>
                            <Box fontSize="sm" fontWeight="semibold">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </Box>
                            <Badge
                                colorScheme={chainId === '56' ? 'green' : 'orange'}
                                size="sm"
                                variant="subtle"
                            >
                                {chainId === '56' ? 'BSC' : 'Wrong Network'}
                            </Badge>
                        </HStack>
                        <Box fontSize="xs" color="gray.600">
                            {parseFloat(usdtBalance).toFixed(2)} USDT
                        </Box>
                    </VStack>
                </HStack>
            </MenuButton>

            <MenuList bg={bgColor} border="1px" borderColor={borderColor} shadow="lg">
                {/* Wallet Info */}
                <Box p={4}>
                    <VStack spacing={3} align="stretch">
                        <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Address:</Text>
                            <HStack>
                                <Text fontSize="sm" fontFamily="mono">
                                    {account.slice(0, 10)}...{account.slice(-8)}
                                </Text>
                                <Tooltip label="Copy Address">
                                    <Button size="xs" variant="ghost" onClick={copyAddress}>
                                        <FiCopy />
                                    </Button>
                                </Tooltip>
                            </HStack>
                        </HStack>

                        <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">BNB Balance:</Text>
                            <Text fontSize="sm" fontWeight="semibold">
                                {parseFloat(balance).toFixed(4)} BNB
                            </Text>
                        </HStack>

                        <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">USDT Balance:</Text>
                            <HStack>
                                <Text fontSize="sm" fontWeight="semibold" color="green.600">
                                    {parseFloat(usdtBalance).toFixed(2)} USDT
                                </Text>
                                <Tooltip label="Refresh Balances">
                                    <Button size="xs" variant="ghost" onClick={handleRefreshBalances}>
                                        <FiRefreshCw />
                                    </Button>
                                </Tooltip>
                            </HStack>
                        </HStack>
                    </VStack>
                </Box>

                <MenuDivider />

                {/* Menu Items */}
                <MenuItem icon={<FiCopy />} onClick={copyAddress}>
                    Copy Address
                </MenuItem>

                <MenuItem icon={<FiExternalLink />} onClick={openInExplorer}>
                    View on BscScan
                </MenuItem>

                <MenuItem icon={<FiRefreshCw />} onClick={handleRefreshBalances}>
                    Refresh Balances
                </MenuItem>

                <MenuDivider />

                <MenuItem
                    icon={<FiLogOut />}
                    onClick={disconnectWallet}
                    color="red.500"
                    _hover={{ bg: 'red.50' }}
                >
                    Disconnect Wallet
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default WalletStatus;