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
} from '@chakra-ui/react';
import {
    FiGift,
    FiTrendingUp,
    FiRefreshCw,
    FiCalendar,
    FiUser,
    FiArrowLeft,
    FiAward,
    FiTarget,
    FiStar,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RewardIncome = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock data for reward income (replace with actual API calls)
    const [rewardIncomeHistory, setRewardIncomeHistory] = useState([
        {
            id: 1,
            user_name: 'John Doe',
            user_id: 'USR001',
            amount: 100.00,
            reward_type: 'Performance Bonus',
            category: 'Monthly Target',
            milestone: 'Reached 10 Direct Referrals',
            status: 'Completed',
            created_at: '2024-01-15T10:30:00Z'
        },
        {
            id: 2,
            user_name: 'Jane Smith',
            user_id: 'USR002',
            amount: 250.00,
            reward_type: 'Milestone Reward',
            category: 'Team Building',
            milestone: 'Built Team of 50 Members',
            status: 'Completed',
            created_at: '2024-01-14T14:45:00Z'
        },
        {
            id: 3,
            user_name: 'Mike Johnson',
            user_id: 'USR003',
            amount: 75.00,
            reward_type: 'Activity Bonus',
            category: 'Daily Login',
            milestone: '30 Days Consecutive Login',
            status: 'Completed',
            created_at: '2024-01-13T09:15:00Z'
        }
    ]);

    const [rewardIncomeStats, setRewardIncomeStats] = useState({
        totalIncome: 425.00,
        todayIncome: 0.00,
        thisMonthIncome: 425.00,
        totalRewards: 3,
        completedMilestones: 3
    });

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.400');
    const brandColor = useColorModeValue('blue.500', 'blue.200');

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
            toast({
                title: 'Success',
                description: 'Data refreshed successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }, 1500);
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

    const getRewardTypeColor = (type) => {
        switch (type) {
            case 'Performance Bonus':
                return 'green';
            case 'Milestone Reward':
                return 'blue';
            case 'Activity Bonus':
                return 'orange';
            case 'Special Reward':
                return 'purple';
            default:
                return 'gray';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Monthly Target':
                return FiTarget;
            case 'Team Building':
                return FiUser;
            case 'Daily Login':
                return FiCalendar;
            default:
                return FiGift;
        }
    };

    const filteredHistory = rewardIncomeHistory.filter(item => {
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

    if (isLoading && !rewardIncomeHistory.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading reward income data...</Text>
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
                                Reward Income
                            </Heading>
                            <Text color={mutedColor}>
                                Track your milestone rewards and performance bonuses
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

                {/* Stats Cards */}
                <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={6} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Income</StatLabel>
                                <StatNumber color={textColor} fontSize="2xl">
                                    {formatCurrency(rewardIncomeStats.totalIncome)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    All time earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Today's Income</StatLabel>
                                <StatNumber color="green.500" fontSize="2xl">
                                    {formatCurrency(rewardIncomeStats.todayIncome)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Today's earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>This Month</StatLabel>
                                <StatNumber color="blue.500" fontSize="2xl">
                                    {formatCurrency(rewardIncomeStats.thisMonthIncome)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Monthly earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Rewards</StatLabel>
                                <StatNumber color="purple.500" fontSize="2xl">
                                    {rewardIncomeStats.totalRewards}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Rewards earned
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Milestones</StatLabel>
                                <StatNumber color="orange.500" fontSize="2xl">
                                    {rewardIncomeStats.completedMilestones}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Completed
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* History Table */}
                <Card bg={cardBg} borderColor={borderColor} shadow="md">
                    <CardHeader>
                        <HStack justify="space-between">
                            <Heading size="md" color={textColor}>
                                Reward Income History
                            </Heading>
                            <Badge colorScheme="green" variant="subtle">
                                {filteredHistory.length} Records
                            </Badge>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        {filteredHistory.length === 0 ? (
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Icon as={FiGift} boxSize={12} color={mutedColor} />
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No Reward Income Records
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't earned any rewards yet. Complete milestones to unlock rewards!
                                    </Text>
                                </VStack>
                            </Center>
                        ) : (
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>User</Th>
                                            <Th>Amount</Th>
                                            <Th>Reward Type</Th>
                                            <Th>Category</Th>
                                            <Th>Milestone</Th>
                                            <Th>Status</Th>
                                            <Th>DateTime</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredHistory.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>
                                                    <HStack spacing={3}>
                                                        <Icon as={FiUser} color={brandColor} />
                                                        <VStack align="start" spacing={0}>
                                                            <Text fontWeight="medium" color={textColor}>
                                                                {item.user_name || 'Unknown User'}
                                                            </Text>
                                                            <Text fontSize="xs" color={mutedColor}>
                                                                ID: {item.user_id || 'N/A'}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <Text fontWeight="semibold" color="green.500">
                                                        {formatCurrency(item.amount)}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        colorScheme={getRewardTypeColor(item.reward_type)}
                                                        variant="subtle"
                                                        leftIcon={<FiAward />}
                                                    >
                                                        {item.reward_type}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={2}>
                                                        <Icon as={getCategoryIcon(item.category)} color={mutedColor} boxSize={4} />
                                                        <Text fontSize="sm" color={textColor}>
                                                            {item.category}
                                                        </Text>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="medium" color={textColor} fontSize="sm">
                                                            {item.milestone}
                                                        </Text>
                                                        <Text fontSize="xs" color={mutedColor}>
                                                            Achievement milestone
                                                        </Text>
                                                    </VStack>
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        colorScheme={item.status === 'Completed' ? 'green' : 'yellow'}
                                                        variant="subtle"
                                                        leftIcon={<FiStar />}
                                                    >
                                                        {item.status}
                                                    </Badge>
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
            </Container>
        </Box>
    );
};

export default RewardIncome;