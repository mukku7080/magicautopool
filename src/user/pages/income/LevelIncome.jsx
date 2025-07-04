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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar,
} from '@chakra-ui/react';
import {
    FiLayers,
    FiTrendingUp,
    FiRefreshCw,
    FiCalendar,
    FiUser,
    FiEye,
    FiArrowLeft,
    FiUsers,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useIncome } from '../../../Context/IncomeContext';
import { useOther } from '../../../Context';

const LevelIncome = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [refreshing, setRefreshing] = useState(false);
    const [selectedLevelUsers, setSelectedLevelUsers] = useState([]);
    const [selectedLevelNumber, setSelectedLevelNumber] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        levelIncomeHistory,
        levelIncomeStats,
        isLoading,
        error,
        getLevelIncomeHistory,
        clearError,
    } = useIncome();

    const { MyTeamLevelViewData } = useOther();

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.400');
    const brandColor = useColorModeValue('blue.500', 'blue.200');

    useEffect(() => {
        getLevelIncomeHistory();
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
        await getLevelIncomeHistory();
        setRefreshing(false);
        toast({
            title: 'Success',
            description: 'Data refreshed successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };
    console.log("levelIncomeHistory", levelIncomeHistory);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    // Function to handle view button click (similar to MyTeam.jsx)
    const handleViewLevel = async (levelNumber) => {
        const dto = {
            level: levelNumber
        };
        const data = await MyTeamLevelViewData(dto);
        console.log(data);

        const users = data?.downline || [];
        setSelectedLevelUsers(users);
        setSelectedLevelNumber(levelNumber);
        onOpen();
    };

    // Group level income by level
    // const groupedLevelIncome = levelIncomeHistory.reduce((acc, item) => {
    //     const level = item.level || 1;
    //     if (!acc[level]) {
    //         acc[level] = {
    //             level: level,
    //             totalAmount: 0,
    //             count: 0,
    //             members: []
    //         };
    //     }
    //     acc[level].totalAmount += item.amount || 0;
    //     acc[level].count += 1;
    //     acc[level].members.push(item);
    //     return acc;
    // }, {});

    // const levelData = Object.values(groupedLevelIncome).sort((a, b) => a.level - b.level);

    const filteredHistory = levelIncomeHistory?.data?.filter(item => {
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

    if (isLoading && !levelIncomeHistory.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading level income data...</Text>
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
                                Level Income (Autopool Income)
                            </Heading>
                            <Text color={mutedColor}>
                                Track your level-based earnings from your downline
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
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Today Income</StatLabel>
                                <StatNumber color="green.500" fontSize="2xl">
                                    {formatCurrency(levelIncomeHistory?.today_income)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Today's level earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody>
                            <Stat>
                                <StatLabel color={mutedColor}>Total Income</StatLabel>
                                <StatNumber color={textColor} fontSize="2xl">
                                    {formatCurrency(levelIncomeHistory?.total_income)}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    All time level earnings
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Level View Table (Similar to MyTeam.jsx) */}
                <Card bg={cardBg} borderColor={borderColor} shadow="md" mb={8}>
                    <CardHeader>
                        <HStack justify="space-between">
                            <Heading size="md" color={textColor}>
                                Level View
                            </Heading>
                            <Badge colorScheme="blue" variant="subtle">
                                {levelIncomeHistory?.data?.length}
                                Levels
                            </Badge>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        {levelIncomeHistory?.data?.length === 0 ? (
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Icon as={FiLayers} boxSize={12} color={mutedColor} />
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No Level Data
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't earned from any levels yet.
                                    </Text>
                                </VStack>
                            </Center>
                        ) : (
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Level</Th>
                                            <Th>Total Amount</Th>
                                            <Th>Members Count</Th>
                                            {/* <Th>Action</Th> */}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {levelIncomeHistory?.data?.map((level) => (
                                            <Tr key={level.level}>
                                                <Td>
                                                    <Badge
                                                        colorScheme="purple"
                                                        variant="subtle"
                                                        fontSize="sm"
                                                    >
                                                        Level {level.level}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <Text fontWeight="semibold" color="green.500">
                                                        {formatCurrency(level.total_credit)}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={2}>
                                                        <Icon as={FiUsers} color={brandColor} boxSize={4} />
                                                        <Text fontSize="sm" fontWeight="medium">
                                                            {level.count}
                                                        </Text>
                                                        <Box fontSize="sm" color={mutedColor}>
                                                            {level.members_count}
                                                        </Box>
                                                    </HStack>
                                                </Td>
                                                {/* <Td>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        colorScheme="blue"
                                                        leftIcon={<FiEye />}
                                                        onClick={() => handleViewLevel(level.level)}
                                                        _hover={{
                                                            bg: useColorModeValue('blue.50', 'blue.900'),
                                                            borderColor: 'blue.500'
                                                        }}
                                                        disabled
                                                    >
                                                        View Details
                                                    </Button>
                                                </Td> */}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        )}
                    </CardBody>
                </Card>

                {/* Income History Table */}
                {/* <Card bg={cardBg} borderColor={borderColor} shadow="md">
                    <CardHeader>
                        <HStack justify="space-between">
                            <Heading size="md" color={textColor}>
                                Level Income History
                            </Heading>
                            <Badge colorScheme="blue" variant="subtle">
                                {levelIncomeHistory?.data?.length} Records
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

                        {levelIncomeHistory?.data?.length === 0 ? (
                            <Center py={8}>
                                <VStack spacing={4}>
                                    <Icon as={FiLayers} boxSize={12} color={mutedColor} />
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No Level Income Records
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't received any level income yet.
                                    </Text>
                                </VStack>
                            </Center>
                        ) : (
                            <TableContainer>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Level</Th>
                                            <Th>From User</Th>
                                            <Th>Amount</Th>
                                            <Th>DateTime</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {levelIncomeHistory?.data?.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>
                                                    <Badge
                                                        colorScheme="purple"
                                                        variant="subtle"
                                                    >
                                                        Level {item.level || 1}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={3}>
                                                        <Icon as={FiUser} color={brandColor} />
                                                        <VStack align="start" spacing={0}>
                                                            <Text fontWeight="medium" color={textColor}>
                                                                {item.from_user || item.user_name || 'Unknown User'}
                                                            </Text>
                                                            <Text fontSize="xs" color={mutedColor}>
                                                                ID: {item.from_user_id || item.user_id || 'N/A'}
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
                </Card> */}

                {/* User List Modal (Similar to MyTeam.jsx) */}
                <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <HStack spacing={3}>
                                <Icon as={FiUsers} color={brandColor} />
                                <Box fontSize={'16px'} color={'gray.500'}>Level {selectedLevelNumber} Users</Box>
                            </HStack>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedLevelUsers.length === 0 ? (
                                <Center py={8}>
                                    <VStack spacing={4}>
                                        <Icon as={FiUsers} boxSize={12} color={mutedColor} />
                                        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                            No Users Found
                                        </Text>
                                        <Text color={mutedColor} textAlign="center">
                                            No users available for this level
                                        </Text>
                                    </VStack>
                                </Center>
                            ) : (
                                <TableContainer>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>ID</Th>
                                                <Th>Name</Th>
                                                <Th>Level</Th>
                                                <Th>Join Date</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {selectedLevelUsers.map((user) => (
                                                <Tr key={user.id}>
                                                    <Td>
                                                        <Badge
                                                            colorScheme="blue"
                                                            variant="subtle"
                                                        >
                                                            #{user?.data?.id}
                                                        </Badge>
                                                    </Td>
                                                    <Td>
                                                        <HStack spacing={3}>
                                                            <Avatar
                                                                size="sm"
                                                                name={user?.user_data?.name}
                                                                bg={brandColor}
                                                            />
                                                            <Box fontSize={'16px'}
                                                                fontWeight="medium"
                                                                color={textColor}
                                                            >
                                                                {user?.user_data?.name}
                                                            </Box>
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <Badge
                                                            colorScheme="purple"
                                                            variant="subtle"
                                                        >
                                                            Level {user?.data?.level}
                                                        </Badge>
                                                    </Td>
                                                    <Td>
                                                        <HStack spacing={2}>
                                                            <Icon as={FiCalendar} color={mutedColor} boxSize={4} />
                                                            <Box fontSize="md" color={textColor}>
                                                                {formatDate(user?.user_data?.created_at)}
                                                            </Box>
                                                        </HStack>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
};

export default LevelIncome;