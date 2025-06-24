import React, { useState } from 'react';
import {
    Box,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    useColorModeValue,
    useToast,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    Code,
    Divider,
    Progress,
    Icon,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react';
import {
    FiCreditCard,
    FiDollarSign,
    FiClock,
    FiCheck,
    FiAlertCircle,
    FiCopy,
    FiUpload,
} from 'react-icons/fi';
import { AiOutlineBank, AiOutlineMobile } from 'react-icons/ai';
import { SiBitcoin, SiEthereum } from 'react-icons/si';

const Deposit = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [depositData, setDepositData] = useState({
        amount: '',
        method: '',
        accountDetails: '',
        transactionId: '',
        notes: '',
    });

    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    const steps = [
        { title: 'Select Method', description: 'Choose payment method' },
        { title: 'Enter Details', description: 'Fill deposit information' },
        { title: 'Make Payment', description: 'Complete the transaction' },
        { title: 'Confirmation', description: 'Verify your deposit' },
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    // Payment methods
    const paymentMethods = [
        {
            id: 'bank',
            name: 'Bank Transfer',
            icon: AiOutlineBank,
            color: 'blue',
            minAmount: 50,
            maxAmount: 50000,
            processingTime: '1-3 business days',
            fee: '0%',
            description: 'Direct bank transfer - most secure option',
        },
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: FiCreditCard,
            color: 'green',
            minAmount: 10,
            maxAmount: 10000,
            processingTime: 'Instant',
            fee: '2.9%',
            description: 'Quick and convenient card payments',
        },
        {
            id: 'crypto',
            name: 'Cryptocurrency',
            icon: SiBitcoin,
            color: 'orange',
            minAmount: 25,
            maxAmount: 100000,
            processingTime: '10-60 minutes',
            fee: '0%',
            description: 'Bitcoin, Ethereum, and other cryptocurrencies',
        },
        {
            id: 'mobile',
            name: 'Mobile Payment',
            icon: AiOutlineMobile,
            color: 'purple',
            minAmount: 5,
            maxAmount: 5000,
            processingTime: 'Instant',
            fee: '1.5%',
            description: 'PayPal, Apple Pay, Google Pay',
        },
    ];

    // Recent deposits
    const recentDeposits = [
        {
            id: 'DEP001',
            amount: 500,
            method: 'Bank Transfer',
            status: 'Completed',
            date: '2024-01-15',
            fee: 0,
        },
        {
            id: 'DEP002',
            amount: 250,
            method: 'Credit Card',
            status: 'Processing',
            date: '2024-01-14',
            fee: 7.25,
        },
        {
            id: 'DEP003',
            amount: 1000,
            method: 'Bitcoin',
            status: 'Completed',
            date: '2024-01-13',
            fee: 0,
        },
    ];

    // Crypto addresses
    const cryptoAddresses = {
        bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        ethereum: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2b8b3C2',
        usdt: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2b8b3C2',
    };

    const handleMethodSelect = (method) => {
        setSelectedMethod(method.id);
        setDepositData({ ...depositData, method: method.id });
        setActiveStep(1);
    };

    const handleDepositSubmit = () => {
        if (!depositData.amount || !depositData.method) {
            toast({
                title: 'Missing Information',
                description: 'Please fill in all required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Deposit Request Submitted!',
            description: 'Your deposit request has been submitted successfully. You will receive a confirmation email shortly.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        setActiveStep(3);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied!',
            description: 'Address copied to clipboard',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'green';
            case 'Processing': return 'yellow';
            case 'Pending': return 'orange';
            case 'Failed': return 'red';
            default: return 'gray';
        }
    };

    return (
        <Box>
            <Heading size="lg" mb={6}>
                Make a Deposit
            </Heading>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
                {/* Main Deposit Form */}
                <GridItem>
                    <Card bg={cardBg} border="1px" borderColor={borderColor}>
                        <CardHeader>
                            <Stepper index={activeStep} colorScheme="blue" size="sm">
                                {steps.map((step, index) => (
                                    <Step key={index}>
                                        <StepIndicator>
                                            <StepStatus
                                                complete={<StepIcon />}
                                                incomplete={<StepNumber />}
                                                active={<StepNumber />}
                                            />
                                        </StepIndicator>
                                        <Box flexShrink="0">
                                            <StepTitle>{step.title}</StepTitle>
                                            <StepDescription>{step.description}</StepDescription>
                                        </Box>
                                        <StepSeparator />
                                    </Step>
                                ))}
                            </Stepper>
                        </CardHeader>

                        <CardBody>
                            {activeStep === 0 && (
                                <VStack spacing={6} align="stretch">
                                    <Alert status="info" borderRadius="lg">
                                        <AlertIcon />
                                        <Box>
                                            <AlertTitle>Choose Your Payment Method</AlertTitle>
                                            <AlertDescription>
                                                Select the payment method that works best for you. Each method has different processing times and fees.
                                            </AlertDescription>
                                        </Box>
                                    </Alert>

                                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                                        {paymentMethods.map((method) => (
                                            <Card
                                                key={method.id}
                                                border="2px"
                                                borderColor={selectedMethod === method.id ? `${method.color}.300` : borderColor}
                                                cursor="pointer"
                                                onClick={() => handleMethodSelect(method)}
                                                _hover={{
                                                    borderColor: `${method.color}.300`,
                                                    transform: 'translateY(-2px)',
                                                }}
                                                transition="all 0.2s"
                                            >
                                                <CardBody>
                                                    <VStack spacing={3}>
                                                        <Icon
                                                            as={method.icon}
                                                            boxSize={8}
                                                            color={`${method.color}.500`}
                                                        />
                                                        <VStack spacing={1}>
                                                            <Text fontWeight="bold">{method.name}</Text>
                                                            <Text fontSize="sm" color={textColor} textAlign="center">
                                                                {method.description}
                                                            </Text>
                                                        </VStack>
                                                        <VStack spacing={1} fontSize="sm">
                                                            <HStack justify="space-between" w="full">
                                                                <Text color={textColor}>Min/Max:</Text>
                                                                <Text fontWeight="medium">
                                                                    ${method.minAmount} - ${method.maxAmount.toLocaleString()}
                                                                </Text>
                                                            </HStack>
                                                            <HStack justify="space-between" w="full">
                                                                <Text color={textColor}>Processing:</Text>
                                                                <Text fontWeight="medium">{method.processingTime}</Text>
                                                            </HStack>
                                                            <HStack justify="space-between" w="full">
                                                                <Text color={textColor}>Fee:</Text>
                                                                <Text fontWeight="medium" color={method.fee === '0%' ? 'green.500' : 'orange.500'}>
                                                                    {method.fee}
                                                                </Text>
                                                            </HStack>
                                                        </VStack>
                                                    </VStack>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </Grid>
                                </VStack>
                            )}

                            {activeStep === 1 && (
                                <VStack spacing={6} align="stretch">
                                    <Alert status="warning" borderRadius="lg">
                                        <AlertIcon />
                                        <AlertDescription>
                                            Please double-check all information before submitting your deposit request.
                                        </AlertDescription>
                                    </Alert>

                                    <FormControl isRequired>
                                        <FormLabel>Deposit Amount</FormLabel>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={depositData.amount}
                                            onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                                        />
                                        <Text fontSize="sm" color={textColor} mt={1}>
                                            Minimum: $50 | Maximum: $50,000
                                        </Text>
                                    </FormControl>

                                    {selectedMethod === 'bank' && (
                                        <VStack spacing={4} align="stretch">
                                            <FormControl>
                                                <FormLabel>Bank Account Details</FormLabel>
                                                <Textarea
                                                    placeholder="Enter your bank account details (Account holder name, Account number, Bank name, etc.)"
                                                    value={depositData.accountDetails}
                                                    onChange={(e) => setDepositData({ ...depositData, accountDetails: e.target.value })}
                                                />
                                            </FormControl>
                                        </VStack>
                                    )}

                                    {selectedMethod === 'card' && (
                                        <Alert status="info" borderRadius="lg">
                                            <AlertIcon />
                                            <AlertDescription>
                                                You will be redirected to our secure payment processor to complete your card payment.
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {selectedMethod === 'crypto' && (
                                        <VStack spacing={4} align="stretch">
                                            <Alert status="info" borderRadius="lg">
                                                <AlertIcon />
                                                <AlertDescription>
                                                    Send your cryptocurrency to the address below and enter the transaction ID.
                                                </AlertDescription>
                                            </Alert>

                                            <Tabs variant="enclosed" size="sm">
                                                <TabList>
                                                    <Tab>Bitcoin</Tab>
                                                    <Tab>Ethereum</Tab>
                                                    <Tab>USDT</Tab>
                                                </TabList>
                                                <TabPanels>
                                                    {Object.entries(cryptoAddresses).map(([crypto, address]) => (
                                                        <TabPanel key={crypto} p={4}>
                                                            <VStack spacing={3}>
                                                                <Text fontSize="sm" fontWeight="medium">
                                                                    {crypto.toUpperCase()} Address:
                                                                </Text>
                                                                <HStack w="full">
                                                                    <Code p={2} fontSize="sm" flex="1" wordBreak="break-all">
                                                                        {address}
                                                                    </Code>
                                                                    <Button
                                                                        size="sm"
                                                                        leftIcon={<FiCopy />}
                                                                        onClick={() => copyToClipboard(address)}
                                                                    >
                                                                        Copy
                                                                    </Button>
                                                                </HStack>
                                                            </VStack>
                                                        </TabPanel>
                                                    ))}
                                                </TabPanels>
                                            </Tabs>

                                            <FormControl>
                                                <FormLabel>Transaction ID</FormLabel>
                                                <Input
                                                    placeholder="Enter transaction hash/ID after sending"
                                                    value={depositData.transactionId}
                                                    onChange={(e) => setDepositData({ ...depositData, transactionId: e.target.value })}
                                                />
                                            </FormControl>
                                        </VStack>
                                    )}

                                    <FormControl>
                                        <FormLabel>Additional Notes (Optional)</FormLabel>
                                        <Textarea
                                            placeholder="Any additional information or notes"
                                            value={depositData.notes}
                                            onChange={(e) => setDepositData({ ...depositData, notes: e.target.value })}
                                        />
                                    </FormControl>

                                    <HStack spacing={3} justify="flex-end">
                                        <Button onClick={() => setActiveStep(0)}>
                                            Back
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => setActiveStep(2)}
                                            isDisabled={!depositData.amount}
                                        >
                                            Continue
                                        </Button>
                                    </HStack>
                                </VStack>
                            )}

                            {activeStep === 2 && (
                                <VStack spacing={6} align="stretch">
                                    <Alert status="success" borderRadius="lg">
                                        <AlertIcon />
                                        <Box>
                                            <AlertTitle>Review Your Deposit</AlertTitle>
                                            <AlertDescription>
                                                Please review all details before confirming your deposit.
                                            </AlertDescription>
                                        </Box>
                                    </Alert>

                                    <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                                        <VStack spacing={3} align="stretch">
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Amount:</Text>
                                                <Text fontSize="lg" fontWeight="bold" color="green.500">
                                                    ${parseFloat(depositData.amount || 0).toLocaleString()}
                                                </Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Method:</Text>
                                                <Text>{paymentMethods.find(m => m.id === selectedMethod)?.name}</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Processing Time:</Text>
                                                <Text>{paymentMethods.find(m => m.id === selectedMethod)?.processingTime}</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Fee:</Text>
                                                <Text color={paymentMethods.find(m => m.id === selectedMethod)?.fee === '0%' ? 'green.500' : 'orange.500'}>
                                                    {paymentMethods.find(m => m.id === selectedMethod)?.fee}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </Box>

                                    <HStack spacing={3} justify="flex-end">
                                        <Button onClick={() => setActiveStep(1)}>
                                            Back
                                        </Button>
                                        <Button
                                            colorScheme="green"
                                            leftIcon={<FiCheck />}
                                            onClick={handleDepositSubmit}
                                        >
                                            Confirm Deposit
                                        </Button>
                                    </HStack>
                                </VStack>
                            )}

                            {activeStep === 3 && (
                                <VStack spacing={6} align="stretch" textAlign="center">
                                    <Icon as={FiCheck} boxSize={16} color="green.500" mx="auto" />
                                    <VStack spacing={2}>
                                        <Heading size="md" color="green.500">
                                            Deposit Request Submitted!
                                        </Heading>
                                        <Text color={textColor}>
                                            Your deposit request has been submitted successfully.
                                        </Text>
                                    </VStack>

                                    <Box p={4} bg={useColorModeValue('green.50', 'green.900')} borderRadius="lg">
                                        <VStack spacing={2}>
                                            <Text fontSize="sm" fontWeight="medium">
                                                Reference ID: DEP{Date.now().toString().slice(-6)}
                                            </Text>
                                            <Text fontSize="sm" color={textColor}>
                                                Please save this reference ID for your records.
                                            </Text>
                                        </VStack>
                                    </Box>

                                    <Button
                                        colorScheme="blue"
                                        onClick={() => {
                                            setActiveStep(0);
                                            setDepositData({
                                                amount: '',
                                                method: '',
                                                accountDetails: '',
                                                transactionId: '',
                                                notes: '',
                                            });
                                            setSelectedMethod('');
                                        }}
                                    >
                                        Make Another Deposit
                                    </Button>
                                </VStack>
                            )}
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Sidebar */}
                <GridItem>
                    <VStack spacing={6} align="stretch">
                        {/* Deposit History */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Recent Deposits</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3} align="stretch">
                                    {recentDeposits.map((deposit) => (
                                        <Box
                                            key={deposit.id}
                                            p={3}
                                            border="1px"
                                            borderColor={borderColor}
                                            borderRadius="lg"
                                        >
                                            <VStack spacing={2} align="stretch">
                                                <HStack justify="space-between">
                                                    <Text fontSize="sm" fontWeight="medium">
                                                        ${deposit.amount}
                                                    </Text>
                                                    <Badge
                                                        colorScheme={getStatusColor(deposit.status)}
                                                        variant="subtle"
                                                        size="sm"
                                                    >
                                                        {deposit.status}
                                                    </Badge>
                                                </HStack>
                                                <HStack justify="space-between" fontSize="xs" color={textColor}>
                                                    <Text>{deposit.method}</Text>
                                                    <Text>{deposit.date}</Text>
                                                </HStack>
                                                {deposit.fee > 0 && (
                                                    <Text fontSize="xs" color="orange.500">
                                                        Fee: ${deposit.fee}
                                                    </Text>
                                                )}
                                            </VStack>
                                        </Box>
                                    ))}
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Deposit Tips */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Deposit Tips</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3} align="stretch" fontSize="sm">
                                    <HStack align="start">
                                        <Icon as={FiAlertCircle} color="blue.500" mt={0.5} />
                                        <Text>
                                            Bank transfers are the most secure option with no fees.
                                        </Text>
                                    </HStack>
                                    <HStack align="start">
                                        <Icon as={FiClock} color="orange.500" mt={0.5} />
                                        <Text>
                                            Processing times vary by payment method. Check details before depositing.
                                        </Text>
                                    </HStack>
                                    <HStack align="start">
                                        <Icon as={FiDollarSign} color="green.500" mt={0.5} />
                                        <Text>
                                            Minimum deposit amounts apply. Higher amounts may require verification.
                                        </Text>
                                    </HStack>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Support */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Need Help?</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3}>
                                    <Text fontSize="sm" color={textColor} textAlign="center">
                                        Having trouble with your deposit? Our support team is here to help.
                                    </Text>
                                    <Button size="sm" colorScheme="blue" variant="outline" w="full">
                                        Contact Support
                                    </Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default Deposit;