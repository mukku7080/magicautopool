import React, { useState, useEffect } from 'react';
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
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Avatar,
    Flex,
    IconButton,
    useColorModeValue,
    useToast,
    Button,
    Icon,
    Divider,
    Progress,
    Tooltip,
    useBreakpointValue,
    Spinner,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import {
    FiUsers,
    FiUserPlus,
    FiTrendingUp,
    FiTrendingDown,
    FiRefreshCw,
    FiEye,
    FiCalendar,
    FiAward,
    FiTarget,
    FiActivity,
    FiClock,
    FiDollarSign,
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiLink,
    FiShare2,
} from 'react-icons/fi';
import { useOther } from '../Context';

const MyTeam = () => {
    const {
        teamStats,
        teamMembers,
        directReferrals,
        teamHistory,
        isLoading,
        error,
        // getTeamStats,
        // getTeamMembers,
        getDirectReferrals,
        // getTeamHistory,
        clearError,
    } = useOther();

    const toast = useToast();
    const [activeTab, setActiveTab] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    // Responsive values
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 4 });
    const spacing = useBreakpointValue({ base: 4, md: 6 });
    const cardPadding = useBreakpointValue({ base: 4, md: 6 });

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const mutedColor = useColorModeValue('gray.500', 'gray.400');
    const brandColor = useColorModeValue('#4c7d4e', '#4c7d4e');
    const successColor = useColorModeValue('green.500', 'green.300');
    const warningColor = useColorModeValue('orange.500', 'orange.300');

    // Load team data on mount
    useEffect(() => {
        loadTeamData();
    }, []);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            clearError();
        }
    }, [error, toast, clearError]);

    // Load all team data
    const loadTeamData = async () => {
        try {
            await Promise.all([
                // getTeamStats(),
                // getTeamMembers(),
                getDirectReferrals(),
                // getTeamHistory(),
            ]);
        } catch (error) {
            console.error('Error loading team data:', error);
        }
    };
