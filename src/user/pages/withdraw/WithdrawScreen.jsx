import React, { useState, useEffect } from "react";
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
    useDisclosure,
    useToast,
    Spinner,
    VStack,
    HStack,
    Card,
    CardBody,
    SimpleGrid,
    IconButton,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Alert,
    AlertIcon,
    AlertDescription
} from "@chakra-ui/react";
import { RepeatIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaWallet, FaEye, FaFilter, FaDownload, FaClock } from "react-icons/fa";
import { BsCardChecklist, BsThreeDotsVertical } from "react-icons/bs";
import {
    MdTrendingUp,
    MdTrendingDown
} from "react-icons/md";
import { useAccount } from "../../../Context/AccountContext";
import { useUser } from "../../../Context";
import { ethers } from "ethers";

import WithdrawModal from "./WithdrawModal";
import WithdrawHistory from "./WithdrawHistory";
import {
    BEP20_ABI,
    MDC_CONTRACT_ADDRESS,
    BSC_RPC_URL,
    STATUS_COLORS,
    STATUS_LABELS,
    VALIDATION_RULES
} from "./constants";
import decryptWithKey from "../../../Components/decryptWithKey";
import provider from "./Provider";
import { useNavigate } from "react-router-dom";
import { generateSampleWithdrawHistory } from "./sampleData";

