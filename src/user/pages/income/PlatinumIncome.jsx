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
    FiAward,
    FiTrendingUp,
    FiRefreshCw,
    FiCalendar,
    FiUser,
    FiArrowLeft,
    FiStar,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';

const PlatinumIncome = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock data for platinum income (replace with actual API calls)
    const [platinumIncomeHistory, setPlatinumIncomeHistory] = useState([
        {
            id: 1,
            user_name: 'John Doe',
            user_id: 'USR001',
            amount: 500.00,
            tier: 'Platinum',
            achievement: 'Team Volume Milestone',
            bonus_type: 'Achievement Bonus',
            created_at: '2024-01-15T10:30:00Z'
        },
        {
            id: 2,
            user_name: 'Jane Smith',
            user_id: 'USR002',
            amount: 750.00,
            tier: 'Diamond',
            achievement: 'Leadership Bonus',
            bonus_type: 'Leadership Reward',
            created_at: '2024-01-14T14:45:00Z'
        }
    ]);

    const [platinumIncomeStats, setPlatinumIncomeStats] = useState({
        totalIncome: 1250.00,
        todayIncome: 0.00,
        thisMonthIncome: 1250.00,
        totalAchievements: 2
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

    const getTierColor = (tier) => {
        switch (tier) {
            case 'Platinum':
                return 'purple';
            case 'Diamond':
                return 'blue';
            case 'Gold':
                return 'yellow';
            case 'Silver':
                return 'gray';
            default:
                return 'purple';
        }
    };

    const filteredHistory = platinumIncomeHistory.filter(item => {
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

    if (isLoading && !platinumIncomeHistory.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading platinum income data...</Text>
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
                                Platinum Income
                            </Heading>
                            <Text color={mutedColor}>
                                Track your premium tier rewards and achievement bonuses
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
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Income</StatLabel>
                                <StatNumber color={textColor} fontSize="2xl">
                                    {formatCurrency(platinumIncomeStats.totalIncome)}
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
                                    {formatCurrency(platinumIncomeStats.todayIncome)}
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
                                    {formatCurrency(platinumIncomeStats.thisMonthIncome)}
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
                                <StatLabel color={mutedColor}>Achievements</StatLabel>
                                <StatNumber color="purple.500" fontSize="2xl">
                                    {platinumIncomeStats.totalAchievements}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Total rewards
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
                                Platinum Income History
                            </Heading>
                            <Badge colorScheme="purple" variant="subtle">
                                {filteredHistory.length} Records
                            </Badge>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        {filteredHistory.length === 0 ? (
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Icon as={FaCrown} boxSize={12} color={mutedColor} />
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No Platinum Income Records
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't achieved any platinum tier rewards yet. Keep building your network!
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
                                            <Th>Tier</Th>
                                            <Th>Achievement</Th>
                                            <Th>Bonus Type</Th>
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
                                                        colorScheme={getTierColor(item.tier)}
                                                        variant="solid"
                                                        leftIcon={<FiStar />}
                                                    >
                                                        {item.tier}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="medium" color={textColor} fontSize="sm">
                                                            {item.achievement}
                                                        </Text>
                                                        <Text fontSize="xs" color={mutedColor}>
                                                            Achievement unlocked
                                                        </Text>
                                                    </VStack>
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        colorScheme="blue"
                                                        variant="subtle"
                                                        leftIcon={<FiAward />}
                                                    >
                                                        {item.bonus_type}
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

export default PlatinumIncome;