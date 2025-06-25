import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    HStack,
    Input,
    Text,
    useToast,
    PinInput,
    PinInputField,
    Heading,
    useColorModeValue,
    Spinner,
    Alert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';

const OTPVerification = ({
    isOpen,
    onClose,
    onVerificationSuccess,
    email,
    onResendOTP
}) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const toast = useToast();
    const firstInputRef = useRef(null);

    // Color mode values
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    // Start countdown when modal opens
    useEffect(() => {
        if (isOpen) {
            setCountdown(60); // 60 seconds countdown
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isOpen]);

    // Focus on first input when modal opens
    useEffect(() => {
        if (isOpen && firstInputRef.current) {
            setTimeout(() => {
                firstInputRef.current.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            toast({
                title: 'Invalid OTP',
                description: 'Please enter a 6-digit OTP code',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            // Call verification API
            await onVerificationSuccess(otp);
        } catch (error) {
            console.error('OTP verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (countdown > 0) return;

        setIsResending(true);
        try {
            await onResendOTP();
            setCountdown(60); // Reset countdown
            setOtp(''); // Clear current OTP
            toast({
                title: 'OTP Resent',
                description: 'A new OTP has been sent to your email',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Resend Failed',
                description: error.message || 'Failed to resend OTP',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsResending(false);
        }
    };

    const handleClose = () => {
        setOtp('');
        setCountdown(0);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick={false}
            size="md"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center" pb={2}>
                    <VStack spacing={3}>
                        <AiOutlineMail size={40} color="#4c7d4e" />
                        <Heading size="md">Verify Your Email</Heading>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                    <VStack spacing={6}>
                        <Text color={textColor} textAlign="center" fontSize="sm">
                            We've sent a 6-digit verification code to
                        </Text>
                        <Text fontWeight="semibold" color="#4c7d4e" textAlign="center">
                            {email}
                        </Text>

                        <Alert status="info" borderRadius="md">
                            <AlertIcon />
                            <AlertDescription fontSize="sm">
                                Please check your email and enter the 6-digit code below.
                            </AlertDescription>
                        </Alert>

                        <VStack spacing={4}>
                            <Text fontSize="sm" color={textColor}>
                                Enter verification code
                            </Text>
                            <HStack spacing={2}>
                                <PinInput
                                    otp
                                    size="lg"
                                    value={otp}
                                    onChange={setOtp}
                                    onComplete={handleVerifyOTP}
                                    isDisabled={isLoading}
                                >
                                    <PinInputField ref={firstInputRef} />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                        </VStack>

                        <VStack spacing={2}>
                            <Text fontSize="sm" color={textColor}>
                                Didn't receive the code?
                            </Text>
                            <Button
                                variant="link"
                                colorScheme="blue"
                                fontSize="sm"
                                onClick={handleResendOTP}
                                isDisabled={countdown > 0 || isResending}
                                isLoading={isResending}
                                loadingText="Resending..."
                            >
                                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                            </Button>
                        </VStack>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <HStack width="100%" spacing={3}>
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            flex={1}
                            isDisabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="green"
                            onClick={handleVerifyOTP}
                            flex={1}
                            isLoading={isLoading}
                            loadingText="Verifying..."
                            isDisabled={otp.length !== 6}
                        >
                            Verify
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OTPVerification;