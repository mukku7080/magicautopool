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
    Select,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    IconButton,
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
import { AiOutlineWallet, AiOutlineBank, AiOutlineHistory, AiFillWallet } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context';
import { FaGrinTongueWink, FaMoneyBill } from 'react-icons/fa';

const Wallet = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('7d');
    const navigate = useNavigate();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');
    const { profile } = useUser();
    const userData = profile?.USER;
    console.log("wallet", userData);

    // Sample wallet data
    const walletStats = [
        {
            label: 'Referral Income',
            value: userData?.direct_income,
            change: '+12.5%',
            isPositive: true,
            icon: AiOutlineWallet,
            color: 'blue',
        },
        {
            label: 'Monthly ROI',
            value: userData?.stake_income,
            change: '+8.2%',
            isPositive: true,
            icon: FiTrendingUp,
            color: 'green',
        },
        {
            label: 'Autopool Income',
            value: userData?.level_income,
            change: '+15.3%',
            isPositive: true,
            icon: FiDollarSign,
            color: 'orange',
        },
        {
            label: 'Platinum Income',
            value: 0,
            change: '+5.1%',
            isPositive: true,
            icon: FiCreditCard,
            color: 'purple',
        },
        {
            label: 'Reward Income',
            value: userData?.rank_reward,
            change: '+10.8%',
            isPositive: true,
            icon: FiTrendingUp,
            color: 'teal',
        },
        {
            label: 'Total Income',
            value: userData?.total_income,
            change: '+11.2%',
            isPositive: true,
            icon: AiFillWallet,
            color: 'red',
        },
          {
            label: 'Available Amount',
            value: userData?.available_amount,
            change: '+11.2%',
            isPositive: true,
            icon: AiOutlineBank,
            color: 'red',
        },
          {
            label: 'Map Point',
            value: '0',
            change: '+11.2%',
            isPositive: true,
            icon: FaMoneyBill,
            color: 'red',
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

    return (
        <Box>
            <HStack justify="space-between" mb={6}>
                <Heading size="lg">Wallet</Heading>
                <HStack spacing={3}>
                    <Button
                        leftIcon={<FiArrowUpRight />}
                        colorScheme="green"
                        size="sm"
                        onClick={() => navigate('/user/deposit')}
                    >
                        Deposit
                    </Button>
                    <Button
                        leftIcon={<FiArrowDownRight />}
                        colorScheme="blue"
                        size="sm"
                        onClick={() => navigate('/user/Withdraw')}
                    >
                        Withdraw
                    </Button>
                </HStack>
            </HStack>

            {/* Wallet Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mb={8}>
                {walletStats.map((stat, index) => (
                    <GridItem key={index}>
                        <Card
                            bg={cardBg}
                            border="1px"
                            borderColor={borderColor}
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{
                                transform: 'translateY(-2px)',
                                shadow: 'lg',
                                borderColor: `${stat.color}.300`
                            }}
                            onClick={() => {
                                switch (stat.label) {
                                    case 'Referral Income':
                                        navigate('/user/income/direct');
                                        break;
                                    case 'Monthly ROI':
                                        navigate('/user/income/roi');
                                        break;
                                    case 'Autopool Income':
                                        navigate('/user/income/level');
                                        break;
                                    case 'Platinum Income':
                                        navigate('/user/income/platinum');
                                        break;
                                    case 'Reward Income':
                                        navigate('/user/income/reward');
                                        break;
                                    // case 'Total Income':
                                    //     navigate('/user/income/total');
                                    //     break;
                                    default:
                                        break;
                                }
                            }}
                        >
                            <CardBody display={'flex'} gap={10}>
                                <HStack justify="space-between" mb={4}>
                                    <Box
                                        p={3}
                                        borderRadius="lg"
                                        bg={`${stat.color}.100`}
                                        color={`${stat.color}.600`}
                                    >
                                        <Icon as={stat.icon} boxSize={6} />
                                    </Box>
                                    {/* <IconButton
                                        size="sm"
                                        variant="ghost"
                                        icon={showBalance ? <FiEye /> : <FiEyeOff />}
                                        onClick={() => setShowBalance(!showBalance)}
                                        aria-label="Toggle balance visibility"
                                    /> */}
                                </HStack>
                                <Stat>
                                    <StatNumber fontSize="2xl" fontWeight="bold">
                                        {showBalance ? `$${stat?.value?.toLocaleString()}` : '****'}
                                    </StatNumber>
                                    <StatLabel color={textColor} fontSize="sm">
                                        {stat.label}
                                    </StatLabel>
                                    {/* <StatHelpText>
                                        <StatArrow type={stat.isPositive ? 'increase' : 'decrease'} />
                                        {stat.change}
                                    </StatHelpText> */}
                                </Stat>
                            </CardBody>
                        </Card>
                    </GridItem>
                ))}
            </Grid>

            {/* <Grid templateColumns={{ base: '1fr', lg: '1fr' }} gap={6}> */}
                {/* Transaction History */}
                {/* <GridItem>
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
                </GridItem> */}


            {/* </Grid> */}
        </Box>
    );
};

export default Wallet;