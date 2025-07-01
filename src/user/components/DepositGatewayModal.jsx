import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
    HStack,
    Text,
    Alert,
    AlertIcon,
    AlertDescription,
    useToast,
    Divider,
    Box,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormErrorMessage,
    Icon,
    Spinner,
    Flex
} from '@chakra-ui/react';
import { FaCreditCard, FaServer, FaUser, FaDollarSign, FaNetworkWired, FaCoins } from 'react-icons/fa';
import { useAccount, useUser } from '../../Context';
import { v4 as uuidv4 } from 'uuid';

const DepositGatewayModal = ({ isOpen, onClose, initialAmount = '', initialAsset = 'USDT' }) => {
    const { user, profile } = useUser();
    const toast = useToast();
    const { depositViaGateway } = useAccount();
    const { startDepositData } = useAccount();
    //random generate 4 digit code


    const generateFourDigitNumber = () => {
        return (Math.floor(1000 + Math.random() * 9000)).toString();
    };


    // Form state
    const [formData, setFormData] = useState({
        access_key: '1V4RnF84tj3bvt4E1xEYl0OkrxmA84v7',
        client_id: '',
        txn_id: (startDepositData?.data?.id)?.toString() || '',
        user_name: profile?.USER?.name || '',
        deposit_amt: startDepositData?.data?.request_amount || '',
        deposit_network: 'BEP20',
        deposit_asset: initialAsset,
        back_url: 'http://localhost:5173/user/deposit'
    });

    const [formErrors, setFormErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);



    // Update form data when props change
    useEffect(() => {
        if (isOpen) {
            const c_id = generateFourDigitNumber();
            setFormData(prev => ({
                ...prev,
                access_key: '1V4RnF84tj3bvt4E1xEYl0OkrxmA84v7',
                txn_id: (startDepositData?.data?.id)?.toString() || '', // Generate new txn_id if not provided
                deposit_amt: initialAmount,
                deposit_asset: initialAsset,
                user_name: profile?.USER.name || '',
                client_id: c_id || '',
                back_url: `http://localhost:5173/user/deposit/${startDepositData?.data?.id}?client_id=${c_id}&access_key=${formData?.access_key}`
            }));
        }
    }, [isOpen, initialAmount, initialAsset, user?.username]);

    // Network options
    const networkOptions = [
        { value: 'binance', label: 'Binance Smart Chain (BEP-20)' },
        { value: 'ethereum', label: 'Ethereum (ERC-20)' },
        { value: 'tron', label: 'Tron (TRC-20)' },
        { value: 'polygon', label: 'Polygon (MATIC)' },
        { value: 'avalanche', label: 'Avalanche (AVAX)' }
    ];

    // Asset options
    const assetOptions = [
        { value: 'USDT', label: 'USDT (Tether)' },
        { value: 'USDC', label: 'USDC (USD Coin)' },
        { value: 'BNB', label: 'BNB (Binance Coin)' },
        { value: 'ETH', label: 'ETH (Ethereum)' },
        { value: 'BTC', label: 'BTC (Bitcoin)' },
        { value: 'MDC', label: 'MDC (Custom Token)' }
    ];

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // Form validation
    const validateForm = () => {
        const errors = {};

        if (!formData.access_key.trim()) {
            errors.access_key = 'Access key is required';
        }

        if (!formData.client_id.trim()) {
            errors.client_id = 'Client ID is required';
        }

        if (!formData.user_name.trim()) {
            errors.user_name = 'Username is required';
        }

        if (!formData.deposit_amt || parseFloat(formData.deposit_amt) <= 0) {
            errors.deposit_amt = 'Valid deposit amount is required';
        } else if (parseFloat(formData.deposit_amt) < 10) {
            errors.deposit_amt = 'Minimum deposit amount is $10';
        } else if (parseFloat(formData.deposit_amt) > 100000) {
            errors.deposit_amt = 'Maximum deposit amount is $100,000';
        }

        if (!formData.deposit_network) {
            errors.deposit_network = 'Please select a network';
        }

        if (!formData.deposit_asset) {
            errors.deposit_asset = 'Please select an asset';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // API call to deposit-asset endpoint
    const callDepositAssetAPI = async (depositData) => {
        try {
            const response = await fetch('/api/deposit-asset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // Adjust as needed
                },
                body: JSON.stringify(depositData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process deposit');
            }

            return await response.json();
        } catch (error) {
            console.error('Deposit API Error:', error);
            throw error;
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            toast({
                title: 'Validation Error',
                description: 'Please fix the form errors before submitting',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }


        setIsProcessing(true);

        try {
            // Prepare data for API
            const depositPayload = {
                access_key: formData.access_key,
                client_id: formData.client_id,
                txn_id: formData.txn_id,
                user_name: formData.user_name,
                deposit_amt: parseFloat(formData.deposit_amt),
                deposit_network: formData.deposit_network,
                deposit_asset: formData.deposit_asset,
                back_url: formData.back_url,

            };

            console.log('Submitting deposit request:', depositPayload);

            // Call the deposit-asset API
            const result = await depositViaGateway(depositPayload);

            console.log('Deposit API Response:', result);

            // Success handling
            toast({
                title: 'Deposit Request Successful!',
                description: `Your deposit request of $${formData.deposit_amt} has been submitted successfully.`,
                status: 'success',
                duration: 8000,
                isClosable: true,
            });

            // Reset form and close modal   
            resetForm();
            onClose();
            window.open(result.data?.qrUrl, '_blank');


        } catch (error) {
            console.error('Deposit submission error:', error);

            toast({
                title: 'Deposit Request Failed',
                description: error.message || 'Failed to submit deposit request. Please try again.',
                status: 'error',
                duration: 8000,
                isClosable: true,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            access_key: '',
            client_id: '',
            user_name: user?.username || '',
            deposit_amt: initialAmount,
            deposit_network: '',
            deposit_asset: initialAsset
        });
        setFormErrors({});
    };

    // Handle modal close
    const handleClose = () => {
        if (!isProcessing) {
            resetForm();
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="lg"
            closeOnOverlayClick={!isProcessing}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack spacing={3}>
                        <Icon as={FaCreditCard} color="blue.500" boxSize={6} />
                        <Box color={'gray.500'}>Pay with Gateway</Box>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton isDisabled={isProcessing} />

                <ModalBody pb={6}>
                    <VStack spacing={6} align="stretch">
                        {/* Information Alert */}
                        <Alert status="info" borderRadius="md">
                            <AlertIcon />
                            <AlertDescription fontSize="sm">
                                Please fill in all the required information to proceed with your deposit via payment gateway.
                            </AlertDescription>
                        </Alert>
                        <Box>
                            {/* <Text fontWeight="semibold" mb={3} color="gray.600">User Information</Text> */}
                            <FormControl isInvalid={!!formErrors.user_name} >
                                <FormLabel>
                                    <HStack>
                                        <Icon as={FaUser} boxSize={4} />
                                        <Box color={'gray.500'}>Username</Box>
                                        <Box color={'red'}>*</Box>
                                    </HStack>
                                </FormLabel>
                                <Input
                                    placeholder="Enter username"
                                    value={formData.user_name}
                                    onChange={(e) => handleInputChange('user_name', e.target.value)}
                                    isDisabled={isProcessing}
                                />
                                <FormErrorMessage>{formErrors.user_name}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        {/* Gateway Configuration */}
                        <Box>
                            {/* <Text fontWeight="semibold" mb={3} color="gray.600">Gateway Configuration</Text> */}
                            <VStack spacing={8}>
                                <FormControl isInvalid={!!formErrors.access_key} >
                                    <FormLabel>
                                        <HStack>
                                            <Icon as={FaServer} boxSize={4} />
                                            <Box color={'gray.500'}>Access Key</Box>
                                            <Box color={'red'}>*</Box>
                                        </HStack>
                                    </FormLabel>
                                    <Input
                                        placeholder="Enter access key associated with the gateway"
                                        value={formData.access_key}
                                        onChange={(e) => handleInputChange('access_key', e.target.value)}
                                        isDisabled={isProcessing}
                                    />
                                    <FormErrorMessage>{formErrors.access_key}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!formErrors.client_id} >
                                    <FormLabel>
                                        <HStack>
                                            <Icon as={FaServer} boxSize={4} />
                                            <Box color={'gray.500'}>Client ID</Box>
                                            <Box color={'red'}>*</Box>

                                        </HStack>
                                    </FormLabel>
                                    <Input
                                        placeholder="Enter client ID for the transaction"
                                        value={formData.client_id}
                                        onChange={(e) => handleInputChange('client_id', e.target.value)}
                                        isDisabled={isProcessing}
                                    />
                                    <FormErrorMessage>{formErrors.client_id}</FormErrorMessage>
                                </FormControl>
                            </VStack>
                        </Box>





                        {/* Summary */}
                        {formData.deposit_amt && formData.deposit_asset && (
                            <Alert status="success" borderRadius="md">
                                <AlertIcon />
                                <AlertDescription>
                                    <Box fontWeight="medium">
                                        You are about to deposit {formData.deposit_amt} {formData.deposit_asset}
                                        {formData.deposit_network && ` via ${networkOptions.find(n => n.value === formData.deposit_network)?.label}`}
                                    </Box>
                                </AlertDescription>
                            </Alert>
                        )}
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <HStack spacing={3}>
                        <Button
                            variant="ghost"
                            onClick={handleClose}
                            isDisabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isLoading={isProcessing}
                            loadingText="Processing..."
                            spinner={<Spinner size="sm" />}
                            leftIcon={!isProcessing ? <FaCreditCard /> : undefined}
                        >
                            {isProcessing ? 'Processing Deposit...' : 'Submit Deposit'}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DepositGatewayModal;