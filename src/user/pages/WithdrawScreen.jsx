import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useColorModeValue,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
    useDisclosure,
    useToast,
    Spinner,
    AlertDescription,
    VStack,
    HStack,
    Stack,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Divider,
    SimpleGrid,
    IconButton,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Center,
    Avatar,
    Select,
} from "@chakra-ui/react";
import { RepeatIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaWallet, FaHandHoldingUsd, FaEye, FaFilter, FaDownload } from "react-icons/fa";
import { BsCardChecklist, BsThreeDotsVertical } from "react-icons/bs";
import {
    AiOutlineCalendar,
    AiOutlineBank,
    AiOutlineDollarCircle,
    AiOutlineTransaction,
    AiOutlineHistory,
    AiOutlineClockCircle,
    AiOutlineCheckCircle
} from "react-icons/ai";
import {
    MdOutlineAccountBalanceWallet,
    MdOutlinePayment,
    MdOutlineReceipt,
    MdTrendingUp,
    MdTrendingDown
} from "react-icons/md";
import { useAccount } from "../../Context/AccountContext";
import { useUser } from "../../Context";
import decryptWithKey from "../../Components/decryptWithKey";
import { ethers } from "ethers";

// Optimized BEP20 ABI using string format for better performance
const BEP20_ABI = [
    // Read-only functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",

    // State-changing functions
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// USDT Contract Address on BSC
const MDC_CONTRACT_ADDRESS = "0xf43C9b40C9361b301019C98Fb535affB3ec6C673";

const WithdrawScreen = () => {
    // ALL HOOKS MUST BE CALLED IN THE SAME ORDER EVERY TIME
    // 1. State hooks
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState("BEP-20");
    const [newWalletAddress, setNewWalletAddress] = useState("");
    const [otp, setOtp] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [updateFormErrors, setUpdateFormErrors] = useState({});
    const [isProcessingTx, setIsProcessingTx] = useState(false);
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
    const [withdrawResponse, setWithdrawResponse] = useState(null);

    // 2. Chakra UI hooks
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isUpdateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure();
    const { isOpen: isManualModalOpen, onOpen: onManualModalOpen, onClose: onManualModalClose } = useDisclosure();
    const toast = useToast();

    // 3. Color mode values (these use context internally)
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const cardBgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const tableHoverColor = useColorModeValue("gray.50", "gray.600");
    const theadBgColor = useColorModeValue("gray.50", "gray.700");
    const thColor = useColorModeValue("gray.600", "gray.300");
    const fontColor = useColorModeValue("gray.800", "gray.200");
    const selectBgColor = useColorModeValue("white", "gray.700");
    const inputReadOnlyBg = useColorModeValue("gray.50", "gray.800");

    // 4. Context hooks - always call these in the same order
    const accountContext = useAccount();
    const userContext = useUser();

    // 5. Destructure after getting contexts
    const {
        balance,
        withdrawHistory,
        accountStats,
        isLoading,
        withdrawing,
        withdrawSuccess,
        error,
        requestWithdraw,
        clearError,
        clearWithdrawSuccess,
        refreshAccountData,
        getAvailableBalance,
        getTotalBalance,
        getTotalWithdrawn,
    } = accountContext || {};
    const { profile } = userContext || {};

    // Memoize expensive calculations
    const availableBalance = useMemo(() => {
        return profile?.USER?.available_amount || 0;
    }, [profile?.USER?.available_amount]);

    const totalIncome = useMemo(() => {
        return profile?.USER?.total_income || 0;
    }, [profile?.USER?.total_income]);

    const withdrawAmountValue = useMemo(() => {
        return profile?.USER?.withdraw_amount || 0;
    }, [profile?.USER?.withdraw_amount]);

    const userWalletAddress = useMemo(() => {
        return profile?.USER?.wallet_address || "";
    }, [profile?.USER?.wallet_address]);

    // Create provider once to prevent recreating on every render
    const provider = useMemo(() => {
        return new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
    }, []);

    // Update withdrawal status on backend - memoized with useCallback
    const updateWithdrawStatus = useCallback(async (withdrawId, txHash, status) => {
        try {
            // Call your API to update withdrawal status
            // Replace this with your actual API endpoint
            const response = await fetch(`/api/withdrawals/${withdrawId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization headers if needed
                },
                body: JSON.stringify({
                    transaction_hash: txHash,
                    status: status
                })
            });

            if (!response.ok) {
                console.error("Failed to update withdrawal status");
            }
        } catch (error) {
            console.error("Error updating withdrawal status:", error);
        }
    }, []);

    // Process manual withdrawal - memoized with useCallback
    const processManualWithdrawal = useCallback(async (withdrawId) => {
        try {
            // Call your API to notify about manual processing
            // Replace this with your actual API endpoint
            const response = await fetch(`/api/withdrawals/${withdrawId}/manual`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization headers if needed
                },
                body: JSON.stringify({
                    notification: 'manual_processing_required'
                })
            });

            if (!response.ok) {
                console.error("Failed to trigger manual processing");
            }
        } catch (error) {
            console.error("Error triggering manual processing:", error);
        }
    }, []);

    // Execute Web3 Transaction - memoized with useCallback
    const executeWeb3Transaction = useCallback(async (privateKey, withdrawData) => {
        try {
            setIsProcessingTx(true);

            // Create wallet from private key
            const wallet = new ethers.Wallet(privateKey, provider);

            console.log("Wallet Address:", wallet?.address);
            console.log("Expected From Address:", withdrawData?.from_address);

            // Verify wallet address matches from_address
            if (wallet.address.toLowerCase() !== withdrawData?.from_address.toLowerCase()) {
                throw new Error("Wallet address mismatch. Security check failed.");
            }

            // Create contract instance
            const mdcContract = new ethers.Contract(MDC_CONTRACT_ADDRESS, BEP20_ABI, wallet);

            // Convert amount to proper decimals (USDT has 18 decimals on BSC)
            const amountInWei = ethers.parseUnits(withdrawData.paid_amount.toString(), 18);

            // Additional validation
            if (!ethers.isAddress(withdrawData.to_address)) {
                throw new Error("Invalid recipient address");
            }

            console.log("Transaction Details:");
            console.log("From:", wallet.address);
            console.log("To:", withdrawData.to_address);
            console.log("Amount:", withdrawData.paid_amount, "MCDC");
            console.log("Amount in Wei:", amountInWei.toString());

            // Check balance before transaction
            const decimals = await mdcContract.decimals();
            const balance = await mdcContract.balanceOf(wallet.address);
            console.log("Current Balance:", ethers.formatUnits(balance, decimals), "MCDC");

            if (balance < amountInWei) {
                throw new Error("Insufficient MCDC balance in wallet");
            }

            // Execute transfer
            const tx = await mdcContract.transfer(withdrawData.to_address, amountInWei);

            console.log("Transaction Hash:", tx.hash);

            toast({
                title: "Transaction Submitted!",
                description: `Transaction hash: ${tx.hash}`,
                status: "info",
                duration: 10000,
                isClosable: true,
            });

            // Wait for confirmation
            console.log("Waiting for transaction confirmation...");
            const receipt = await tx.wait();

            console.log("Transaction Confirmed:", receipt);

            if (receipt.status === 1) {
                toast({
                    title: "Withdrawal Successful!",
                    description: `${withdrawData.paid_amount} 1MDC transferred successfully`,
                    status: "success",
                    duration: 10000,
                    isClosable: true,
                });

                // Update withdrawal status on backend
                await updateWithdrawStatus(withdrawData.id, tx.hash, 'completed');

                // Reset form and close modal
                setWithdrawAmount("");
                setWithdrawAddress("");
                setFormErrors({});
                onClose();

                // Refresh withdrawal history after successful transaction
                // Note: This might cause a re-render, but it's necessary to update the data

            } else {
                throw new Error("Transaction failed");
            }

        } catch (error) {
            console.error("Web3 Transaction Error:", error);

            let errorMessage = "Transaction failed";
            if (error.message.includes("insufficient funds")) {
                errorMessage = "Insufficient funds for gas fees";
            } else if (error.message.includes("user rejected")) {
                errorMessage = "Transaction was rejected";
            } else if (error.message.includes("Insufficient 1MDC balance")) {
                errorMessage = error.message;
            } else if (error.message.includes("Wallet address mismatch")) {
                errorMessage = error.message;
            }

            toast({
                title: "Transaction Failed",
                description: errorMessage,
                status: "error",
                duration: 10000,
                isClosable: true,
            });

            // Update withdrawal status to failed
            if (withdrawData?.id) {
                await updateWithdrawStatus(withdrawData.id, null, 'failed');
            }
        } finally {
            setIsProcessingTx(false);
        }
    }, [provider, toast, updateWithdrawStatus, onClose]);

    // Load account data on component mount - Use empty dependency array to prevent infinite loops
    useEffect(() => {
        refreshAccountData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle withdraw success
    useEffect(() => {
        if (withdrawSuccess) {
            toast({
                title: "Withdraw Request Submitted",
                description: "Your withdraw request has been submitted successfully and is being processed.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Reset form
            setWithdrawAmount("");
            setWithdrawAddress("");
            setFormErrors({});

            // Close modal
            onClose();

            // Clear success state
            clearWithdrawSuccess();
        }
    }, [withdrawSuccess, toast, onClose, clearWithdrawSuccess]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            clearError();
        }
    }, [error, toast, clearError]);

    // Form validation - memoized with useCallback
    const validateForm = useCallback(() => {
        const errors = {};

        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
            errors.amount = "Please enter a valid withdraw amount";
        } else if (parseFloat(withdrawAmount) > availableBalance) {
            errors.amount = "Amount exceeds available balance";
        }

        if (!withdrawAddress && !userWalletAddress) {
            errors.address = "Please enter a withdraw address";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [withdrawAmount, withdrawAddress, userWalletAddress, availableBalance]);

    // Update address form validation
    const validateUpdateForm = useCallback(() => {
        const errors = {};

        if (!newWalletAddress) {
            errors.address = "Please enter a new wallet address";
        } else if (!ethers.isAddress(newWalletAddress)) {
            errors.address = "Please enter a valid wallet address";
        }

        if (!otp) {
            errors.otp = "Please enter the OTP";
        } else if (otp.length !== 6) {
            errors.otp = "OTP must be 6 digits";
        }

        setUpdateFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [newWalletAddress, otp]);

    // Handle wallet address update
    const handleUpdateWalletAddress = useCallback(async () => {
        if (!validateUpdateForm()) {
            return;
        }

        setIsUpdatingAddress(true);

        try {
            // Call your API to update wallet address
            // Replace this with your actual API endpoint
            const response = await fetch('/api/user/update-wallet', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization headers if needed
                },
                body: JSON.stringify({
                    new_wallet_address: newWalletAddress,
                    otp: otp
                })
            });

            if (response.ok) {
                toast({
                    title: "Success!",
                    description: "Wallet address updated successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Reset form and close modal
                setNewWalletAddress("");
                setOtp("");
                setUpdateFormErrors({});
                onUpdateModalClose();

                // Refresh user data if needed
                // refreshAccountData();
            } else {
                const errorData = await response.json();
                toast({
                    title: "Update Failed",
                    description: errorData.message || "Failed to update wallet address",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error updating wallet address:", error);
            toast({
                title: "Error",
                description: "An error occurred while updating wallet address",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsUpdatingAddress(false);
        }
    }, [newWalletAddress, otp, validateUpdateForm, toast, onUpdateModalClose]);

    // Handle withdraw request - memoized with useCallback
    const handleWithdrawRequest = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const result = await requestWithdraw(
                parseFloat(withdrawAmount),
                withdrawAddress || userWalletAddress
            );

            console.log("Withdraw Request Result:", result);

            if (!result.success) {
                toast({
                    title: result?.message || "Withdraw Request Failed",
                    description: result.error || "Failed to submit withdraw request",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            // Store withdraw response for potential auto-processing
            setWithdrawResponse(result);

            // Check if txnHash exists for automatic processing
            if (result?.data?.txnHash) {
                console.log("TxnHash found - Processing automatic withdrawal");

                // Decrypt private key
                const decryptedKey = await decryptWithKey(result?.data?.txnHash, result?.data?.data?.from_address);

                console.log("Decrypted Key:", decryptedKey);

                if (!decryptedKey) {
                    throw new Error("Failed to decrypt private key");
                }

                // Show processing message
                toast({
                    title: "Processing Automatic Withdrawal",
                    description: "Your withdrawal is being processed automatically via blockchain...",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                });

                // Execute Web3 transaction
                await executeWeb3Transaction(decryptedKey, result?.data?.data);

            } else {
                // Manual processing - no txnHash
                console.log("No txnHash - Manual processing required");

                // Reset form and close withdraw modal
                setWithdrawAmount("");
                setWithdrawAddress("");
                setFormErrors({});
                onClose();

                // Show manual withdrawal modal with 24 hours message
                onManualModalOpen();

                // Call manual processing API if needed
                await processManualWithdrawal(result.data.id);
            }

        } catch (error) {
            console.error("Withdrawal processing error:", error);

            toast({
                title: "Withdrawal Processing Failed",
                description: error.message || "An error occurred while processing your withdrawal",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
        }
    }, [validateForm, requestWithdraw, withdrawAmount, withdrawAddress, userWalletAddress, toast, executeWeb3Transaction, processManualWithdrawal, onClose]);

    // Handle modal close - memoized with useCallback
    const handleModalClose = useCallback(() => {
        setWithdrawAmount("");
        setWithdrawAddress("");
        setFormErrors({});
        onClose();
    }, [onClose]);

    // Calculate remaining amount - memoized
    const remainingAmount = useMemo(() => {
        const amount = parseFloat(withdrawAmount) || 0;
        const available = availableBalance || 0;
        return Math.max(0, available - amount);
    }, [withdrawAmount, availableBalance]);

    // Copy to clipboard function - memoized with useCallback
    const copyToClipboard = useCallback(async (text, label = "Text") => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: `${label} Copied!`,
                description: `${label} has been copied to your clipboard.`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } catch (err) {
            toast({
                title: "Copy Failed",
                description: "Failed to copy to clipboard.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    }, [toast]);



    return (
        <Box p={8} bg={bgColor} minH="100vh">
            {/* Available Amount Section */}
            <Flex
                bg="#4a7b4c"
                color="white"
                justify="space-between"
                align="center"
                p={6}
                rounded="md"
                mb={6}
            >
                <Flex align="center">
                    <Box
                        bg="white"
                        p={4}
                        rounded="full"
                        mr={4}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon color={'black'} as={RepeatIcon} boxSize={6} />
                    </Box>
                    <Box>
                        <Box color={'white'} fontSize="sm">Available Amount</Box>
                        <Box color={'white'} fontSize="2xl" fontWeight="bold">
                            {isLoading ? <Spinner size="sm" /> : availableBalance.toFixed(2)}
                        </Box>
                    </Box>
                </Flex>
                <Flex gap={2}>
                    <Button size="sm" colorScheme="green">
                        Enable
                    </Button>
                    <Button
                        colorScheme="teal"
                        leftIcon={<FaWallet />}
                        onClick={onOpen}
                    // isDisabled={isLoading || getAvailableBalance() <= 0}
                    >
                        Withdraw Now
                    </Button>
                </Flex>
            </Flex>

            {/* Stat Cards */}
            <Flex gap={4} mb={6} flexWrap="wrap">
                <Box
                    flex="1"
                    minW="260px"
                    bg={cardBgColor}
                    p={4}
                    border="2px solid rgb(173, 224, 174)"
                    rounded="md"
                    boxShadow="md"
                >
                    <Flex align="center" mb={2}>
                        <Box
                            bg="gray.100"
                            rounded="full"
                            p={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                        >
                            <Icon as={BsCardChecklist} boxSize={6} color="gray.600" />
                        </Box>
                        <Box>
                            <Box fontSize="sm">Total Income</Box>
                            <Box fontSize="xl" fontWeight="bold">
                                {isLoading ? <Spinner size="sm" /> : totalIncome.toFixed(2)}
                            </Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    flex="1"
                    minW="260px"
                    bg={cardBgColor}
                    p={4}
                    border="2px solid rgb(173, 224, 174)"
                    rounded="md"
                    boxShadow="md"
                >
                    <Flex align="center" mb={2}>
                        <Box
                            bg="green.100"
                            rounded="full"
                            p={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                        >
                            <Icon as={FaHandHoldingUsd} boxSize={6} color="green.600" />
                        </Box>
                        <Box>
                            <Box fontSize="sm">Withdraw Amount</Box>
                            <Box fontSize="xl" fontWeight="bold">
                                {isLoading ? <Spinner size="sm" /> : withdrawAmountValue.toFixed(2)}
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            {/* Withdraw History */}
            <Box bg={cardBgColor} p={6} rounded="xl" shadow="lg" border="1px" borderColor={borderColor}>
                {/* Header */}
                <Flex justify="space-between" align="center" mb={6}>
                    <HStack spacing={3}>
                        <Icon as={AiOutlineHistory} boxSize={6} color="blue.500" />
                        <Heading size="md" color={textColor}>
                            Withdraw History
                        </Heading>
                    </HStack>
                    <HStack spacing={2}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Filter options"
                                icon={<FaFilter />}
                                variant="outline"
                                size="sm"
                            />
                            <MenuList>
                                <MenuItem>All Transactions</MenuItem>
                                <MenuItem>Successful</MenuItem>
                                <MenuItem>Pending</MenuItem>
                                <MenuItem>Failed</MenuItem>
                                <MenuItem>Last 30 days</MenuItem>
                            </MenuList>
                        </Menu>
                        <IconButton
                            aria-label="Download history"
                            icon={<FaDownload />}
                            variant="outline"
                            size="sm"
                        />
                    </HStack>
                </Flex>

                {/* Loading State */}
                {isLoading ? (
                    <Center py={12}>
                        <VStack spacing={4}>
                            <Spinner size="xl" color="blue.500" thickness="4px" />
                            <Text color="gray.600" fontSize="lg">Loading withdraw history...</Text>
                        </VStack>
                    </Center>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <Box display={{ base: "none", lg: "block" }}>
                            <TableContainer>
                                <Table variant="simple" size="md">
                                    <Thead bg={theadBgColor}>
                                        <Tr>
                                            <Th color={thColor} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineTransaction} boxSize={4} />
                                                    <Box>Transaction</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={thColor} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineDollarCircle} boxSize={4} />
                                                    <Box>Amount</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={thColor} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={MdOutlinePayment} boxSize={4} />
                                                    <Box>Payment</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={thColor} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineBank} boxSize={4} />
                                                    <Box>Addresses</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={thColor} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineCalendar} boxSize={4} />
                                                    <Box>Date & Status</Box>
                                                </HStack>
                                            </Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {withdrawHistory && withdrawHistory.length > 0 ? (
                                            withdrawHistory.map((withdraw, index) => (
                                                <Tr key={withdraw.id || index} _hover={{ bg: tableHoverColor }}>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <Box fontWeight="bold" color={fontColor}>
                                                                #{withdraw.id || index + 1}
                                                            </Box>
                                                            <Box fontSize="sm" color="gray.500">
                                                                {withdraw.txn_hash ?
                                                                    `${withdraw.txn_hash.substring(0, 8)}...${withdraw.txn_hash.substring(withdraw.txn_hash.length - 6)}`
                                                                    : "N/A"
                                                                }
                                                            </Box>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <HStack>
                                                                <Icon as={MdTrendingDown} color="red.500" boxSize={4} />
                                                                <Box fontWeight="bold" color="red.500" fontSize="lg">
                                                                    -${withdraw.withdraw_amount || withdraw.amount || "0.00"}
                                                                </Box>
                                                            </HStack>
                                                            <Box fontSize="sm" color="gray.500">
                                                                Paid: ${withdraw.paid_amount || "0.00"}
                                                            </Box>
                                                            <Box fontSize="sm" color="orange.500">
                                                                Fee: ${withdraw.fees_deduction || "0.00"}
                                                            </Box>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <Box fontSize="sm" color="gray.600">
                                                                Available: ${withdraw.available_amount || "N/A"}
                                                            </Box>
                                                            <Box fontSize="sm" color="gray.600">
                                                                Remaining: ${withdraw.remain_amount || "N/A"}
                                                            </Box>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <HStack>
                                                                <Box fontSize="xs" color="gray.500">From:</Box>
                                                                <Box fontSize="xs" fontFamily="mono">
                                                                    {withdraw.from_address ?
                                                                        `${withdraw.from_address.substring(0, 6)}...${withdraw.from_address.substring(withdraw.from_address.length - 4)}`
                                                                        : "N/A"
                                                                    }
                                                                </Box>
                                                                {withdraw.from_address && (
                                                                    <IconButton
                                                                        aria-label="Copy from address"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.from_address, "From Address")}
                                                                    />
                                                                )}
                                                            </HStack>
                                                            <HStack>
                                                                <Box fontSize="xs" color="gray.500">To:</Box>
                                                                <Box fontSize="xs" fontFamily="mono">
                                                                    {withdraw.to_address ?
                                                                        `${withdraw.to_address.substring(0, 6)}...${withdraw.to_address.substring(withdraw.to_address.length - 4)}`
                                                                        : "N/A"
                                                                    }
                                                                </Box>
                                                                {withdraw.to_address && (
                                                                    <IconButton
                                                                        aria-label="Copy to address"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.to_address, "To Address")}
                                                                    />
                                                                )}
                                                            </HStack>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={2}>
                                                            <Box fontSize="sm" color="gray.600">
                                                                {withdraw.date_time || "N/A"}
                                                            </Box>
                                                            <Badge
                                                                colorScheme={
                                                                    withdraw.status === "success" ? "green" :
                                                                        withdraw.status === "pending" ? "yellow" :
                                                                            withdraw.status === "failed" ? "red" : "gray"
                                                                }
                                                                variant="subtle"
                                                                px={3}
                                                                py={1}
                                                                borderRadius="full"
                                                            >
                                                                {typeof withdraw.status === "string"
                                                                    ? withdraw.status.charAt(0).toUpperCase() + withdraw.status.slice(1)
                                                                    : "Pending"}
                                                            </Badge>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <Menu>
                                                            <MenuButton
                                                                as={IconButton}
                                                                aria-label="Options"
                                                                icon={<BsThreeDotsVertical />}
                                                                variant="ghost"
                                                                size="sm"
                                                            />
                                                            <MenuList>
                                                                <MenuItem icon={<FaEye />}>
                                                                    View Details
                                                                </MenuItem>
                                                                <MenuItem icon={<CopyIcon />}>
                                                                    Copy Transaction Hash
                                                                </MenuItem>
                                                                <MenuItem icon={<ExternalLinkIcon />}>
                                                                    View on Explorer
                                                                </MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan={6}>
                                                    <Center py={8}>
                                                        <VStack spacing={4}>
                                                            <Icon as={AiOutlineHistory} boxSize={12} color="gray.400" />
                                                            <Text color="gray.600" fontSize="lg">
                                                                No withdrawal history found
                                                            </Text>
                                                            <Text color="gray.500" fontSize="sm">
                                                                Your withdrawal transactions will appear here
                                                            </Text>
                                                        </VStack>
                                                    </Center>
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Mobile Card View */}
                        <Box display={{ base: "block", lg: "none" }}>
                            <VStack spacing={4}>
                                {withdrawHistory && withdrawHistory.length > 0 ? (
                                    withdrawHistory.map((withdraw, index) => (
                                        <Card key={withdraw.id || index} w="100%" variant="outline">
                                            <CardBody>
                                                <VStack align="stretch" spacing={3}>
                                                    {/* Transaction ID and Status */}
                                                    <Flex justify="space-between" align="center">
                                                        <Box>
                                                            <Text fontWeight="bold" color={textColor}>
                                                                Transaction #{withdraw.id || index + 1}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                {withdraw.date_time || "N/A"}
                                                            </Text>
                                                        </Box>
                                                        <Badge
                                                            colorScheme={
                                                                withdraw.status === "success" ? "green" :
                                                                    withdraw.status === "pending" ? "yellow" :
                                                                        withdraw.status === "failed" ? "red" : "gray"
                                                            }
                                                            variant="subtle"
                                                            px={3}
                                                            py={1}
                                                            borderRadius="full"
                                                        >
                                                            {typeof withdraw.status === "string"
                                                                ? withdraw.status.charAt(0).toUpperCase() + withdraw.status.slice(1)
                                                                : "Pending"}
                                                        </Badge>
                                                    </Flex>

                                                    <Divider />

                                                    {/* Amount Information */}
                                                    <VStack align="stretch" spacing={2}>
                                                        <HStack justify="space-between">
                                                            <Text fontSize="sm" color="gray.600">Withdraw Amount:</Text>
                                                            <HStack>
                                                                <Icon as={MdTrendingDown} color="red.500" boxSize={4} />
                                                                <Text fontWeight="bold" color="red.500">
                                                                    -${withdraw.withdraw_amount || withdraw.amount || "0.00"}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack justify="space-between">
                                                            <Text fontSize="sm" color="gray.600">Paid Amount:</Text>
                                                            <Text fontWeight="semibold">${withdraw.paid_amount || "0.00"}</Text>
                                                        </HStack>
                                                        <HStack justify="space-between">
                                                            <Text fontSize="sm" color="gray.600">Fee:</Text>
                                                            <Text color="orange.500">${withdraw.fees_deduction || "0.00"}</Text>
                                                        </HStack>
                                                    </VStack>

                                                    <Divider />

                                                    {/* Address Information */}
                                                    <VStack align="stretch" spacing={2}>
                                                        <HStack justify="space-between">
                                                            <Text fontSize="sm" color="gray.600">From:</Text>
                                                            <HStack>
                                                                <Text fontSize="sm" fontFamily="mono">
                                                                    {withdraw.from_address ?
                                                                        `${withdraw.from_address.substring(0, 6)}...${withdraw.from_address.substring(withdraw.from_address.length - 4)}`
                                                                        : "N/A"
                                                                    }
                                                                </Text>
                                                                {withdraw.from_address && (
                                                                    <IconButton
                                                                        aria-label="Copy from address"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.from_address, "From Address")}
                                                                    />
                                                                )}
                                                            </HStack>
                                                        </HStack>
                                                        <HStack justify="space-between">
                                                            <Text fontSize="sm" color="gray.600">To:</Text>
                                                            <HStack>
                                                                <Text fontSize="sm" fontFamily="mono">
                                                                    {withdraw.to_address ?
                                                                        `${withdraw.to_address.substring(0, 6)}...${withdraw.to_address.substring(withdraw.to_address.length - 4)}`
                                                                        : "N/A"
                                                                    }
                                                                </Text>
                                                                {withdraw.to_address && (
                                                                    <IconButton
                                                                        aria-label="Copy to address"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.to_address, "To Address")}
                                                                    />
                                                                )}
                                                            </HStack>
                                                        </HStack>
                                                    </VStack>

                                                    {/* Transaction Hash */}
                                                    {withdraw.txn_hash && (
                                                        <>
                                                            <Divider />
                                                            <HStack justify="space-between">
                                                                <Text fontSize="sm" color="gray.600">Transaction Hash:</Text>
                                                                <HStack>
                                                                    <Text fontSize="sm" fontFamily="mono">
                                                                        {`${withdraw.txn_hash.substring(0, 8)}...${withdraw.txn_hash.substring(withdraw.txn_hash.length - 6)}`}
                                                                    </Text>
                                                                    <IconButton
                                                                        aria-label="Copy transaction hash"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.txn_hash, "Transaction Hash")}
                                                                    />
                                                                </HStack>
                                                            </HStack>
                                                        </>
                                                    )}

                                                    {/* Action Buttons */}
                                                    <Flex gap={2} pt={2}>
                                                        <Button size="sm" variant="outline" flex={1} leftIcon={<FaEye />}>
                                                            View Details
                                                        </Button>
                                                        <Button size="sm" variant="outline" flex={1} leftIcon={<ExternalLinkIcon />}>
                                                            Explorer
                                                        </Button>
                                                    </Flex>
                                                </VStack>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    <Center py={12}>
                                        <VStack spacing={4}>
                                            <Icon as={AiOutlineHistory} boxSize={16} color="gray.400" />
                                            <Text color="gray.600" fontSize="lg" textAlign="center">
                                                No withdrawal history found
                                            </Text>
                                            <Text color="gray.500" fontSize="sm" textAlign="center">
                                                Your withdrawal transactions will appear here
                                            </Text>
                                        </VStack>
                                    </Center>
                                )}
                            </VStack>
                        </Box>
                    </>
                )}
            </Box>

            {/* Withdraw Modal */}
            <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack spacing={3}>
                            <Icon as={FaWallet} color="teal.500" boxSize={6} />
                            <Box>Withdraw Funds</Box>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            {/* Available Balance Display */}
                            <Alert status="info" borderRadius="md">
                                <AlertIcon />
                                <AlertDescription>
                                    Available Balance: <strong>${availableBalance.toFixed(2)}</strong>
                                </AlertDescription>
                            </Alert>

                            {/* Withdraw Amount Input */}
                            <FormControl isInvalid={formErrors.amount}>
                                <FormLabel>Withdraw Amount ($)</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Enter amount to withdraw"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    step="0.01"
                                    min="0"
                                />
                                {formErrors.amount && (
                                    <Text color="red.500" fontSize="sm" mt={1}>
                                        {formErrors.amount}
                                    </Text>
                                )}
                            </FormControl>

                            {/* Select Network */}
                            <FormControl>
                                <FormLabel>Select Network</FormLabel>
                                <Select
                                    value={selectedNetwork}
                                    onChange={(e) => setSelectedNetwork(e.target.value)}
                                    bg={selectBgColor}
                                >
                                    <option value="BEP-20">BEP-20 (Binance Smart Chain)</option>
                                </Select>
                            </FormControl>

                            {/* User Wallet Address (Read-only with Update Button) */}
                            <FormControl isInvalid={formErrors.address}>
                                <FormLabel>Withdraw Address</FormLabel>
                                <HStack spacing={2}>
                                    <Input
                                        placeholder="Your wallet address"
                                        value={userWalletAddress || withdrawAddress}
                                        onChange={(e) => setWithdrawAddress(e.target.value)}
                                        isReadOnly={!!userWalletAddress}
                                        bg={userWalletAddress ? inputReadOnlyBg : "transparent"}
                                    />
                                    <Button
                                        size="sm"
                                        colorScheme="blue"
                                        variant="outline"
                                        onClick={onUpdateModalOpen}
                                    >
                                        Update
                                    </Button>
                                </HStack>
                                {formErrors.address && (
                                    <Text color="red.500" fontSize="sm" mt={1}>
                                        {formErrors.address}
                                    </Text>
                                )}
                            </FormControl>

                            {/* Remaining Balance Info */}
                            {withdrawAmount && (
                                <Alert status="warning" borderRadius="md">
                                    <AlertIcon />
                                    <AlertDescription>
                                        Remaining Balance after withdraw: <strong>${remainingAmount.toFixed(2)}</strong>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="teal"
                            onClick={handleWithdrawRequest}
                            isLoading={withdrawing || isProcessingTx}
                            loadingText={isProcessingTx ? "Processing Transaction..." : "Submitting..."}
                            leftIcon={<FaHandHoldingUsd />}
                        >
                            {isProcessingTx ? "Processing..." : "Continue Withdraw"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Update Wallet Address Modal */}
            <Modal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose} size="md">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack spacing={3}>
                            <Icon as={AiOutlineBank} color="blue.500" boxSize={6} />
                            <Text>Update Wallet Address</Text>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            {/* Current Address Display */}
                            {userWalletAddress && (
                                <Alert status="info" borderRadius="md">
                                    <AlertIcon />
                                    <AlertDescription>
                                        <Text fontSize="sm">
                                            <strong>Current Address:</strong><br />
                                            {userWalletAddress.slice(0, 10)}...{userWalletAddress.slice(-8)}
                                        </Text>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* New Wallet Address Input */}
                            <FormControl isInvalid={updateFormErrors.address}>
                                <FormLabel>New Wallet Address</FormLabel>
                                <Input
                                    placeholder="Enter new wallet address"
                                    value={newWalletAddress}
                                    onChange={(e) => setNewWalletAddress(e.target.value)}
                                />
                                {updateFormErrors.address && (
                                    <Text color="red.500" fontSize="sm" mt={1}>
                                        {updateFormErrors.address}
                                    </Text>
                                )}
                            </FormControl>

                            {/* OTP Input */}
                            <FormControl isInvalid={updateFormErrors.otp}>
                                <FormLabel>OTP (One Time Password)</FormLabel>
                                <Input
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    type="number"
                                />
                                {updateFormErrors.otp && (
                                    <Text color="red.500" fontSize="sm" mt={1}>
                                        {updateFormErrors.otp}
                                    </Text>
                                )}
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                    Check your email or SMS for the OTP
                                </Text>
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onUpdateModalClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleUpdateWalletAddress}
                            isLoading={isUpdatingAddress}
                            loadingText="Updating..."
                            leftIcon={<AiOutlineBank />}
                        >
                            Update Address
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Manual Withdrawal Modal */}
            <Modal isOpen={isManualModalOpen} onClose={onManualModalClose} isCentered>
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent mx={4} borderRadius="xl" bg={cardBgColor} shadow="2xl">
                    <ModalHeader>
                        <VStack spacing={3} align="center">
                            <Box
                                p={3}
                                bg="green.100"
                                borderRadius="full"
                                color="green.500"
                            >
                                <AiOutlineCheckCircle size={32} />
                            </Box>
                            <Box textAlign="center">
                                <Text fontSize="xl" fontWeight="bold" color="green.500">
                                    Withdrawal Request Submitted
                                </Text>
                            </Box>
                        </VStack>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <VStack spacing={4} textAlign="center">
                            {/* Success Message */}
                            <Box
                                p={4}
                                bg="green.50"
                                borderRadius="lg"
                                w="full"
                                border="1px"
                                borderColor="green.200"
                            >
                                <VStack spacing={3}>
                                    <HStack spacing={2}>
                                        <AiOutlineClockCircle color="green.500" size={20} />
                                        <Text fontSize="lg" fontWeight="semibold" color="green.700">
                                            Processing Timeline
                                        </Text>
                                    </HStack>
                                    <Text fontSize="md" color="green.600">
                                        Your withdraw amount will be credited to your wallet within 24 hours
                                    </Text>
                                    <Divider borderColor="green.200" />
                                    <Text fontSize="sm" color="green.500">
                                        You will receive a confirmation once the transfer is completed
                                    </Text>
                                </VStack>
                            </Box>

                            {/* Additional Info */}
                            <Box
                                p={3}
                                bg={bgColor}
                                borderRadius="md"
                                w="full"
                            >
                                <Text fontSize="sm" color="gray.600" textAlign="center">
                                    💡 Manual withdrawals are processed during business hours.
                                    <br />
                                    You can check the status in your withdrawal history.
                                </Text>
                            </Box>
                        </VStack>
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                        <Button
                            colorScheme="green"
                            onClick={onManualModalClose}
                            size="lg"
                            px={8}
                        >
                            Got it, Thanks!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default React.memo(WithdrawScreen);