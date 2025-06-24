import React from 'react';
import {
    Box,
    Grid,
    GridItem,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
    HStack,
    Progress,
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
    Flex,
    Avatar,
    Button,
    Divider,
} from '@chakra-ui/react';
import {
    FiTrendingUp,
    FiTrendingDown,
    FiDollarSign,
    FiCreditCard,
    FiActivity,
    FiUsers,
    FiArrowUpRight,
    FiArrowDownRight,
} from 'react-icons/fi';
import { AiOutlineWallet, AiOutlineBank } from 'react-icons/ai';

const Dashboard = () => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    // Sample data
    const stats = [
        {
            label: 'Total Balance',
            value: '$15,420.50',
            change: '+12.5%',
            isPositive: true,
            icon: AiOutlineWallet,
            color: 'blue',
        },
        {
            label: 'Active Investments',
            value: '$8,750.00',
            change: '+8.2%',
            isPositive: true,
            icon: FiTrendingUp,
            color: 'green',
        },
        {
            label: 'Total Profit',
            value: '$2,340.75',
            change: '+15.3%',
            isPositive: true,
            icon: FiDollarSign,
            color: 'purple',
        },
        {
            label: 'Pending Withdrawals',
            value: '$1,200.00',
            change: '-5.1%',
            isPositive: false,
            icon: AiOutlineBank,
            color: 'orange',
        },
    ];

    const recentTransactions = [
        {
            id: 1,
            type: 'Deposit',
            amount: '+$500.00',
            status: 'Completed',
            date: '2024-01-15',
            method: 'Bank Transfer',
            isPositive: true,
        },
        {
            id: 2,
            type: 'Investment',
            amount: '-$1,000.00',
            status: 'Active',
            date: '2024-01-14',
            method: 'Gold Package',
            isPositive: false,
        },
        {
            id: 3,
            type: 'Profit',
            amount: '+$125.50',
            status: 'Completed',
            date: '2024-01-13',
            method: 'Daily Return',
            isPositive: true,
        },
        {
            id: 4,
            type: 'Withdrawal',
            amount: '-$300.00',
            status: 'Processing',
            date: '2024-01-12',
            method: 'PayPal',
            isPositive: false,
        },
    ];

    const activePackages = [
        {
            name: 'Gold Package',
            investment: '$1,000.00',
            dailyReturn: '2.5%',
            totalReturn: '$125.50',
            daysLeft: 28,
            progress: 65,
            status: 'Active',
        },
        {
            name: 'Silver Package',
            investment: '$500.00',
            dailyReturn: '1.8%',
            totalReturn: '$45.20',
            daysLeft: 15,
            progress: 80,
            status: 'Active',
        },
        {
            name: 'Platinum Package',
            investment: '$2,000.00',
            dailyReturn: '3.2%',
            totalReturn: '$320.00',
            daysLeft: 45,
            progress: 35,
            status: 'Active',
        },
    ];

    return (
        <Box>
            {/* Welcome Section */}
            <Box mb={8} mt={10}>
                <Heading size="lg" mb={2}>
                    Welcome back, John! 👋
                </Heading>
                <Text color={textColor}>
                    Here's what's happening with your investments today.
                </Text>
            </Box>

            {/* Stats Grid */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
                {stats.map((stat, index) => (
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
                                    <Badge
                                        colorScheme={stat.isPositive ? 'green' : 'red'}
                                        variant="subtle"
                                    >
                                        {stat.change}
                                    </Badge>
                                </HStack>
                                <Stat>
                                    <StatNumber fontSize="2xl" fontWeight="bold">
                                        {stat.value}
                                    </StatNumber>
                                    <StatLabel color={textColor} fontSize="sm">
                                        {stat.label}
                                    </StatLabel>
                                </Stat>
                            </CardBody>
                        </Card>
                    </GridItem>
                ))}
            </Grid>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
                {/* Recent Transactions */}
                <GridItem>
                    <Card bg={cardBg} border="1px" borderColor={borderColor}>
                        <CardHeader>
                            <HStack justify="space-between">
                                <Heading size="md">Recent Transactions</Heading>
                                <Button size="sm" variant="ghost" colorScheme="blue">
                                    View All
                                </Button>
                            </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
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
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="semibold"
                                                        color={transaction.isPositive ? 'green.500' : 'red.500'}
                                                    >
                                                        {transaction.amount}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        size="sm"
                                                        colorScheme={
                                                            transaction.status === 'Completed' ? 'green' :
                                                            transaction.status === 'Processing' ? 'yellow' : 'blue'
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

                {/* Quick Actions */}
                <GridItem>
                    <Card bg={cardBg} border="1px" borderColor={borderColor} mb={6}>
                        <CardHeader>
                            <Heading size="md">Quick Actions</Heading>
                        </CardHeader>
                        <CardBody pt={0}>
                            <VStack spacing={3}>
                                <Button
                                    w="full"
                                    leftIcon={<FiArrowUpRight />}
                                    colorScheme="green"
                                    variant="outline"
                                >
                                    Make Deposit
                                </Button>
                                <Button
                                    w="full"
                                    leftIcon={<FiArrowDownRight />}
                                    colorScheme="blue"
                                    variant="outline"
                                >
                                    Request Withdrawal
                                </Button>
                                <Button
                                    w="full"
                                    leftIcon={<FiActivity />}
                                    colorScheme="purple"
                                    variant="outline"
                                >
                                    View Packages
                                </Button>
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* Account Status */}
                    <Card bg={cardBg} border="1px" borderColor={borderColor}>
                        <CardHeader>
                            <Heading size="md">Account Status</Heading>
                        </CardHeader>
                        <CardBody pt={0}>
                            <VStack spacing={4} align="stretch">
                                <HStack justify="space-between">
                                    <Text fontSize="sm" color={textColor}>
                                        Verification Status
                                    </Text>
                                    <Badge colorScheme="green" variant="subtle">
                                        Verified
                                    </Badge>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text fontSize="sm" color={textColor}>
                                        Account Type
                                    </Text>
                                    <Badge colorScheme="purple" variant="subtle">
                                        Premium
                                    </Badge>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text fontSize="sm" color={textColor}>
                                        Member Since
                                    </Text>
                                    <Text fontSize="sm" fontWeight="medium">
                                        Jan 2024
                                    </Text>
                                </HStack>
                            </VStack>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>

            {/* Active Packages */}
            <Card bg={cardBg} border="1px" borderColor={borderColor}>
                <CardHeader>
                    <Heading size="md">Active Investment Packages</Heading>
                </CardHeader>
                <CardBody pt={0}>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
                        {activePackages.map((pkg, index) => (
                            <Box
                                key={index}
                                p={4}
                                border="1px"
                                borderColor={borderColor}
                                borderRadius="lg"
                                bg={useColorModeValue('gray.50', 'gray.700')}
                            >
                                <VStack align="stretch" spacing={3}>
                                    <HStack justify="space-between">
                                        <Text fontWeight="semibold">{pkg.name}</Text>
                                        <Badge colorScheme="green" variant="subtle">
                                            {pkg.status}
                                        </Badge>
                                    </HStack>
                                    
                                    <VStack align="stretch" spacing={2}>
                                        <HStack justify="space-between">
                                            <Text fontSize="sm" color={textColor}>Investment:</Text>
                                            <Text fontSize="sm" fontWeight="medium">{pkg.investment}</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="sm" color={textColor}>Daily Return:</Text>
                                            <Text fontSize="sm" fontWeight="medium" color="green.500">
                                                {pkg.dailyReturn}
                                            </Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="sm" color={textColor}>Total Earned:</Text>
                                            <Text fontSize="sm" fontWeight="medium" color="green.500">
                                                {pkg.totalReturn}
                                            </Text>
                                        </HStack>
                                    </VStack>

                                    <Box>
                                        <HStack justify="space-between" mb={1}>
                                            <Text fontSize="sm" color={textColor}>Progress</Text>
                                            <Text fontSize="sm" color={textColor}>{pkg.daysLeft} days left</Text>
                                        </HStack>
                                        <Progress
                                            value={pkg.progress}
                                            colorScheme="blue"
                                            size="sm"
                                            borderRadius="full"
                                        />
                                    </Box>
                                </VStack>
                            </Box>
                        ))}
                    </Grid>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Dashboard;