import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    IconButton,
    useColorModeValue,
    useToast,
    Spinner,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Select,
    Button,
    Icon,
    Flex,
    Progress,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react';
import {
    FiBarChart,
    FiTrendingUp,
    FiRefreshCw,
    FiCalendar,
    FiUser,
    FiArrowLeft,
    FiPieChart,
    FiDollarSign,
    FiLayers,
    FiAward,
    FiGift,

} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useIncome } from '../../../Context/IncomeContext';
import { FaCrown } from 'react-icons/fa';

const TotalIncome = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const {
        directIncomeHistory,
        directIncomeStats,
        levelIncomeHistory,
        levelIncomeStats,
        monthlyROIHistory,
        monthlyROIStats,
        isLoading,
        error,
        refreshAllData,
    } = useIncome();

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.400');
    const brandColor = useColorModeValue('blue.500', 'blue.200');

    // Mock data for platinum and reward income
    const platinumIncomeStats = { totalIncome: 1250.00, todayIncome: 0.00 };
    const rewardIncomeStats = { totalIncome: 425.00, todayIncome: 0.00 };

    useEffect(() => {
        refreshAllData();
    }, []);

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [error, toast]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refreshAllData();
        setRefreshing(false);
        toast({
            title: 'Success',
            description: 'Data refreshed successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    // Calculate total income from all sources
    const totalIncome = (directIncomeStats.totalIncome || 0) +
        (levelIncomeStats.totalIncome || 0) +
        (monthlyROIStats.totalReturn || 0) +
        (platinumIncomeStats.totalIncome || 0) +
        (rewardIncomeStats.totalIncome || 0);

    const todayTotalIncome = (directIncomeStats.todayIncome || 0) +
        (levelIncomeStats.todayIncome || 0) +
        (monthlyROIStats.todayCredit || 0) +
        (platinumIncomeStats.todayIncome || 0) +
        (rewardIncomeStats.todayIncome || 0);

    // Income breakdown data
    const incomeBreakdown = [
        {
            name: 'Direct Income',
            amount: directIncomeStats.totalIncome || 0,
            percentage: ((directIncomeStats.totalIncome || 0) / totalIncome * 100).toFixed(1),
            color: 'blue',
            icon: FiDollarSign,
            count: directIncomeHistory.length
        },
        {
            name: 'Level Income',
            amount: levelIncomeStats.totalIncome || 0,
            percentage: ((levelIncomeStats.totalIncome || 0) / totalIncome * 100).toFixed(1),
            color: 'green',
            icon: FiLayers,
            count: levelIncomeHistory.length
        },
        {
            name: 'Monthly ROI',
            amount: monthlyROIStats.totalReturn || 0,
            percentage: ((monthlyROIStats.totalReturn || 0) / totalIncome * 100).toFixed(1),
            color: 'orange',
            icon: FiTrendingUp,
            count: monthlyROIHistory.length
        },
        {
            name: 'Platinum Income',
            amount: platinumIncomeStats.totalIncome || 0,
            percentage: ((platinumIncomeStats.totalIncome || 0) / totalIncome * 100).toFixed(1),
            color: 'purple',
            icon: FaCrown,
            count: 2 // Mock count
        },
        {
            name: 'Reward Income',
            amount: rewardIncomeStats.totalIncome || 0,
            percentage: ((rewardIncomeStats.totalIncome || 0) / totalIncome * 100).toFixed(1),
            color: 'teal',
            icon: FiGift,
            count: 3 // Mock count
        }
    ];

    // Combine all income history for timeline
    const allIncomeHistory = [
        ...directIncomeHistory.map(item => ({ ...item, type: 'Direct Income', color: 'blue' })),
        ...levelIncomeHistory.map(item => ({ ...item, type: 'Level Income', color: 'green' })),
        ...monthlyROIHistory.map(item => ({ ...item, type: 'Monthly ROI', color: 'orange', amount: item.today_credit || 0 })),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const filteredHistory = allIncomeHistory.filter(item => {
        if (selectedPeriod === 'all') return true;
        const itemDate = new Date(item.created_at);
        const now = new Date();

        switch (selectedPeriod) {
            case 'today':
                return itemDate.toDateString() === now.toDateString();
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return itemDate >= weekAgo;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return itemDate >= monthAgo;
            default:
                return true;
        }
    });

    if (isLoading && !directIncomeHistory.length && !levelIncomeHistory.length && !monthlyROIHistory.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading total income data...</Text>
                        </VStack>
                    </Center>
                </Container>
            </Box>
        );
    }

    return (
        <Box minH="100vh" bg={bgColor} py={8}>
            <Container maxW="container.xl">
                {/* Header */}
                <Flex justify="space-between" align="center" mb={8}>
                    <HStack spacing={4}>
                        <IconButton
                            icon={<FiArrowLeft />}
                            onClick={() => navigate('/user/wallet')}
                            variant="outline"
                            colorScheme="blue"
                            aria-label="Go back"
                        />
                        <VStack align="start" spacing={1}>
                            <Heading size="lg" color={textColor}>
                                Total Income Overview
                            </Heading>
                            <Text color={mutedColor}>
                                Comprehensive view of all your income sources
                            </Text>
                        </VStack>
                    </HStack>
                    <HStack spacing={3}>
                        <Select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            size="sm"
                            w="auto"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </Select>
                        <IconButton
                            icon={<FiRefreshCw />}
                            onClick={handleRefresh}
                            isLoading={refreshing}
                            variant="outline"
                            colorScheme="blue"
                            aria-label="Refresh data"
                        />
                    </HStack>
                </Flex>

                {/* Summary Stats */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="lg">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Income</StatLabel>
                                <StatNumber color={textColor} fontSize="3xl">
                                    {formatCurrency(totalIncome)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    All time earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="lg">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Today's Income</StatLabel>
                                <StatNumber color="green.500" fontSize="3xl">
                                    {formatCurrency(todayTotalIncome)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Today's earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="lg">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Income Sources</StatLabel>
                                <StatNumber color="blue.500" fontSize="3xl">
                                    {incomeBreakdown.filter(item => item.amount > 0).length}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Active sources
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                <Tabs index={activeTab} onChange={(index) => setActiveTab(index)} variant="enclosed">
                    <TabList>
                        <Tab>Income Breakdown</Tab>
                        <Tab>Transaction History</Tab>
                    </TabList>

                    <TabPanels>
                        {/* Income Breakdown Tab */}
                        <TabPanel px={0}>
                            <Card bg={cardBg} borderColor={borderColor} shadow="md">
                                <CardHeader>
                                    <Heading size="md" color={textColor}>
                                        Income Breakdown by Source
                                    </Heading>
                                </CardHeader>
                                <CardBody>
                                    <VStack spacing={6} align="stretch">
                                        {incomeBreakdown.map((item, index) => (
                                            <Box key={index}>
                                                <HStack justify="space-between" mb={2}>
                                                    <HStack spacing={3}>
                                                        <Box
                                                            p={2}
                                                            borderRadius="md"
                                                            bg={`${item.color}.100`}
                                                            color={`${item.color}.600`}
                                                        >
                                                            <Icon as={item.icon} boxSize={4} />
                                                        </Box>
                                                        <VStack align="start" spacing={0}>
                                                            <Text fontWeight="medium" color={textColor}>
                                                                {item.name}
                                                            </Text>
                                                            <Text fontSize="sm" color={mutedColor}>
                                                                {item.count} transactions
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                    <VStack align="end" spacing={0}>
                                                        <Text fontWeight="bold" color={textColor}>
                                                            {formatCurrency(item.amount)}
                                                        </Text>
                                                        <Text fontSize="sm" color={mutedColor}>
                                                            {item.percentage}%
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                                <Progress
                                                    value={parseFloat(item.percentage)}
                                                    colorScheme={item.color}
                                                    size="sm"
                                                    borderRadius="full"
                                                />
                                            </Box>
                                        ))}
                                    </VStack>
                                </CardBody>
                            </Card>
                        </TabPanel>

                        {/* Transaction History Tab */}
                        <TabPanel px={0}>
                            <Card bg={cardBg} borderColor={borderColor} shadow="md">
                                <CardHeader>
                                    <HStack justify="space-between">
                                        <Heading size="md" color={textColor}>
                                            All Income History
                                        </Heading>
                                        <Badge colorScheme="blue" variant="subtle">
                                            {filteredHistory.length} Records
                                        </Badge>
                                    </HStack>
                                </CardHeader>
                                <CardBody>
                                    {error && (
                                        <Alert status="error" mb={4}>
                                            <AlertIcon />
                                            <AlertTitle>Error!</AlertTitle>
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {filteredHistory.length === 0 ? (
                                        <Center py={8}>
                                            <VStack spacing={4}>
                                                <Icon as={FiBarChart} boxSize={12} color={mutedColor} />
                                                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                                    No Income Records
                                                </Text>
                                                <Text color={mutedColor} textAlign="center">
                                                    You haven't received any income yet.
                                                </Text>
                                            </VStack>
                                        </Center>
                                    ) : (
                                        <TableContainer>
                                            <Table variant="simple" size="sm">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Type</Th>
                                                        <Th>Amount</Th>
                                                        <Th>From</Th>
                                                        <Th>DateTime</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {filteredHistory.map((item, index) => (
                                                        <Tr key={index}>
                                                            <Td>
                                                                <Badge
                                                                    colorScheme={item.color}
                                                                    variant="subtle"
                                                                >
                                                                    {item.type}
                                                                </Badge>
                                                            </Td>
                                                            <Td>
                                                                <Text fontWeight="semibold" color="green.500">
                                                                    {formatCurrency(item.amount)}
                                                                </Text>
                                                            </Td>
                                                            <Td>
                                                                <Text fontSize="sm" color={textColor}>
                                                                    {item.user_name || item.from_user || 'System'}
                                                                </Text>
                                                            </Td>
                                                            <Td>
                                                                <HStack spacing={2}>
                                                                    <Icon as={FiCalendar} color={mutedColor} boxSize={4} />
                                                                    <Text fontSize="sm" color={textColor}>
                                                                        {formatDate(item.created_at)}
                                                                    </Text>
                                                                </HStack>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </CardBody>
                            </Card>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default TotalIncome;