console.log(directReferrals);
    // Refresh data
    const handleRefresh = async () => {
        setRefreshing(true);
        await loadTeamData();
        setRefreshing(false);
        toast({
            title: 'Data Refreshed',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    // Format date
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'green';
            case 'inactive':
                return 'red';
            case 'pending':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    // Mock data for demo (you can remove this when API is ready)
    const mockTeamStats = {
        totalTeam: directReferrals?.my_referral?.length,
        directReferrals: directReferrals?.my_referral?.length,
        activeReferrals: 18,
        totalEarnings: 5420.50,
        monthlyGrowth: 12.5,
        weeklyJoined: 8,
    };

    const mockDirectReferrals = [
        { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', status: 'active', earnings: 250.00 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-01-14', status: 'active', earnings: 180.00 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-01-13', status: 'inactive', earnings: 95.00 },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-01-12', status: 'pending', earnings: 0.00 },
    ];

    const mockTeamHistory = [
        { id: 1, name: 'Alex Turner', action: 'Joined Team', date: '2024-01-15 10:30 AM', level: 'Direct' },
        { id: 2, name: 'Emily Davis', action: 'Made First Purchase', date: '2024-01-14 03:45 PM', level: 'Level 2' },
        { id: 3, name: 'David Brown', action: 'Earned Commission', date: '2024-01-14 11:20 AM', level: 'Direct' },
        { id: 4, name: 'Lisa Johnson', action: 'Upgraded Package', date: '2024-01-13 09:15 AM', level: 'Level 3' },
    ];

    const displayStats = teamStats || mockTeamStats;
    const displayReferrals = directReferrals?.my_referral?.length > 0 ? directReferrals?.my_referral : mockDirectReferrals;
    const displayHistory = teamHistory.length > 0 ? teamHistory : mockTeamHistory;
    const activeReferrals = directReferrals?.my_referral?.flat()?.filter(item => item.user_status === "active");
    console.log("activeReferrals",activeReferrals);

    if (isLoading && !teamStats && !teamMembers.length) {
        return (
            <Box minH="100vh" bg={bgColor} py={8}>
                <Container maxW="container.xl">
                    <Center minH="400px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading team data...</Text>
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
                    <VStack align="start" spacing={1}>
                        <Heading size="lg" color={textColor}>
                            My Team
                        </Heading>
                        <Text color={mutedColor}>
                            Manage and track your referral network
                        </Text>
                    </VStack>
                    <HStack spacing={3}>
                        <IconButton
                            icon={<FiRefreshCw />}
                            onClick={handleRefresh}
                            isLoading={refreshing}
                            variant="outline"
                            colorScheme="blue"
                            aria-label="Refresh data"
                        />
                        <Button
                            leftIcon={<FiShare2 />}
                            bg={brandColor}
                            color="white"
                            _hover={{ bg: 'blue.600' }}
                            size="md"
                        >
                            Share Referral Link
                        </Button>
                    </HStack>
                </Flex>

                {/* Stats Cards */}
                <SimpleGrid columns={columns} spacing={spacing} mb={8}>
                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody p={cardPadding}>
                            <Stat>
                                <HStack justify="space-between">
                                    <VStack align="start" spacing={1}>
                                        <StatLabel color={mutedColor} fontSize="sm">
                                            Total Team
                                        </StatLabel>
                                        <StatNumber color={textColor} fontSize="2xl">
                                            {displayStats.totalTeam}
                                        </StatNumber>
                                        <StatHelpText color={successColor} fontSize="sm" mb={0}>
                                            <StatArrow type="increase" />
                                            {displayStats.monthlyGrowth}% this month
                                        </StatHelpText>
                                    </VStack>
                                    <Box
                                        p={3}
                                        bg={useColorModeValue('blue.50', 'blue.900')}
                                        borderRadius="lg"
                                    >
                                        <Icon as={FiUsers} boxSize={6} color={brandColor} />
                                    </Box>
                                </HStack>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody p={cardPadding}>
                            <Stat>
                                <HStack justify="space-between">
                                    <VStack align="start" spacing={1}>
                                        <StatLabel color={mutedColor} fontSize="sm">
                                            Direct Referrals
                                        </StatLabel>
                                        <StatNumber color={textColor} fontSize="2xl">
                                            {displayStats.directReferrals}
                                        </StatNumber>
                                        <StatHelpText color={mutedColor} fontSize="sm" mb={0}>
                                            +{displayStats.weeklyJoined} this week
                                        </StatHelpText>
                                    </VStack>
                                    <Box
                                        p={3}
                                        bg={useColorModeValue('green.50', 'green.900')}
                                        borderRadius="lg"
                                    >
                                        <Icon as={FiUserPlus} boxSize={6} color={successColor} />
                                    </Box>
                                </HStack>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody p={cardPadding}>
                            <Stat>
                                <HStack justify="space-between">
                                    <VStack align="start" spacing={1}>
                                        <StatLabel color={mutedColor} fontSize="sm">
                                            Active Referrals
                                        </StatLabel>
                                        <StatNumber color={textColor} fontSize="2xl">
                                            {displayStats.activeReferrals}
                                        </StatNumber>
                                        <StatHelpText color={successColor} fontSize="sm" mb={0}>
                                            {Math.round((displayStats.activeReferrals / displayStats.directReferrals) * 100)}% active rate
                                        </StatHelpText>
                                    </VStack>
                                    <Box
                                        p={3}
                                        bg={useColorModeValue('orange.50', 'orange.900')}
                                        borderRadius="lg"
                                    >
                                        <Icon as={FiActivity} boxSize={6} color={warningColor} />
                                    </Box>
                                </HStack>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBg} borderColor={borderColor} shadow="md">
                        <CardBody p={cardPadding}>
                            <Stat>
                                <HStack justify="space-between">
                                    <VStack align="start" spacing={1}>
                                        <StatLabel color={mutedColor} fontSize="sm">
                                            Total Earnings
                                        </StatLabel>
                                        <StatNumber color={textColor} fontSize="2xl">
                                            ${displayStats.totalEarnings?.toFixed(2)}
                                        </StatNumber>
                                        <StatHelpText color={successColor} fontSize="sm" mb={0}>
                                            <StatArrow type="increase" />
                                            From referrals
                                        </StatHelpText>
                                    </VStack>
                                    <Box
                                        p={3}
                                        bg={useColorModeValue('purple.50', 'purple.900')}
                                        borderRadius="lg"
                                    >
                                        <Icon as={FiDollarSign} boxSize={6} color="purple.500" />
                                    </Box>
                                </HStack>
                            </Stat>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Tabs for Different Views */}
                <Card bg={cardBg} borderColor={borderColor} shadow="md">
                    <CardHeader>
                        <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed">
                            <TabList>
                                <Tab>
                                    <HStack>
                                        <FiUsers />
                                        <Text>Direct Referrals</Text>
                                    </HStack>
                                </Tab>
                                <Tab>
                                    <HStack>
                                        <FiTrendingUp />
                                        <Text>Active Members</Text>
                                    </HStack>
                                </Tab>
                                <Tab>
                                    <HStack>
                                        <FiClock />
                                        <Text>Level view</Text>
                                    </HStack>
                                </Tab>
                            </TabList>
                        </Tabs>
                    </CardHeader>
                    <CardBody>
                        <Tabs index={activeTab} onChange={setActiveTab}>
                            <TabPanels>
                                {/* Direct Referrals Tab */}
                                <TabPanel p={0}>
                                    {displayReferrals.length === 0 ? (
                                        <Center py={8}>
                                            <VStack spacing={4}>
                                                <Icon as={FiUserPlus} boxSize={12} color={mutedColor} />
                                                <VStack spacing={2}>
                                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                                        No Direct Referrals Yet
                                                    </Text>
                                                    <Text color={mutedColor} textAlign="center">
                                                        Start sharing your referral link to build your team
                                                    </Text>
                                                </VStack>
                                            </VStack>
                                        </Center>
                                    ) : (
                                        <TableContainer>
                                            <Table variant="simple">
                                                <Thead>
                                                    <Tr>
                                                        <Th>Member</Th>
                                                        <Th>Join Date</Th>
                                                        <Th>Status</Th>
                                                        <Th>Earnings</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {directReferrals?.my_referral?.map((member) => (
                                                        <Tr key={member.id}>
                                                            <Td>
                                                                <HStack spacing={3}>
                                                                    <Avatar
                                                                        size="sm"
                                                                        name={member.name}
                                                                        bg={brandColor}
                                                                    />
                                                                    <VStack align="start" spacing={0}>
                                                                        <Text fontWeight="medium" color={textColor}>
                                                                            {member.name}
                                                                        </Text>
                                                                        <Text fontSize="sm" color={mutedColor}>
                                                                            {member.email}
                                                                        </Text>
                                                                    </VStack>
                                                                </HStack>
                                                            </Td>
                                                            <Td>
                                                                <Text color={textColor}>
                                                                    {formatDate(member.created_at)}
                                                                </Text>
                                                            </Td>
                                                            <Td>
                                                                <Badge
                                                                    colorScheme={getStatusColor(member.user_status)}
                                                                    textTransform="capitalize"
                                                                >
                                                                    {member.user_status}
                                                                </Badge>
                                                            </Td>
                                                            <Td>
                                                                <Text fontWeight="medium" color={textColor}>
                                                                    ${member.direct_income?.toFixed(2)}
                                                                </Text>
                                                            </Td>
                                                            <Td>
                                                                <IconButton
                                                                    icon={<FiEye />}
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    colorScheme="blue"
                                                                    aria-label="View details"
                                                                />
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    )}
                                </TabPanel>

                                {/* Active Members Tab */}
                                <TabPanel p={0}>
                                    <VStack spacing={4} align="stretch">
                                        {directReferrals.my_referral?.filter(member => member.user_status === 'active').length === 0 ? (
                                            <Center py={8}>
                                                <VStack spacing={4}>
                                                    <Icon as={FiActivity} boxSize={12} color={mutedColor} />
                                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                                        No Active Members
                                                    </Text>
                                                    <Text color={mutedColor} textAlign="center">
                                                        Encourage your referrals to become active members
                                                    </Text>
                                                </VStack>
                                            </Center>
                                        ) : (
                                                                                            
                                               activeReferrals?.map((member) => (
                                                    <Card key={member.id} variant="outline">
                                                        <CardBody>
                                                            <HStack justify="space-between">
                                                                <HStack spacing={4}>
                                                                    <Avatar
                                                                        name={member.name}
                                                                        bg={brandColor}
                                                                    />
                                                                    <VStack align="start" spacing={1}>
                                                                        <Text fontWeight="semibold" color={textColor}>
                                                                            {member.name}
                                                                        </Text>
                                                                        <Text fontSize="sm" color={mutedColor}>
                                                                            Joined {formatDate(member.created_at)}
                                                                        </Text>
                                                                    </VStack>
                                                                </HStack>
                                                                <VStack align="end" spacing={1}>
                                                                    <Text fontWeight="semibold" color={successColor}>
                                                                        ${member.direct_income?.toFixed(2)}
                                                                    </Text>
                                                                    <Badge colorScheme="green" size="sm">
                                                                        {member.user_status}
                                                                    </Badge>
                                                                </VStack>
                                                            </HStack>
                                                        </CardBody>
                                                    </Card>
                                                ))
                                        )}
                                    </VStack>
                                </TabPanel>

                                {/* LevelView Tab */}
                                <TabPanel p={0}>
                                    {directReferrals?.my_referral?.length === 0 ? (
                                        <Center py={8}>
                                            <VStack spacing={4}>
                                                <Icon as={FiClock} boxSize={12} color={mutedColor} />
                                                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                                    No Level view yet
                                                </Text>
                                                <Text color={mutedColor} textAlign="center">
                                                    Team activities will appear here
                                                </Text>
                                            </VStack>
                                        </Center>
                                    ) : (
                                        <VStack spacing={3} align="stretch">
                                            {directReferrals?.my_referral?.map((activity) => (
                                                <Card key={activity.id} variant="outline">
                                                    <CardBody>
                                                        <HStack justify="space-between">
                                                            <HStack spacing={4}>
                                                                <Avatar
                                                                    size="sm"
                                                                    name={activity.name}
                                                                    bg={brandColor}
                                                                />
                                                                <VStack align="start" spacing={0}>
                                                                    <Box fontWeight="medium" color={textColor}>
                                                                        {activity.name}
                                                                    </Box>
                                                                    <Box fontSize="sm" color={mutedColor}>
                                                                        {activity.mining_status}
                                                                    </Box>
                                                                </VStack>
                                                            </HStack>
                                                            <VStack align="end" spacing={1}>
                                                                <Badge colorScheme="blue" size="sm">
                                                                    {activity.active_level}
                                                                </Badge>
                                                                <Text fontSize="xs" color={mutedColor}>
                                                                    {activity.last_login}
                                                                </Text>
                                                            </VStack>
                                                        </HStack>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </VStack>
                                    )}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </CardBody>
                </Card>
            </Container>
        </Box>
    );
};

export default MyTeam;