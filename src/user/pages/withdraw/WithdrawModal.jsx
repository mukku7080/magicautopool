import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertDescription,
    FormControl,
    FormLabel,
    Input,
    Select,
    Box,
    useDisclosure
} from "@chakra-ui/react";
import { FaWallet, FaHandHoldingUsd } from "react-icons/fa";
import { AiOutlineBank } from "react-icons/ai";
import { useUser } from "../../../Context";

const WithdrawModal = ({
    isOpen,
    onClose,
    withdrawAmount,
    setWithdrawAmount,
    withdrawAddress,
    setWithdrawAddress,
    selectedNetwork,
    setSelectedNetwork,
    formErrors,
    setFormErrors,
    withdrawing,
    availableBalance,
    onSubmit,
    userWalletAddress,
    newWalletAddress,
    setNewWalletAddress,
    otp,
    setOtp,
    updateFormErrors,
    setUpdateFormErrors,
    isUpdatingAddress,
    onUpdateWalletAddress,
    isProcessingTx
}) => {
    const selectBgColor = useColorModeValue("white", "gray.700");
    const inputReadOnlyBg = useColorModeValue("gray.50", "gray.800");
    const { sendOtp, updateWalletAddress } = useUser();
    const [isloading, setLoading] = useState(false);

    // Update modal disclosure
    const { isOpen: isUpdateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure();

    const handleModalClose = () => {
        setWithdrawAmount("");
        setWithdrawAddress("");
        setFormErrors({});
        onClose();
    };

    const handleUpdateModalClose = () => {
        setNewWalletAddress("");
        setOtp("");
        setUpdateFormErrors({});
        onUpdateModalClose();
    };

    // Reset all form states when main modal opens
    React.useEffect(() => {
        if (isOpen) {
            setWithdrawAmount("");
            setFormErrors({});
            setNewWalletAddress("");
            setOtp("");
            setUpdateFormErrors({});
        }
    }, [isOpen]);

    const handleWithdrawRequest = () => {
        onSubmit();
    };

    const handleUpdateWalletAddress = () => {
        onUpdateWalletAddress();
        handleUpdateModalClose();
    };

    const handleSendOtpProfileUpdate = async () => {
        try {
            setLoading(true);
            const result = await sendOtp();
            console.log("OTP sent successfully:", result);
            if (result.status) {
                // Clear any existing state before opening modal
                setNewWalletAddress("");
                setOtp("");
                setUpdateFormErrors({});
                onUpdateModalOpen();
                setLoading(false);
            } else {
                setUpdateFormErrors({ otp: result.error });
                setLoading(false);
            }
        } catch (error) {
            setUpdateFormErrors({ otp: "Failed to send OTP. Please try again." });
            setLoading(false);
        }
    }
    //    const  UpdateWalletAddress = async () => {
    //         try {
    //             const result = await updateWalletAddress(newWalletAddress, otp);
    //             console.log("Wallet address updated successfully:", result);
    //             if (result.status) {
    //                 onUpdateModalClose();
    //                 setUpdateFormErrors({});
    //                 setNewWalletAddress("");
    //                 setOtp("");
    //             } else {
    //                 setUpdateFormErrors({ ...updateFormErrors, address: result.error });
    //             }
    //         } catch (error) {
    //             setUpdateFormErrors({ ...updateFormErrors, address: "Failed to update wallet address. Please try again." });
    //         }
    //     }

    // Calculate remaining balance
    const remainingAmount = availableBalance - (parseFloat(withdrawAmount) || 0);

    return (
        <>
            {/* Main Withdraw Modal */}
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
                                        onChange={userWalletAddress ? undefined : (e) => setWithdrawAddress(e.target.value)}
                                        isReadOnly={!!userWalletAddress}
                                        bg={userWalletAddress ? inputReadOnlyBg : "transparent"}
                                        cursor={userWalletAddress ? "not-allowed" : "text"}
                                    />
                                    <Button
                                        size="sm"
                                        colorScheme="blue"
                                        variant="outline"
                                        onClick={handleSendOtpProfileUpdate}
                                        isLoading={isloading}
                                        loadingText={"OTP..."}
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
            <Modal isOpen={isUpdateModalOpen} onClose={handleUpdateModalClose} size="md">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack spacing={3}>
                            <Icon as={AiOutlineBank} color="blue.500" boxSize={6} />
                            <Box fontSize={'16px'}>Update Wallet Address</Box>
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
                        <Button variant="ghost" mr={3} onClick={handleUpdateModalClose}>
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
        </>
    );
};

export default WithdrawModal;