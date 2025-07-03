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
} from '@chakra-ui/react';
import {
    FiTrendingUp,
    FiRefreshCw,
    FiCalendar,
    FiArrowLeft,
    FiActivity,
    FiDollarSign,
    FiClock,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useIncome } from '../../../Context/IncomeContext';
import { MdBarChart } from 'react-icons/md';

const MonthlyROI = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    const {
        monthlyROIHistory,
        monthlyROIStats,
        isLoading,
        error,
        getMonthlyROIHistory,
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
        getMonthlyROIHistory();
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
        await getMonthlyROIHistory();
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

    const calculateROIPercentage = (returnAmount, lockedAmount) => {
        if (!lockedAmount || lockedAmount === 0) return 0;
        return ((returnAmount / lockedAmount) * 100).toFixed(2);
    };
    console.log(" monthlyROIHistory", monthlyROIHistory);

    // const filteredHistory = monthlyROIHistory?.data?.filter(item => {
    //     if (selectedPeriod === 'all') return true;
    //     const itemDate = new Date(item.created_at || item.last_update);
    //     const now = new Date();

    //     switch (selectedPeriod) {
    //         case 'today':
    //             return itemDate.toDateString() === now.toDateString();
    //         case 'week':
    //             const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    //             return itemDate >= weekAgo;
    //         case 'month':
    //             const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    //             return itemDate >= monthAgo;
    //         default:
    //             return true;
    //     }
    // });

    if (isLoading && !monthlyROIHistory.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading monthly ROI data...</Text>
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
                                Monthly ROI (Mining Details)
                            </Heading>
                            <Text color={mutedColor}>
                                Track your monthly return on investment and mining rewards
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
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Mining Amount</StatLabel>
                                <StatNumber color={textColor} fontSize="2xl">
                                    {formatCurrency(monthlyROIHistory?.data?.mining_amount)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Total invested
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Credit</StatLabel>
                                <StatNumber color="green.500" fontSize="2xl">
                                    {formatCurrency(monthlyROIHistory?.data?.total_credit)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Total earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Today Credit</StatLabel>
                                <StatNumber color="blue.500" fontSize="2xl">
                                    {formatCurrency(monthlyROIHistory?.data?.today_credit)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Today's credit
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    {/* <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Credit</StatLabel>
                                <StatNumber color="purple.500" fontSize="2xl">
                                    {formatCurrency(monthlyROIHistory?.data?.last_update    )}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    All time credit
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card> */}
                </SimpleGrid>

                {/* ROI History Table */}
                <Card bg={cardBg} borderColor={borderColor} shadow="md">
                    <CardHeader>
                        <HStack justify="space-between">
                            <Heading size="md" color={textColor}>
                                Monthly ROI History
                            </Heading>
                            <Badge colorScheme="blue" variant="subtle">
                                {monthlyROIHistory?.data?.length} Records
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

                        {monthlyROIHistory?.data?.length === 0 ? (
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Icon as={MdBarChart} boxSize={12} color={mutedColor} />
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No ROI Records
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't started any mining activities yet. Invest in packages to start earning!
                                    </Text>
                                </VStack>
                            </Center>
                        ) : (
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Amount</Th>
                                            <Th>Locked Amount</Th>
                                            <Th>Return %</Th>
                                            <Th>Return Amount</Th>
                                            <Th>Today Credit</Th>
                                            <Th>Total Credit</Th>
                                            <Th>Last Update</Th>
                                            <Th>DateTime</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>


                                        <Tr>
                                            <Td>
                                                <Text fontWeight="semibold" color={textColor}>
                                                    {formatCurrency(monthlyROIHistory?.data?.return_amount)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text fontWeight="semibold" color="orange.500">
                                                    {formatCurrency(monthlyROIHistory?.data?.mining_amount)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <HStack spacing={2}>
                                                    <Badge
                                                        colorScheme="green"
                                                        variant="subtle"
                                                        fontSize="sm"
                                                    >
                                                        {monthlyROIHistory?.data?.return_percentage || calculateROIPercentage(monthlyROIHistory?.data?.return_percentage)}%
                                                    </Badge>
                                                    <Progress
                                                        value={monthlyROIHistory?.data?.return_percentage || calculateROIPercentage(monthlyROIHistory?.data?.return_percentage)}
                                                        size="sm"
                                                        colorScheme="green"
                                                        w="60px"
                                                    />
                                                </HStack>
                                            </Td>
                                            <Td>
                                                <Text fontWeight="semibold" color="green.500">
                                                    {formatCurrency(monthlyROIHistory?.data?.return_amount)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text fontWeight="semibold" color="blue.500">
                                                    {formatCurrency(monthlyROIHistory?.data?.today_credit)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text fontWeight="semibold" color="purple.500">
                                                    {formatCurrency(monthlyROIHistory?.data?.total_credit)}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <HStack spacing={2}>
                                                    <Icon as={FiClock} color={mutedColor} size={'sm'} />
                                                    <Box fontSize="sm" color={textColor}>
                                                        {formatDate(monthlyROIHistory?.data?.last_update) || ''}
                                                    </Box>
                                                </HStack>
                                            </Td>
                                            <Td>
                                                <HStack spacing={2}>
                                                    <Icon as={FiCalendar} color={mutedColor} size="sm" />
                                                    <Box fontSize="sm" color={textColor}>
                                                        {formatDate(monthlyROIHistory?.data?.created_at)}
                                                    </Box>
                                                </HStack>
                                            </Td>
                                        </Tr>

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

export default MonthlyROI;