const WithdrawScreen = () => {
    const { updateWalletAddress } = useUser();
    const navigate = useNavigate();
    // State management - simplified without unnecessary useMemo/useCallback
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState("BEP-20");
    const [formErrors, setFormErrors] = useState({});
    const [isProcessingTx, setIsProcessingTx] = useState(false);

    // Update wallet address modal states
    const [newWalletAddress, setNewWalletAddress] = useState("");
    const [otp, setOtp] = useState("");
    const [updateFormErrors, setUpdateFormErrors] = useState({});
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);

    // Withdrawal processing states
    const [withdrawResponse, setWithdrawResponse] = useState(null);

    // UI state
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isManualModalOpen, onOpen: onManualModalOpen, onClose: onManualModalClose } = useDisclosure();
    const toast = useToast();

    // Color mode values - no memoization needed for simple values
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const cardBgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const tableHoverColor = useColorModeValue("gray.50", "gray.600");
    const theadBgColor = useColorModeValue("gray.50", "gray.700");
    const thColor = useColorModeValue("gray.600", "gray.300");
    const fontColor = useColorModeValue("gray.800", "gray.200");

    // Context hooks
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
        withdrawRequestDetail
    } = useAccount() || {};

    const { profile } = useUser() || {};

    // Direct calculations - no memoization for simple operations
    const availableBalance = profile?.USER?.available_amount || 0;
    const totalIncome = profile?.USER?.total_income || 0;
    const withdrawAmountValue = profile?.USER?.withdraw_amount || 0;
    const userWalletAddress = profile?.USER?.wallet_address || "";

    // Load account data on mount
    useEffect(() => {
        // refreshAccountData();
        setWithdrawAddress(userWalletAddress);
    }, []);

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

            setWithdrawAmount("");
            setWithdrawAddress("");
            setFormErrors({});
            onClose();
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

    // Form validation - simple function without memoization
    const validateForm = () => {
        const errors = {};

        // Amount validation
        const amount = parseFloat(withdrawAmount);
        if (!withdrawAmount || amount <= 0) {
            errors.amount = "Please enter a valid amount";
        } else if (amount < VALIDATION_RULES.MIN_WITHDRAW_AMOUNT) {
            errors.amount = `Minimum withdrawal amount is $${VALIDATION_RULES.MIN_WITHDRAW_AMOUNT}`;
        } else if (amount > VALIDATION_RULES.MAX_WITHDRAW_AMOUNT) {
            errors.amount = `Maximum withdrawal amount is $${VALIDATION_RULES.MAX_WITHDRAW_AMOUNT}`;
        } else if (amount > availableBalance) {
            errors.amount = "Amount exceeds available balance";
        }

        // Address validation
        if (!userWalletAddress) {
            errors.address = "Please enter a wallet address";
        } else if (!VALIDATION_RULES.WALLET_ADDRESS_REGEX.test(userWalletAddress)) {
            errors.address = "Please enter a valid wallet address";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    // Execute Web3 transaction using BEP20 contract
    const executeWeb3Transaction = async (privateKey, transactionData) => {
        try {
            setIsProcessingTx(true);

            console.log("Executing Web3 transaction with:", { privateKey: "***", transactionData });
            const wallet = new ethers.Wallet(privateKey, provider);

            // Create contract instance
            const contract = new ethers.Contract(MDC_CONTRACT_ADDRESS, BEP20_ABI, wallet);

            // Convert amount to Wei (18 decimals for tokens)
            let amountInWei;
            try {
                // Try ethers v6 syntax
                amountInWei = ethers.parseUnits(transactionData.amount.toString(), 18);
            } catch (e) {
                // Fallback to ethers v5 syntax
                amountInWei = ethers.utils.parseUnits(transactionData.amount.toString(), 18);
            }

            // Get current gas price
            let gasPrice;
            try {
                const feeData = await provider.getFeeData();
                gasPrice = feeData.gasPrice;
            } catch (e) {
                // Fallback gas price
                try {
                    gasPrice = ethers.parseUnits('5', 'gwei'); // ethers v6
                } catch (e2) {
                    gasPrice = ethers.utils.parseUnits('5', 'gwei'); // ethers v5
                }
            }

            // Execute token transfer with proper options
            console.log("Transferring tokens:", {
                to: transactionData.to || userWalletAddress,
                amount: amountInWei.toString(),
                from: wallet.address
            });

            const transferTx = await contract.transfer(
                transactionData.to || userWalletAddress,
                amountInWei,
                {
                    gasLimit: transactionData.gasLimit || 100000,
                    gasPrice: gasPrice
                }
            );

            console.log("Transaction sent:", transferTx.hash);

            // Show transaction pending message
            toast({
                title: "Transaction Pending",
                description: `Transaction submitted: ${transferTx.hash}`,
                status: "info",
                duration: 5000,
                isClosable: true,
            });

            // Wait for confirmation
            const receipt = await transferTx.wait();
            if (receipt?.hash !== null) {
                console.log("withdraw data:", withdrawRequestDetail);

            }
            console.log("Transaction confirmed:", receipt);

            // Success handling
            toast({
                title: "Transaction Successful",
                description: `Your withdrawal has been processed successfully! TX: ${transferTx.hash}`,
                status: "success",
                duration: 8000,
                isClosable: true,
            });

            // Reset form and close modal
            setWithdrawAmount("");
            setWithdrawAddress("");
            setFormErrors({});
            onClose();

            // Refresh account data
            refreshAccountData();

        } catch (error) {
            console.error("Web3 transaction error:", error);

            let errorMessage = "Failed to process blockchain transaction";

            // Handle specific error types
            if (error.code === 'INSUFFICIENT_FUNDS') {
                errorMessage = "Insufficient funds for transaction";
            } else if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
                errorMessage = "Unable to estimate gas limit - check token balance";
            } else if (error.code === 'NONCE_EXPIRED') {
                errorMessage = "Transaction nonce expired - please retry";
            } else if (error.code === 'REPLACEMENT_UNDERPRICED') {
                errorMessage = "Gas price too low - please retry with higher gas";
            } else if (error.code === 'NETWORK_ERROR') {
                errorMessage = "Network error - please check your connection";
            } else if (error.reason) {
                errorMessage = error.reason;
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast({
                title: "Transaction Failed",
                description: errorMessage,
                status: "error",
                duration: 10000,
                isClosable: true,
            });
        } finally {
            setIsProcessingTx(false);
        }
    };

    // Process manual withdrawal
    const processManualWithdrawal = async (withdrawalId) => {
        try {
            console.log("Processing manual withdrawal:", withdrawalId);
            toast({
                title: "Manual Processing Initiated",
                description: "Your withdrawal will be processed within 24 hours",
                status: "info",
                duration: 5000,
                isClosable: true,
            });

        } catch (error) {
            console.error("Manual processing error:", error);
        }
    };

    // Complete withdrawal submission with Web3 processing
    const handleSubmit = async () => {
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
                await executeWeb3Transaction(decryptedKey, {
                    amount: parseFloat(withdrawAmount),
                    to: withdrawAddress || userWalletAddress,
                    from_address: result?.data?.data?.from_address,
                    ...result?.data?.data
                });

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
    };

    // Update wallet address function
    const handleUpdateWalletAddress = async () => {
        const errors = {};

        // Validate new wallet address
        if (!newWalletAddress) {
            errors.address = "Please enter a new wallet address";
        } else if (!VALIDATION_RULES.WALLET_ADDRESS_REGEX.test(newWalletAddress)) {
            errors.address = "Please enter a valid wallet address";
        }

        // Validate OTP
        if (!otp) {
            errors.otp = "Please enter OTP";
        } else if (otp.length !== 6) {
            errors.otp = "OTP must be 6 digits";
        }

        setUpdateFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsUpdatingAddress(true);
            try {
                const dto = {
                    address: newWalletAddress,
                    otp: otp
                }
                const response = await updateWalletAddress(dto);
                console.log("Update Wallet Address Response:", response);

                if (response?.success) {
                    toast({
                        title: "Success",
                        description: "Wallet address updated successfully",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });

                    // Reset form
                    setNewWalletAddress("");
                    setOtp("");
                    setUpdateFormErrors({});

                    // Refresh user data
                    refreshAccountData();
                } else {
                    throw new Error("Failed to update wallet address");
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to update wallet address",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsUpdatingAddress(false);
            }
        }
    };

    // Copy to clipboard function
    const copyToClipboard = (text, label = "Text") => {
        try {
            navigator.clipboard.writeText(text);
            toast({
                title: "Copied!",
                description: `${label} copied to clipboard.`,
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
    };

    // Navigate to full history page
    const handleViewAllHistory = () => {
        navigate('/user/withdraw-history');
    };

    // Generate sample data for testing if no real data available
    const sampleWithdrawHistory = generateSampleWithdrawHistory(25);
    const displayWithdrawHistory = withdrawHistory && withdrawHistory.length > 0 ? withdrawHistory : sampleWithdrawHistory;

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
                wrap={'wrap'}
                gap={5}
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
                        <Box mb={1} color={'white'} fontSize="sm">Available Amount</Box>
                        <Box color={'white'} fontSize="2xl" fontWeight="bold">
                            {isLoading ? <Spinner size="sm" /> : `$${availableBalance.toFixed(2)}`}
                        </Box>
                    </Box>
                </Flex>
                <Flex gap={2} wrap={'wrap'}>
                    <Button size="sm" colorScheme="green">
                        Enable
                    </Button>
                    <Button
                        colorScheme="teal"
                        leftIcon={<FaWallet />}
                        onClick={onOpen}
                        isDisabled={isLoading || availableBalance <= 0}
                    >
                        Withdraw Now
                    </Button>
                </Flex>
            </Flex>

            {/* Stat Cards */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
                <Card bg={cardBgColor} border="2px solid rgb(173, 224, 174)" boxShadow="md">
                    <CardBody>
                        <Flex align="center">
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
                                <Text fontSize="sm" color={textColor}>Total Income</Text>
                                <Box fontSize="xl" fontWeight="bold" color={fontColor}>
                                    {isLoading ? <Spinner size="sm" /> : `$${totalIncome.toFixed(2)}`}
                                </Box>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>

                <Card bg={cardBgColor} border="2px solid rgb(173, 224, 174)" boxShadow="md">
                    <CardBody>
                        <Flex align="center">
                            <Box
                                bg="green.100"
                                rounded="full"
                                p={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mr={3}
                            >
                                <Icon as={MdTrendingUp} boxSize={6} color="green.600" />
                            </Box>
                            <Box>
                                <Text fontSize="sm" color={textColor}>Available Balance</Text>
                                <Box fontSize="xl" fontWeight="bold" color="green.500">
                                    {isLoading ? <Spinner size="sm" /> : `$${availableBalance.toFixed(2)}`}
                                </Box>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>

                <Card bg={cardBgColor} border="2px solid rgb(173, 224, 174)" boxShadow="md">
                    <CardBody>
                        <Flex align="center">
                            <Box
                                bg="red.100"
                                rounded="full"
                                p={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mr={3}
                            >
                                <Icon as={MdTrendingDown} boxSize={6} color="red.600" />
                            </Box>
                            <Box>
                                <Text fontSize="sm" color={textColor}>Total Withdrawn</Text>
                                <Box fontSize="xl" fontWeight="bold" color="red.500">
                                    {isLoading ? <Spinner size="sm" /> : `$${withdrawAmountValue.toFixed(2)}`}
                                </Box>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>
            </SimpleGrid>

            {/* Withdrawal History */}
            <WithdrawHistory
                withdrawHistory={displayWithdrawHistory}
                isLoading={isLoading}
                showFullHistory={false}
                onViewAll={handleViewAllHistory}
            />

            {/* Withdraw Modal */}
            <WithdrawModal
                isOpen={isOpen}
                onClose={onClose}
                withdrawAmount={withdrawAmount}
                setWithdrawAmount={setWithdrawAmount}
                withdrawAddress={withdrawAddress}
                setWithdrawAddress={setWithdrawAddress}
                selectedNetwork={selectedNetwork}
                setSelectedNetwork={setSelectedNetwork}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                withdrawing={withdrawing}
                availableBalance={availableBalance}
                onSubmit={handleSubmit}
                userWalletAddress={userWalletAddress}
                newWalletAddress={newWalletAddress}
                setNewWalletAddress={setNewWalletAddress}
                otp={otp}
                setOtp={setOtp}
                updateFormErrors={updateFormErrors}
                setUpdateFormErrors={setUpdateFormErrors}
                isUpdatingAddress={isUpdatingAddress}
                onUpdateWalletAddress={handleUpdateWalletAddress}
                isProcessingTx={isProcessingTx}
            />


        </Box>
    );
};

export default WithdrawScreen;