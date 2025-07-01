import React from 'react';
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
    Text,
    Heading,
    useColorModeValue,
    Image,
    Box,
    Divider,
    Icon,
    Alert,
    AlertIcon,
    AlertDescription,
    Badge,
    Flex,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaGift, FaEnvelope } from 'react-icons/fa';

const CongratulationsModal = ({
    isOpen,
    onClose,
    onProceedToOTP,
    email,
    password,
    userName = "User"
}) => {
    // Color mode values
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const bgGradient = useColorModeValue(
        'linear(to-br, green.50, blue.50)',
        'linear(to-br, green.900, blue.900)'
    );
    const cardBg = useColorModeValue('white', 'gray.800');

    const handleProceed = () => {
        onClose();
        // Small delay to allow modal to close smoothly before opening OTP modal
        setTimeout(() => {
            onProceedToOTP();
        }, 10000);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            size="lg"
            isCentered
        >
            <ModalOverlay />
            <ModalContent bg={cardBg} borderRadius="2xl" overflow="hidden">
                {/* Header with gradient background */}
                <Box bgGradient={bgGradient} p={6} textAlign="center">
                    <VStack spacing={4}>
                        {/* Congratulations Animation/GIF */}
                        <Box position="relative">
                            {/* Try to load congratulations GIF, fallback to animated icon */}
                            <Image
                                src="/assets/images/congratulations.gif"
                                alt="Congratulations"
                                maxW="150px"
                                mx="auto"
                                fallback={
                                    <Box position="relative">
                                        <Icon
                                            as={AiOutlineCheckCircle}
                                            w={16}
                                            h={16}
                                            color="green.500"
                                            className="congratulations-pulse"
                                        />
                                        <Box
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            w={20}
                                            h={20}
                                            borderRadius="full"
                                            border="3px solid"
                                            borderColor="green.200"
                                            className="congratulations-ping"
                                        />
                                    </Box>
                                }
                            />
                        </Box>

                        <VStack spacing={2}>
                            <Heading size="lg" color="green.600">
                                🎉 Congratulations!
                            </Heading>
                            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                Welcome to NessanForex, {userName}!
                            </Text>
                        </VStack>
                    </VStack>
                </Box>

                <ModalBody p={6}>
                    <VStack spacing={6}>
                        <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <AlertDescription>
                                Your account has been created successfully! Here are your login credentials:
                            </AlertDescription>
                        </Alert>

                        {/* User Credentials Display */}
                        <Box
                            w="full"
                            border="1px"
                            borderColor={borderColor}
                            borderRadius="xl"
                            p={4}
                            bg={useColorModeValue('gray.50', 'gray.700')}
                        >
                            <VStack spacing={4}>
                                <Text fontSize="md" fontWeight="semibold" color={textColor}>
                                    Your Login Credentials
                                </Text>

                                <Divider />

                                {/* Email */}
                                <HStack w="full" justify="space-between" align="center">
                                    <HStack>
                                        <Icon as={AiOutlineMail} color="blue.500" />
                                        <Text fontSize="sm" color={textColor}>
                                            Email:
                                        </Text>
                                    </HStack>
                                    <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="md">
                                        {email}
                                    </Badge>
                                </HStack>

                                {/* Password */}
                                <HStack w="full" justify="space-between" align="center">
                                    <HStack>
                                        <Icon as={AiOutlineLock} color="green.500" />
                                        <Text fontSize="sm" color={textColor}>
                                            Password:
                                        </Text>
                                    </HStack>
                                    <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="md">
                                        {password}
                                    </Badge>
                                </HStack>
                            </VStack>
                        </Box>

                        {/* Next Steps */}
                        {/* <Alert status="info" borderRadius="md">
                            <AlertIcon />
                            <AlertDescription>
                                <VStack align="start" spacing={2}>
                                    <Text fontWeight="semibold">Next Steps:</Text>
                                    <Text fontSize="sm">
                                        1. We've sent a verification code to your email
                                    </Text>
                                    <Text fontSize="sm">
                                        2. Please check your inbox and verify your email
                                    </Text>
                                    <Text fontSize="sm">
                                        3. After verification, you can start trading!
                                    </Text>
                                </VStack>
                            </AlertDescription>
                        </Alert> */}

                        {/* Welcome Message */}
                        <Box textAlign="center">
                            <Text fontSize="sm" color={textColor}>
                                Thank you for joining MagicAutoPool! We're excited to have you on board.
                            </Text>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <HStack width="100%" spacing={3}>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            flex={1}
                        >
                            Close
                        </Button>
                        <Button
                            colorScheme="green"
                            onClick={handleProceed}
                            flex={2}
                            leftIcon={<FaEnvelope />}
                        >
                            Verify Email Now
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CongratulationsModal;