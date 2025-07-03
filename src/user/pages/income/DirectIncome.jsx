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
    FiDollarSign,
    FiTrendingUp,
    FiRefreshCw,
    FiCalendar,
    FiUser,
    FiAward,
    FiArrowLeft,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useIncome } from '../../../Context/IncomeContext';

const DirectIncome = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    const {
        directIncomeHistory,
        directIncomeStats,
        isLoading,
        error,
        getDirectIncomeHistory,
        clearError,
    } = useIncome();

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.400');
    const brandColor = useColorModeValue('blue.500', 'blue.200');

    useEffect(() => {
        getDirectIncomeHistory();
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
        await getDirectIncomeHistory();
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

    const filteredHistory = directIncomeHistory.filter(item => {
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

    if (isLoading && !directIncomeHistory.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading direct income data...</Text>
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
                                Direct Income (Referral Income)
                            </Heading>
                            <Text color={mutedColor}>
                                Track your referral earnings and bonuses
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
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Income</StatLabel>
                                <StatNumber color={textColor} fontSize="2xl">
                                    {formatCurrency(directIncomeStats.totalIncome)}
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
                                    {formatCurrency(directIncomeStats.todayIncome)}
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
                                    {formatCurrency(directIncomeStats.thisMonthIncome)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Monthly earnings
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
                                Direct Income History
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

                        {directIncomeHistory.length === 0 ? (
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Icon as={FiDollarSign} boxSize={12} color={mutedColor} />
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No Income Records
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't received any direct income yet. Start referring people to earn!
                                    </Text>
                                </VStack>
                            </Center>
                        ) : (
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Amount</Th>
                                            <Th>Bonus Percentage</Th>
                                            <Th>Reward Amount</Th>
                                            <Th>DateTime</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredHistory.map((item, index) => (
                                            <Tr key={index} >
                                                <Td p={5}>
                                                    <HStack spacing={3}>
                                                        <Icon as={FiUser} color={brandColor} />
                                                        <VStack align="start" spacing={0}>
                                                            <Box fontWeight="medium" color={textColor}>
                                                                {item.user_name || item.name || 'Unknown User'}
                                                            </Box>
                                                            <Box fontSize="xs" color={mutedColor}>
                                                                ID: {item.user_id || item.id || 'N/A'}
                                                            </Box>
                                                        </VStack>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <Text fontWeight="semibold" color="green.500">
                                                        {formatCurrency(item.deposit_amount)}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Badge colorScheme="purple" variant="subtle">
                                                        {`${item.bonus || item.bonus || '0'}%`}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <Text fontWeight="semibold" color="blue.500">
                                                        {formatCurrency(item.reward_amount || item.amount)}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={2}>
                                                        <Icon as={FiCalendar} color={mutedColor} boxSize={4} />
                                                        <Text fontSize="sm" color={textColor}>
                                                            {formatDate(item.created_at || item.datetime)}
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

export default DirectIncome;