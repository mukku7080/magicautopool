import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    useColorModeValue,
    VStack,
    HStack,
    Badge,
    Spinner,
    Alert,
    AlertIcon,
    AlertDescription,
    Container,
    Heading,
    useToast,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Divider
} from '@chakra-ui/react';
import { useUser } from '../../Context';
import BinaryTreeNew from './tree/BinaryTreeNew';
import OneToManyTreeNew from './tree/OneToManyTreeNew';

const Tree = () => {
    const [selectedTreeType, setSelectedTreeType] = useState('binary');
    const [isLoading, setIsLoading] = useState(false);
    const [treeData, setTreeData] = useState(null);
    const toast = useToast();
    const { profile } = useUser();

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');

    // Mock data for demonstration - replace with actual API calls
    const generateMockTreeData = (type) => {
        const currentUser = {
            id: profile?.USER?.id || 'user-1',
            name: profile?.USER?.name || 'John Doe',
            email: profile?.USER?.email || 'john@example.com',
            profilePic: profile?.USER?.profile_pic || null,
            level: 0,
            totalReferrals: 12,
            directReferrals: 4,
            totalEarnings: 2500,
            joinDate: '2024-01-15'
        };

        if (type === 'binary') {
            return {
                ...currentUser,
                leftChild: {
                    id: 'user-2',
                    name: 'Alice Johnson',
                    email: 'alice@example.com',
                    profilePic: null,
                    level: 1,
                    totalReferrals: 6,
                    directReferrals: 2,
                    totalEarnings: 1200,
                    joinDate: '2024-02-01',
                    leftChild: {
                        id: 'user-4',
                        name: 'Bob Smith',
                        email: 'bob@example.com',
                        profilePic: null,
                        level: 2,
                        totalReferrals: 2,
                        directReferrals: 2,
                        totalEarnings: 400,
                        joinDate: '2024-02-15',
                        leftChild: null,
                        rightChild: null
                    },
                    rightChild: {
                        id: 'user-5',
                        name: 'Carol Brown',
                        email: 'carol@example.com',
                        profilePic: null,
                        level: 2,
                        totalReferrals: 4,
                        directReferrals: 1,
                        totalEarnings: 800,
                        joinDate: '2024-02-20',
                        leftChild: null,
                        rightChild: null
                    }
                },
                rightChild: {
                    id: 'user-3',
                    name: 'David Wilson',
                    email: 'david@example.com',
                    profilePic: null,
                    level: 1,
                    totalReferrals: 6,
                    directReferrals: 2,
                    totalEarnings: 1300,
                    joinDate: '2024-02-05',
                    leftChild: {
                        id: 'user-6',
                        name: 'Eva Davis',
                        email: 'eva@example.com',
                        profilePic: null,
                        level: 2,
                        totalReferrals: 3,
                        directReferrals: 1,
                        totalEarnings: 600,
                        joinDate: '2024-02-25',
                        leftChild: null,
                        rightChild: null
                    },
                    rightChild: {
                        id: 'user-7',
                        name: 'Frank Miller',
                        email: 'frank@example.com',
                        profilePic: null,
                        level: 2,
                        totalReferrals: 3,
                        directReferrals: 2,
                        totalEarnings: 700,
                        joinDate: '2024-03-01',
                        leftChild: null,
                        rightChild: null
                    }
                }
            };
        } else {
            return {
                ...currentUser,
                children: [
                    {
                        id: 'user-2',
                        name: 'Alice Johnson',
                        email: 'alice@example.com',
                        profilePic: null,
                        level: 1,
                        totalReferrals: 6,
                        directReferrals: 3,
                        totalEarnings: 1200,
                        joinDate: '2024-02-01',
                        children: [
                            {
                                id: 'user-4',
                                name: 'Bob Smith',
                                email: 'bob@example.com',
                                profilePic: null,
                                level: 2,
                                totalReferrals: 2,
                                directReferrals: 2,
                                totalEarnings: 400,
                                joinDate: '2024-02-15',
                                children: []
                            },
                            {
                                id: 'user-5',
                                name: 'Carol Brown',
                                email: 'carol@example.com',
                                profilePic: null,
                                level: 2,
                                totalReferrals: 4,
                                directReferrals: 1,
                                totalEarnings: 800,
                                joinDate: '2024-02-20',
                                children: []
                            },
                            {
                                id: 'user-8',
                                name: 'Grace Lee',
                                email: 'grace@example.com',
                                profilePic: null,
                                level: 2,
                                totalReferrals: 0,
                                directReferrals: 0,
                                totalEarnings: 0,
                                joinDate: '2024-03-10',
                                children: []
                            }
                        ]
                    },
                    {
                        id: 'user-3',
                        name: 'David Wilson',
                        email: 'david@example.com',
                        profilePic: null,
                        level: 1,
                        totalReferrals: 6,
                        directReferrals: 2,
                        totalEarnings: 1300,
                        joinDate: '2024-02-05',
                        children: [
                            {
                                id: 'user-6',
                                name: 'Eva Davis',
                                email: 'eva@example.com',
                                profilePic: null,
                                level: 2,
                                totalReferrals: 3,
                                directReferrals: 1,
                                totalEarnings: 600,
                                joinDate: '2024-02-25',
                                children: []
                            },
                            {
                                id: 'user-7',
                                name: 'Frank Miller',
                                email: 'frank@example.com',
                                profilePic: null,
                                level: 2,
                                totalReferrals: 3,
                                directReferrals: 2,
                                totalEarnings: 700,
                                joinDate: '2024-03-01',
                                children: []
                            }
                        ]
                    },
                    {
                        id: 'user-9',
                        name: 'Henry Taylor',
                        email: 'henry@example.com',
                        profilePic: null,
                        level: 1,
                        totalReferrals: 0,
                        directReferrals: 0,
                        totalEarnings: 0,
                        joinDate: '2024-03-15',
                        children: []
                    },
                    {
                        id: 'user-10',
                        name: 'Ivy Anderson',
                        email: 'ivy@example.com',
                        profilePic: null,
                        level: 1,
                        totalReferrals: 1,
                        directReferrals: 1,
                        totalEarnings: 200,
                        joinDate: '2024-03-20',
                        children: [
                            {
                                id: 'user-11',
                                name: 'Jack Wilson',
                                email: 'jack@example.com',
                                profilePic: null,
                                level: 2,
                                totalReferrals: 1,
                                directReferrals: 1,
                                totalEarnings: 100,
                                joinDate: '2024-03-25',
                                children: []
                            }
                        ]
                    }
                ]
            };
        }
    };

    // Load tree data
    useEffect(() => {
        const loadTreeData = async () => {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                const data = generateMockTreeData(selectedTreeType);
                setTreeData(data);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load tree data',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadTreeData();
    }, [selectedTreeType, toast]);

    // Calculate tree statistics
    const calculateTreeStats = () => {
        if (!treeData) return { totalNodes: 0, totalEarnings: 0, activeNodes: 0 };

        let totalNodes = 0;
        let totalEarnings = 0;
        let activeNodes = 0;

        const traverse = (node) => {
            if (!node) return;
            totalNodes++;
            totalEarnings += node.totalEarnings || 0;
            if (node.totalReferrals > 0) activeNodes++;

            if (selectedTreeType === 'binary') {
                traverse(node.leftChild);
                traverse(node.rightChild);
            } else {
                node.children?.forEach(child => traverse(child));
            }
        };

        traverse(treeData);
        return { totalNodes, totalEarnings, activeNodes };
    };

    const stats = calculateTreeStats();

    return (
        <Container maxW="7xl" py={6}>
            <VStack spacing={6} align="stretch">
                {/* Header */}
                <Card bg={cardBgColor} borderColor={borderColor}>
                    <CardHeader>
                        <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>
                            <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
                                <Heading size="lg" color={textColor}>
                                    MLM Tree Structure
                                </Heading>
                                <Text color={textColor} opacity={0.8}>
                                    Visualize your network structure with interactive tree views
                                </Text>
                            </VStack>
                            <ButtonGroup size="md" isAttached variant="outline">
                                <Button
                                    colorScheme={selectedTreeType === 'binary' ? 'blue' : 'gray'}
                                    onClick={() => setSelectedTreeType('binary')}
                                    isActive={selectedTreeType === 'binary'}
                                >
                                    Binary Tree
                                </Button>
                                <Button
                                    colorScheme={selectedTreeType === 'one-to-many' ? 'blue' : 'gray'}
                                    onClick={() => setSelectedTreeType('one-to-many')}
                                    isActive={selectedTreeType === 'one-to-many'}
                                >
                                    One-to-Many
                                </Button>
                            </ButtonGroup>
                        </Flex>
                    </CardHeader>
                </Card>

                {/* Statistics */}
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                    <Card bg={cardBgColor} borderColor={borderColor}>
                        <CardBody>
                            <Stat>
                                <StatLabel color={textColor}>Total Network</StatLabel>
                                <StatNumber color="blue.500">{stats.totalNodes}</StatNumber>
                                <StatHelpText color={textColor}>
                                    <StatArrow type="increase" />
                                    All levels included
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBgColor} borderColor={borderColor}>
                        <CardBody>
                            <Stat>
                                <StatLabel color={textColor}>Active Members</StatLabel>
                                <StatNumber color="green.500">{stats.activeNodes}</StatNumber>
                                <StatHelpText color={textColor}>
                                    <StatArrow type="increase" />
                                    With referrals
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBgColor} borderColor={borderColor}>
                        <CardBody>
                            <Stat>
                                <StatLabel color={textColor}>Total Earnings</StatLabel>
                                <StatNumber color="purple.500">${stats.totalEarnings.toLocaleString()}</StatNumber>
                                <StatHelpText color={textColor}>
                                    <StatArrow type="increase" />
                                    Network total
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card bg={cardBgColor} borderColor={borderColor}>
                        <CardBody>
                            <Stat>
                                <StatLabel color={textColor}>Tree Type</StatLabel>
                                <StatNumber color="orange.500">
                                    {selectedTreeType === 'binary' ? 'Binary' : 'Multi-Level'}
                                </StatNumber>
                                <StatHelpText color={textColor}>
                                    Current view
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Tree Visualization */}
                <Card bg={cardBgColor} borderColor={borderColor}>
                    <CardHeader>
                        <HStack justify="space-between">
                            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                {selectedTreeType === 'binary' ? 'Binary Tree Structure' : 'One-to-Many Tree Structure'}
                            </Text>
                            <Badge colorScheme="blue" variant="subtle">
                                3 Levels Deep
                            </Badge>
                        </HStack>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        {isLoading ? (
                            <Flex justify="center" align="center" minH="400px">
                                <VStack spacing={4}>
                                    <Spinner size="lg" color="blue.500" />
                                    <Text color={textColor}>Loading tree structure...</Text>
                                </VStack>
                            </Flex>
                        ) : treeData ? (
                            <Box minH="400px" overflow="auto">
                                {selectedTreeType === 'binary' ? (
                                    <BinaryTreeNew data={treeData} />
                                ) : (
                                    <OneToManyTreeNew data={treeData} />
                                )}
                            </Box>
                        ) : (
                            <Alert status="info">
                                <AlertIcon />
                                <AlertDescription>
                                    No tree data available. Please check your network connections.
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardBody>
                </Card>

                {/* Legend */}
                <Card bg={cardBgColor} borderColor={borderColor}>
                    <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                            Legend
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                            <HStack>
                                <Box w={4} h={4} bg="blue.500" borderRadius="full" />
                                <Text fontSize="sm" color={textColor}>You (Root)</Text>
                            </HStack>
                            <HStack>
                                <Box w={4} h={4} bg="green.500" borderRadius="full" />
                                <Text fontSize="sm" color={textColor}>Active Members</Text>
                            </HStack>
                            <HStack>
                                <Box w={4} h={4} bg="gray.400" borderRadius="full" />
                                <Text fontSize="sm" color={textColor}>Inactive Members</Text>
                            </HStack>
                            <HStack>
                                <Box w={4} h={4} bg="purple.500" borderRadius="full" />
                                <Text fontSize="sm" color={textColor}>High Performers</Text>
                            </HStack>
                        </SimpleGrid>
                    </CardBody>
                </Card>
            </VStack>
        </Container>
    );
};

export default Tree;