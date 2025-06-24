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
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Progress,
    Divider,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
} from '@chakra-ui/react';
import {
    FiTrendingUp,
    FiTrendingDown,
    FiDollarSign,
    FiArrowUpRight,
    FiArrowDownRight,
    FiCreditCard,
    FiRefreshCw,
    FiEye,
    FiEyeOff,
} from 'react-icons/fi';
import { AiOutlineWallet, AiOutlineBank, AiOutlineHistory } from 'react-icons/ai';

const Wallet = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('7d');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState('');
    const toast = useToast();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    // Sample wallet data
    const walletStats = [
        {
            label: 'Total Balance',
            value: 15420.50,
            change: '+12.5%',
            isPositive: true,
            icon: AiOutlineWallet,
            color: 'blue',
        },
        {
            label: 'Available Balance',
            value: 12850.75,
            change: '+8.2%',
            isPositive: true,
            icon: FiDollarSign,
            color: 'green',
        },
        {
            label: 'Locked Balance',
            value: 2569.75,
            change: '+15.3%',
            isPositive: true,
            icon: FiCreditCard,
            color: 'orange',
        },
        {
            label: 'Pending Transactions',
            value: 1200.00,
            change: '-5.1%',
            isPositive: false,
            icon: FiRefreshCw,
            color: 'purple',
        },
    ];

    const recentTransactions = [
        {
            id: 'TXN001',
            type: 'Deposit',
            amount: 500.00,
            status: 'Completed',
            date: '2024-01-15 14:30',
            method: 'Bank Transfer',
            fee: 0.00,
            isPositive: true,
        },
        {
            id: 'TXN002',
            type: 'Investment',
            amount: -1000.00,
            status: 'Completed',
            date: '2024-01-14 10:15',
            method: 'Gold Package',
            fee: 10.00,
            isPositive: false,
        },
        {
            id: 'TXN003',
            type: 'Profit',
            amount: 125.50,
            status: 'Completed',
            date: '2024-01-13 09:00',
            method: 'Daily Return',
            fee: 0.00,
            isPositive: true,
        },
        {
            id: 'TXN004',
            type: 'Withdrawal',
            amount: -300.00,
            status: 'Processing',
            date: '2024-01-12 16:45',
            method: 'PayPal',
            fee: 5.00,
            isPositive: false,
        },
        {
            id: 'TXN005',
            type: 'Deposit',
            amount: 750.00,
            status: 'Completed',
            date: '2024-01-11 11:20',
            method: 'Credit Card',
            fee: 15.00,
            isPositive: true,
        },
    ];

    const walletAddresses = [
        {
            currency: 'Bitcoin',
            symbol: 'BTC',
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            balance: 0.0234,
            usdValue: 1245.67,
        },
        {
            currency: 'Ethereum',
            symbol: 'ETH',
            address: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2b8b3C2',
            balance: 2.456,
            usdValue: 4567.89,
        },
        {
            currency: 'USDT',
            symbol: 'USDT',
            address: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2b8b3C2',
            balance: 5000.00,
            usdValue: 5000.00,
        },
    ];

    const handleQuickAction = (action) => {
        setModalType(action);
        onOpen();
    };

    const handleModalSubmit = () => {
        toast({
            title: `${modalType} Request Submitted`,
            description: `Your ${modalType.toLowerCase()} request has been submitted successfully.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        onClose();
    };

    return (
        <Box>
            <HStack justify="space-between" mb={6}>
                <Heading size="lg">Wallet</Heading>
                <HStack spacing={3}>
                    <Button
                        leftIcon={<FiArrowUpRight />}
                        colorScheme="green"
                        size="sm"
                        onClick={() => handleQuickAction('Deposit')}
                    >
                        Deposit
                    </Button>
                    <Button
                        leftIcon={<FiArrowDownRight />}
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleQuickAction('Withdraw')}
                    >
                        Withdraw
                    </Button>
                </HStack>
            </HStack>

            {/* Wallet Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
                {walletStats.map((stat, index) => (
                    <GridItem key={index}>
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardBody>
                                <HStack justify="space-between" mb={4}>
                                    <Box
                                        p={3}
                                        borderRadius="lg"
                                        bg={`${stat.color}.100`}
                                        color={`${stat.color}.600`}
                                    >
                                        <Icon as={stat.icon} boxSize={6} />
                                    </Box>
                                    <IconButton
                                        size="sm"
                                        variant="ghost"
                                        icon={showBalance ? <FiEye /> : <FiEyeOff />}
                                        onClick={() => setShowBalance(!showBalance)}
                                        aria-label="Toggle balance visibility"
                                    />
                                </HStack>
                                <Stat>
                                    <StatNumber fontSize="2xl" fontWeight="bold">
                                        {showBalance ? `$${stat.value.toLocaleString()}` : '****'}
                                    </StatNumber>
                                    <StatLabel color={textColor} fontSize="sm">
                                        {stat.label}
                                    </StatLabel>
                                    <StatHelpText>
                                        <StatArrow type={stat.isPositive ? 'increase' : 'decrease'} />
                                        {stat.change}
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                    </GridItem>
                ))}
            </Grid>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
                {/* Transaction History */}
                <GridItem>
                    <Card bg={cardBg} border="1px" borderColor={borderColor}>
                        <CardHeader>
                            <HStack justify="space-between">
                                <Heading size="md">Transaction History</Heading>
                                <HStack spacing={2}>
                                    <Select
                                        size="sm"
                                        value={selectedPeriod}
                                        onChange={(e) => setSelectedPeriod(e.target.value)}
                                        w="auto"
                                    >
                                        <option value="7d">Last 7 days</option>
                                        <option value="30d">Last 30 days</option>
                                        <option value="90d">Last 90 days</option>
                                        <option value="1y">Last year</option>
                                    </Select>
                                    <Button size="sm" variant="ghost" colorScheme="blue">
                                        Export
                                    </Button>
                                </HStack>
                            </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Transaction ID</Th>
                                            <Th>Type</Th>
                                            <Th>Amount</Th>
                                            <Th>Status</Th>
                                            <Th>Date</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {recentTransactions.map((transaction) => (
                                            <Tr key={transaction.id}>
                                                <Td>
                                                    <Text fontSize="sm" fontFamily="mono">
                                                        {transaction.id}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontSize="sm" fontWeight="medium">
                                                            {transaction.type}
                                                        </Text>
                                                        <Text fontSize="xs" color={textColor}>
                                                            {transaction.method}
                                                        </Text>
                                                    </VStack>
                                                </Td>
                                                <Td>
                                                    <VStack align="start" spacing={0}>
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight="semibold"
                                                            color={transaction.isPositive ? 'green.500' : 'red.500'}
                                                        >
                                                            {transaction.isPositive ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                                                        </Text>
                                                        {transaction.fee > 0 && (
                                                            <Text fontSize="xs" color={textColor}>
                                                                Fee: ${transaction.fee}
                                                            </Text>
                                                        )}
                                                    </VStack>
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        size="sm"
                                                        colorScheme={
                                                            transaction.status === 'Completed' ? 'green' :
                                                            transaction.status === 'Processing' ? 'yellow' : 'red'
                                                        }
                                                        variant="subtle"
                                                    >
                                                        {transaction.status}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <Text fontSize="sm" color={textColor}>
                                                        {transaction.date}
                                                    </Text>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Sidebar */}
                <GridItem>
                    <VStack spacing={6} align="stretch">
                        {/* Quick Actions */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Quick Actions</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={3}>
                                    <Button
                                        w="full"
                                        leftIcon={<FiArrowUpRight />}
                                        colorScheme="green"
                                        variant="outline"
                                        onClick={() => handleQuickAction('Deposit')}
                                    >
                                        Make Deposit
                                    </Button>
                                    <Button
                                        w="full"
                                        leftIcon={<FiArrowDownRight />}
                                        colorScheme="blue"
                                        variant="outline"
                                        onClick={() => handleQuickAction('Withdraw')}
                                    >
                                        Request Withdrawal
                                    </Button>
                                    <Button
                                        w="full"
                                        leftIcon={<AiOutlineHistory />}
                                        colorScheme="purple"
                                        variant="outline"
                                    >
                                        View All Transactions
                                    </Button>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Crypto Wallets */}
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="sm">Crypto Wallets</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <VStack spacing={4} align="stretch">
                                    {walletAddresses.map((wallet, index) => (
                                        <Box
                                            key={index}
                                            p={3}
                                            border="1px"
                                            borderColor={borderColor}
                                            borderRadius="lg"
                                            bg={useColorModeValue('gray.50', 'gray.700')}
                                        >
                                            <VStack align="stretch" spacing={2}>
                                                <HStack justify="space-between">
                                                    <Text fontWeight="semibold" fontSize="sm">
                                                        {wallet.currency}
                                                    </Text>
                                                    <Badge variant="outline" size="sm">
                                                        {wallet.symbol}
                                                    </Badge>
                                                </HStack>
                                                <Text fontSize="xs" color={textColor} fontFamily="mono">
                                                    {wallet.address.substring(0, 20)}...
                                                </Text>
                                                <HStack justify="space-between">
                                                    <Text fontSize="sm" fontWeight="medium">
                                                        {wallet.balance} {wallet.symbol}
                                                    </Text>
                                                    <Text fontSize="sm" color="green.500">
                                                        ${wallet.usdValue.toLocaleString()}
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    ))}
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Security Notice */}
                        <Alert status="info" borderRadius="lg">
                            <AlertIcon />
                            <Box>
                                <AlertTitle fontSize="sm">Security Notice</AlertTitle>
                                <AlertDescription fontSize="xs">
                                    Always verify wallet addresses before making transactions. Enable 2FA for enhanced security.
                                </AlertDescription>
                            </Box>
                        </Alert>
                    </VStack>
                </GridItem>
            </Grid>

            {/* Quick Action Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalType} Funds</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Amount</FormLabel>
                                <Input placeholder="Enter amount" type="number" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Method</FormLabel>
                                <Select placeholder="Select payment method">
                                    <option value="bank">Bank Transfer</option>
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="crypto">Cryptocurrency</option>
                                </Select>
                            </FormControl>
                            {modalType === 'Deposit' && (
                                <Alert status="info" borderRadius="lg">
                                    <AlertIcon />
                                    <AlertDescription fontSize="sm">
                                        Deposits are usually processed within 1-2 business days.
                                    </AlertDescription>
                                </Alert>
                            )}
                            {modalType === 'Withdraw' && (
                                <Alert status="warning" borderRadius="lg">
                                    <AlertIcon />
                                    <AlertDescription fontSize="sm">
                                        Withdrawals may take 3-5 business days to process.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={handleModalSubmit}>
                            Submit Request
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Wallet;