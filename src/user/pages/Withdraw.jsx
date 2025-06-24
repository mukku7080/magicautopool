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
    Code,
    Divider,
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
    Progress,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import {
    FiCreditCard,
    FiDollarSign,
    FiClock,
    FiCheck,
    FiAlertCircle,
    FiCopy,
    FiDownload,
    FiShield,
    FiEye,
} from 'react-icons/fi';
import { AiOutlineBank, AiOutlineMobile, AiOutlineWallet } from 'react-icons/ai';
import { SiBitcoin, SiEthereum } from 'react-icons/si';

const Withdraw = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [withdrawData, setWithdrawData] = useState({
        amount: '',
        method: '',
        accountDetails: '',
        walletAddress: '',
        notes: '',
    });

    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    const steps = [
        { title: 'Select Method', description: 'Choose withdrawal method' },
        { title: 'Enter Details', description: 'Fill withdrawal information' },
        { title: 'Verify Request', description: 'Review and confirm' },
        { title: 'Confirmation', description: 'Request submitted' },
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    // Available balance
    const availableBalance = 12850.75;
    const lockedBalance = 2569.75;
    const minimumBalance = 10.00; // Minimum balance to maintain

    // Withdrawal methods
    const withdrawalMethods = [
        {
            id: 'bank',
            name: 'Bank Transfer',
            icon: AiOutlineBank,
            color: 'blue',
            minAmount: 50,
            maxAmount: 50000,
            processingTime: '3-5 business days',
            fee: '$5.00',
            description: 'Direct transfer to your bank account',
        },
        {
            id: 'card',
            name: 'Debit Card',
            icon: FiCreditCard,
            color: 'green',
            minAmount: 20,
            maxAmount: 5000,
            processingTime: '1-2 business days',
            fee: '2.5%',
            description: 'Withdraw to your registered debit card',
        },
        {
            id: 'crypto',
            name: 'Cryptocurrency',
            icon: SiBitcoin,
            color: 'orange',
            minAmount: 25,
            maxAmount: 100000,
            processingTime: '10-60 minutes',
            fee: 'Network fee',
            description: 'Bitcoin, Ethereum, and other cryptocurrencies',
        },
        {
            id: 'mobile',
            name: 'Mobile Payment',
            icon: AiOutlineMobile,
            color: 'purple',
            minAmount: 10,
            maxAmount: 2000,
            processingTime: 'Instant',
            fee: '1.5%',
            description: 'PayPal, Apple Pay, Google Pay',
        },
    ];

    // Recent withdrawals
    const recentWithdrawals = [
        {
            id: 'WTH001',
            amount: 300,
            method: 'Bank Transfer',
            status: 'Processing',
            date: '2024-01-15',
            fee: 5.00,
            reference: 'BT240115001',
        },
        {
            id: 'WTH002',
            amount: 150,
            method: 'PayPal',
            status: 'Completed',
            date: '2024-01-12',
            fee: 2.25,
            reference: 'PP240112001',
        },
        {
            id: 'WTH003',
            amount: 500,
            method: 'Bitcoin',
            status: 'Completed',
            date: '2024-01-10',
            fee: 0.0005,
            reference: 'BTC240110001',
        },
    ];

    const handleMethodSelect = (method) => {
        setSelectedMethod(method.id);
        setWithdrawData({ ...withdrawData, method: method.id });
        setActiveStep(1);
    };

    const handleWithdrawSubmit = () => {
        const amount = parseFloat(withdrawData.amount);
        const selectedMethodData = withdrawalMethods.find(m => m.id === selectedMethod);

        if (!amount || !withdrawData.method) {
            toast({
                title: 'Missing Information',
                description: 'Please fill in all required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (amount < selectedMethodData.minAmount || amount > selectedMethodData.maxAmount) {
            toast({
                title: 'Invalid Amount',
                description: `Amount must be between $${selectedMethodData.minAmount} and $${selectedMethodData.maxAmount}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (amount > availableBalance - minimumBalance) {
            toast({
                title: 'Insufficient Balance',
                description: `You can withdraw up to $${(availableBalance - minimumBalance).toFixed(2)}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Withdrawal Request Submitted!',
            description: 'Your withdrawal request has been submitted and is being processed.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        setActiveStep(3);
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

    const calculateFee = (amount, method) => {
        const methodData = withdrawalMethods.find(m => m.id === method);
        if (!methodData || !amount) return 0;

        if (methodData.fee.includes('%')) {
            const percentage = parseFloat(methodData.fee.replace('%', ''));
            return (amount * percentage) / 100;
        } else if (methodData.fee.includes('$')) {
            return parseFloat(methodData.fee.replace('$', ''));
        }
        return 0;
    };

    return (
        <Box>
            <Heading size="lg" mb={6}>
                Withdraw Funds
            </Heading>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
                {/* Main Withdrawal Form */}
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
                                    {/* Balance Overview */}
                                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                                        <Card bg={useColorModeValue('green.50', 'green.900')} border="1px" borderColor="green.200">
                                            <CardBody textAlign="center">
                                                <Stat>
                                                    <StatLabel fontSize="sm">Available Balance</StatLabel>
                                                    <StatNumber color="green.500" fontSize="lg">
                                                        ${availableBalance.toLocaleString()}
                                                    </StatNumber>
                                                </Stat>
                                            </CardBody>
                                        </Card>
                                        <Card bg={useColorModeValue('orange.50', 'orange.900')} border="1px" borderColor="orange.200">
                                            <CardBody textAlign="center">
                                                <Stat>
                                                    <StatLabel fontSize="sm">Locked Balance</StatLabel>
                                                    <StatNumber color="orange.500" fontSize="lg">
                                                        ${lockedBalance.toLocaleString()}
                                                    </StatNumber>
                                                </Stat>
                                            </CardBody>
                                        </Card>
                                        <Card bg={useColorModeValue('blue.50', 'blue.900')} border="1px" borderColor="blue.200">
                                            <CardBody textAlign="center">
                                                <Stat>
                                                    <StatLabel fontSize="sm">Max Withdrawal</StatLabel>
                                                    <StatNumber color="blue.500" fontSize="lg">
                                                        ${(availableBalance - minimumBalance).toLocaleString()}
                                                    </StatNumber>
                                                </Stat>
                                            </CardBody>
                                        </Card>
                                    </Grid>

                                    <Alert status="info" borderRadius="lg">
                                        <AlertIcon />
                                        <Box>
                                            <AlertTitle>Choose Your Withdrawal Method</AlertTitle>
                                            <AlertDescription>
                                                Select how you'd like to receive your funds. Processing times and fees vary by method.
                                            </AlertDescription>
                                        </Box>
                                    </Alert>

                                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                                        {withdrawalMethods.map((method) => (
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
                                                                <Text fontWeight="medium" color="orange.500">
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
                                            Please ensure all withdrawal details are correct. Incorrect information may delay processing.
                                        </AlertDescription>
                                    </Alert>

                                    <FormControl isRequired>
                                        <FormLabel>Withdrawal Amount</FormLabel>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={withdrawData.amount}
                                            onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                                        />
                                        <Text fontSize="sm" color={textColor} mt={1}>
                                            Available: ${availableBalance.toLocaleString()} | 
                                            Max withdrawal: ${(availableBalance - minimumBalance).toLocaleString()}
                                        </Text>
                                    </FormControl>

                                    {withdrawData.amount && (
                                        <Box p={3} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg">
                                            <VStack spacing={2} fontSize="sm">
                                                <HStack justify="space-between" w="full">
                                                    <Text>Withdrawal Amount:</Text>
                                                    <Text fontWeight="bold">${parseFloat(withdrawData.amount || 0).toLocaleString()}</Text>
                                                </HStack>
                                                <HStack justify="space-between" w="full">
                                                    <Text>Processing Fee:</Text>
                                                    <Text fontWeight="bold" color="orange.500">
                                                        ${calculateFee(parseFloat(withdrawData.amount || 0), selectedMethod).toFixed(2)}
                                                    </Text>
                                                </HStack>
                                                <Divider />
                                                <HStack justify="space-between" w="full">
                                                    <Text fontWeight="bold">You'll Receive:</Text>
                                                    <Text fontWeight="bold" color="green.500">
                                                        ${(parseFloat(withdrawData.amount || 0) - calculateFee(parseFloat(withdrawData.amount || 0), selectedMethod)).toFixed(2)}
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    )}

                                    {selectedMethod === 'bank' && (
                                        <VStack spacing={4} align="stretch">
                                            <FormControl isRequired>
                                                <FormLabel>Bank Account Details</FormLabel>
                                                <Textarea
                                                    placeholder="Enter your bank account details (Account holder name, Account number, Bank name, Routing number, etc.)"
                                                    value={withdrawData.accountDetails}
                                                    onChange={(e) => setWithdrawData({ ...withdrawData, accountDetails: e.target.value })}
                                                />
                                            </FormControl>
                                        </VStack>
                                    )}

                                    {selectedMethod === 'crypto' && (
                                        <VStack spacing={4} align="stretch">
                                            <FormControl isRequired>
                                                <FormLabel>Cryptocurrency</FormLabel>
                                                <Select placeholder="Select cryptocurrency">
                                                    <option value="bitcoin">Bitcoin (BTC)</option>
                                                    <option value="ethereum">Ethereum (ETH)</option>
                                                    <option value="usdt">Tether (USDT)</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Wallet Address</FormLabel>
                                                <Input
                                                    placeholder="Enter your wallet address"
                                                    value={withdrawData.walletAddress}
                                                    onChange={(e) => setWithdrawData({ ...withdrawData, walletAddress: e.target.value })}
                                                />
                                                <Text fontSize="sm" color="red.500" mt={1}>
                                                    ⚠️ Double-check your wallet address. Incorrect addresses may result in permanent loss of funds.
                                                </Text>
                                            </FormControl>
                                        </VStack>
                                    )}

                                    {selectedMethod === 'mobile' && (
                                        <VStack spacing={4} align="stretch">
                                            <FormControl isRequired>
                                                <FormLabel>Payment Service</FormLabel>
                                                <Select placeholder="Select payment service">
                                                    <option value="paypal">PayPal</option>
                                                    <option value="applepay">Apple Pay</option>
                                                    <option value="googlepay">Google Pay</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Account Email/Phone</FormLabel>
                                                <Input
                                                    placeholder="Enter your account email or phone number"
                                                    value={withdrawData.accountDetails}
                                                    onChange={(e) => setWithdrawData({ ...withdrawData, accountDetails: e.target.value })}
                                                />
                                            </FormControl>
                                        </VStack>
                                    )}

                                    <FormControl>
                                        <FormLabel>Additional Notes (Optional)</FormLabel>
                                        <Textarea
                                            placeholder="Any additional information or special instructions"
                                            value={withdrawData.notes}
                                            onChange={(e) => setWithdrawData({ ...withdrawData, notes: e.target.value })}
                                        />
                                    </FormControl>

                                    <HStack spacing={3} justify="flex-end">
                                        <Button onClick={() => setActiveStep(0)}>
                                            Back
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => setActiveStep(2)}
                                            isDisabled={!withdrawData.amount}
                                        >
                                            Continue
                                        </Button>
                                    </HStack>
                                </VStack>
                            )}

                            {activeStep === 2 && (
                                <VStack spacing={6} align="stretch">
                                    <Alert status="warning" borderRadius="lg">
                                        <AlertIcon />
                                        <Box>
                                            <AlertTitle>Verify Your Withdrawal Request</AlertTitle>
                                            <AlertDescription>
                                                Please review all details carefully. Once submitted, this request cannot be modified.
                                            </AlertDescription>
                                        </Box>
                                    </Alert>

                                    <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                                        <VStack spacing={3} align="stretch">
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Withdrawal Amount:</Text>
                                                <Text fontSize="lg" fontWeight="bold" color="blue.500">
                                                    ${parseFloat(withdrawData.amount || 0).toLocaleString()}
                                                </Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Method:</Text>
                                                <Text>{withdrawalMethods.find(m => m.id === selectedMethod)?.name}</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Processing Time:</Text>
                                                <Text>{withdrawalMethods.find(m => m.id === selectedMethod)?.processingTime}</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontWeight="medium">Processing Fee:</Text>
                                                <Text color="orange.500">
                                                    ${calculateFee(parseFloat(withdrawData.amount || 0), selectedMethod).toFixed(2)}
                                                </Text>
                                            </HStack>
                                            <Divider />
                                            <HStack justify="space-between">
                                                <Text fontWeight="bold">You'll Receive:</Text>
                                                <Text fontSize="lg" fontWeight="bold" color="green.500">
                                                    ${(parseFloat(withdrawData.amount || 0) - calculateFee(parseFloat(withdrawData.amount || 0), selectedMethod)).toFixed(2)}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </Box>

                                    <Alert status="info" borderRadius="lg">
                                        <AlertIcon />
                                        <AlertDescription fontSize="sm">
                                            <VStack spacing={1} align="start">
                                                <Text>• Withdrawals are processed during business hours (Mon-Fri, 9 AM - 5 PM EST)</Text>
                                                <Text>• You'll receive email notifications about your withdrawal status</Text>
                                                <Text>• Contact support if you need to cancel or modify this request</Text>
                                            </VStack>
                                        </AlertDescription>
                                    </Alert>

                                    <HStack spacing={3} justify="flex-end">
                                        <Button onClick={() => setActiveStep(1)}>
                                            Back
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            leftIcon={<FiDownload />}
                                            onClick={handleWithdrawSubmit}
                                        >
                                            Submit Withdrawal Request
                                        </Button>
                                    </HStack>
                                </VStack>
                            )}

                            {activeStep === 3 && (
                                <VStack spacing={6} align="stretch" textAlign="center">
                                    <Icon as={FiCheck} boxSize={16} color="green.500" mx="auto" />
                                    <VStack spacing={2}>
                                        <Heading size="md" color="green.500">
                                            Withdrawal Request Submitted!
                                        </Heading>
                                        <Text color={textColor}>
                                            Your withdrawal request is being processed.
                                        </Text>
                                    </VStack>

                                    <Box p={4} bg={useColorModeValue('green.50', 'green.900')} borderRadius="lg">
                                        <VStack spacing={2}>
                                            <Text fontSize="sm" fontWeight="medium">
                                                Reference ID: WTH{Date.now().toString().slice(-6)}
                                            </Text>
                                            <Text fontSize="sm" color={textColor}>
                                                Expected processing time: {withdrawalMethods.find(m => m.id === selectedMethod)?.processingTime}
                                            </Text>
                                        </VStack>
                                    </Box>

                                    <Button
                                        colorScheme="blue"
                                        onClick={() => {
                                            setActiveStep(0);
                                            setWithdrawData({
                                                amount: '',
                                                method: '',
                                                accountDetails: '',
                                                walletAddress: '',
                                                notes: '',
                                            });
                                            setSelectedMethod('');
                                        }}
                                    >
                                        Make Another Withdrawal
                                    </Button>
                                </VStack>
                            )}
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Sidebar */}
                <GridItem>
                    <VStack spacing={6} align="stretch">
                        {/* Withdrawal History */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Recent Withdrawals</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3} align="stretch">
                                    {recentWithdrawals.map((withdrawal) => (
                                        <Box
                                            key={withdrawal.id}
                                            p={3}
                                            border="1px"
                                            borderColor={borderColor}
                                            borderRadius="lg"
                                        >
                                            <VStack spacing={2} align="stretch">
                                                <HStack justify="space-between">
                                                    <Text fontSize="sm" fontWeight="medium">
                                                        ${withdrawal.amount}
                                                    </Text>
                                                    <Badge
                                                        colorScheme={getStatusColor(withdrawal.status)}
                                                        variant="subtle"
                                                        size="sm"
                                                    >
                                                        {withdrawal.status}
                                                    </Badge>
                                                </HStack>
                                                <HStack justify="space-between" fontSize="xs" color={textColor}>
                                                    <Text>{withdrawal.method}</Text>
                                                    <Text>{withdrawal.date}</Text>
                                                </HStack>
                                                <HStack justify="space-between" fontSize="xs">
                                                    <Text color={textColor}>Ref: {withdrawal.reference}</Text>
                                                    <Text color="orange.500">Fee: ${withdrawal.fee}</Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    ))}
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Withdrawal Limits */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Withdrawal Limits</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3} align="stretch" fontSize="sm">
                                    <HStack justify="space-between">
                                        <Text color={textColor}>Daily Limit:</Text>
                                        <Text fontWeight="medium">$10,000</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text color={textColor}>Weekly Limit:</Text>
                                        <Text fontWeight="medium">$50,000</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text color={textColor}>Monthly Limit:</Text>
                                        <Text fontWeight="medium">$200,000</Text>
                                    </HStack>
                                    <Divider />
                                    <HStack justify="space-between">
                                        <Text color={textColor}>Used Today:</Text>
                                        <Text fontWeight="medium" color="orange.500">$300</Text>
                                    </HStack>
                                    <Progress value={3} colorScheme="orange" size="sm" />
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Security Notice */}
                        <Alert status="warning" borderRadius="lg">
                            <AlertIcon />
                            <Box>
                                <AlertTitle fontSize="sm">Security Notice</AlertTitle>
                                <AlertDescription fontSize="xs">
                                    For your security, large withdrawals may require additional verification. 
                                    Always verify withdrawal details before submitting.
                                </AlertDescription>
                            </Box>
                        </Alert>

                        {/* Support */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Need Help?</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3}>
                                    <Text fontSize="sm" color={textColor} textAlign="center">
                                        Questions about withdrawals? Our support team is available 24/7.
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

export default Withdraw;