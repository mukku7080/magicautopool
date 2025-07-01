import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    Card,
    CardBody,
    VStack,
    HStack,
    Badge,
    useColorModeValue,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Divider,
    SimpleGrid,
    useBreakpointValue,
    Grid
} from '@chakra-ui/react';
import { FaEye, FaUser, FaDollarSign, FaCalendar, FaUsers, FaPlus } from 'react-icons/fa';

const OneToManyTreeNew = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Responsive values
    const nodeSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
    const fontSize = useBreakpointValue({ base: 'xs', md: 'sm' });
    const columnsCount = useBreakpointValue({ base: 2, md: 3, lg: 4, xl: 5 });

    // Color mode values
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const lineColor = useColorModeValue('gray.300', 'gray.500');

    // Sample data if none provided
    const sampleData = data || {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        profilePic: null,
        level: 0,
        totalReferrals: 12,
        directReferrals: 4,
        totalEarnings: 2500,
        joinDate: '2024-01-15',
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
                id: 'user-8',
                name: 'Grace Lee',
                email: 'grace@example.com',
                profilePic: null,
                level: 1,
                totalReferrals: 1,
                directReferrals: 1,
                totalEarnings: 200,
                joinDate: '2024-03-10',
                children: [
                    {
                        id: 'user-9',
                        name: 'Henry Taylor',
                        email: 'henry@example.com',
                        profilePic: null,
                        level: 2,
                        totalReferrals: 0,
                        directReferrals: 0,
                        totalEarnings: 0,
                        joinDate: '2024-03-15',
                        children: []
                    }
                ]
            }
        ]
    };

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        onOpen();
    };

    const getNodeColor = (node, isRoot = false) => {
        if (isRoot) return 'blue';
        if (node?.totalEarnings > 1000) return 'purple';
        if (node?.totalReferrals > 0) return 'green';
        return 'gray';
    };

    const TreeNode = ({ node, isRoot = false, level = 0 }) => {
        if (!node) {
            return (
                <Box
                    w={{ base: '90px', md: '110px' }}
                    h={{ base: '90px', md: '110px' }}
                    border="1px dashed"
                    borderColor={borderColor}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0.3}
                >
                    <VStack spacing={1}>
                        <FaUser size={12} color={lineColor} />
                        <Text fontSize="2xs" color={textColor} opacity={0.7}>
                            Empty
                        </Text>
                    </VStack>
                </Box>
            );
        }

        const nodeColor = getNodeColor(node, isRoot);

        return (
            <Card
                bg={cardBgColor}
                borderColor={`${nodeColor}.200`}
                borderWidth="1px"
                borderRadius="lg"
                shadow="sm"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                    transform: 'translateY(-1px)',
                    shadow: 'md',
                    borderColor: `${nodeColor}.400`
                }}
                onClick={() => handleNodeClick(node)}
                w={{ base: '90px', md: '110px' }}
                h={{ base: '90px', md: '110px' }}
            >
                <CardBody p={{ base: 1, md: 2 }} textAlign="center">
                    <VStack spacing={{ base: 1, md: 2 }} align="center" h="full" justify="center">
                        {/* Profile Picture */}
                        <Avatar
                            size={isRoot ? (nodeSize === 'sm' ? 'md' : 'lg') : nodeSize}
                            name={node.name}
                            src={node.profilePic}
                            bg={`${nodeColor}.500`}
                            color="white"
                        />

                        {/* User Info */}
                        <Text
                            fontWeight="bold"
                            fontSize={fontSize}
                            color={textColor}
                            textAlign="center"
                            noOfLines={1}
                        >
                            {node.name.split(' ')[0]}
                        </Text>

                        {/* Stats */}
                        <HStack spacing={1} justify="center">
                            <Badge colorScheme={nodeColor} size="sm" fontSize="2xs">
                                {node.directReferrals}
                            </Badge>
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>
        );
    };

    return (
        <>
            <Box
                p={{ base: 4, md: 6 }}
                w="full"
                overflowX="auto"
            >
                {/* Level 0 - Root */}
                <Flex justify="center" mb={6}>
                    <TreeNode node={sampleData} isRoot={true} level={0} />
                </Flex>

                {/* Simple line down */}
                {sampleData.children && sampleData.children.length > 0 && (
                    <Flex justify="center" mb={4}>
                        <Box w="1px" h="30px" bg={lineColor} />
                    </Flex>
                )}

                {/* Level 1 - Direct Children */}
                {sampleData.children && sampleData.children.length > 0 && (
                    <>
                        <Grid
                            templateColumns={`repeat(${Math.min(sampleData.children.length, columnsCount)}, 1fr)`}
                            gap={4}
                            maxW="600px"
                            mx="auto"
                            mb={6}
                        >
                            {sampleData.children.map((child, index) => (
                                <Flex key={child.id || index} direction="column" align="center">
                                    <TreeNode node={child} level={1} />
                                </Flex>
                            ))}
                        </Grid>
                    </>
                )}

                {/* Level 2 - Grandchildren */}
                {sampleData.children && sampleData.children.some(child => child.children && child.children.length > 0) && (
                    <>
                        <Flex justify="center" mb={4}>
                            <Box w="1px" h="30px" bg={lineColor} />
                        </Flex>

                        <Grid
                            templateColumns={`repeat(${columnsCount}, 1fr)`}
                            gap={3}
                            maxW="800px"
                            mx="auto"
                        >
                            {sampleData.children.map((child) =>
                                child.children && child.children.map((grandChild, index) => (
                                    <Flex key={grandChild.id || `${child.id}-${index}`} direction="column" align="center">
                                        <TreeNode node={grandChild} level={2} />
                                    </Flex>
                                ))
                            )}
                        </Grid>
                    </>
                )}
            </Box>

            {/* Node Details Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack spacing={3}>
                            <Avatar
                                size="md"
                                name={selectedNode?.name}
                                src={selectedNode?.profilePic}
                                bg={`${getNodeColor(selectedNode)}.500`}
                            />
                            <VStack align="start" spacing={0}>
                                <Text>{selectedNode?.name}</Text>
                                <Text fontSize="sm" opacity={0.7}>
                                    {selectedNode?.email}
                                </Text>
                            </VStack>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={6} align="stretch">
                            <SimpleGrid columns={2} spacing={4}>
                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <FaUsers />
                                            <Text>Direct Referrals</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber color="blue.500">
                                        {selectedNode?.directReferrals}
                                    </StatNumber>
                                    <StatHelpText>
                                        Personally referred
                                    </StatHelpText>
                                </Stat>

                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <FaUsers />
                                            <Text>Total Network</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber color="purple.500">
                                        {selectedNode?.totalReferrals}
                                    </StatNumber>
                                    <StatHelpText>
                                        Including sub-levels
                                    </StatHelpText>
                                </Stat>

                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <FaDollarSign />
                                            <Text>Total Earnings</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber color="green.500">
                                        ${selectedNode?.totalEarnings?.toLocaleString()}
                                    </StatNumber>
                                    <StatHelpText>
                                        Lifetime earnings
                                    </StatHelpText>
                                </Stat>

                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <FaCalendar />
                                            <Text>Level</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber color="orange.500">
                                        {selectedNode?.level}
                                    </StatNumber>
                                    <StatHelpText>
                                        Tree depth level
                                    </StatHelpText>
                                </Stat>
                            </SimpleGrid>

                            <Divider />

                            <VStack spacing={4} align="stretch">
                                <HStack>
                                    <FaCalendar />
                                    <Text fontWeight="semibold">Join Date:</Text>
                                    <Text>{new Date(selectedNode?.joinDate || '').toLocaleDateString()}</Text>
                                </HStack>

                                <HStack>
                                    <Text fontWeight="semibold">Performance:</Text>
                                    <Badge
                                        colorScheme={
                                            selectedNode?.totalEarnings > 1000 ? 'purple' :
                                                selectedNode?.totalReferrals > 0 ? 'green' : 'gray'
                                        }
                                    >
                                        {selectedNode?.totalEarnings > 1000 ? 'High Performer' :
                                            selectedNode?.totalReferrals > 0 ? 'Active' : 'New Member'}
                                    </Badge>
                                </HStack>

                                {selectedNode?.children && selectedNode.children.length > 0 && (
                                    <HStack>
                                        <Text fontWeight="semibold">Network Size:</Text>
                                        <Badge colorScheme="blue">
                                            {selectedNode.children.length} Direct Members
                                        </Badge>
                                    </HStack>
                                )}
                            </VStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default OneToManyTreeNew;