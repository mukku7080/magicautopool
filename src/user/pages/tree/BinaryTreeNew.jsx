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
    useBreakpointValue
} from '@chakra-ui/react';
import { FaEye, FaUser, FaDollarSign, FaCalendar, FaUsers } from 'react-icons/fa';

const BinaryTreeNew = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Responsive values
    const nodeSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
    const spacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });
    const fontSize = useBreakpointValue({ base: 'xs', md: 'sm' });

    // Color mode values
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const lineColor = useColorModeValue('gray.300', 'gray.500');

    // Generate sample data if none provided
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
            }
        }
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

    const TreeNode = ({ node, isRoot = false, level = 0, position = 'center' }) => {
        if (!node) {
            return (
                <Box
                    w={{ base: '120px', md: '150px' }}
                    h={{ base: '120px', md: '150px' }}
                    border="1px dashed"
                    borderColor={borderColor}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0.3}
                >
                    <VStack spacing={1}>
                        <FaUser size={16} color={lineColor} />
                        <Text fontSize="xs" color={textColor} opacity={0.7}>
                            {position === 'left' ? 'Left' : 'Right'}
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
                w={{ base: '120px', md: '150px' }}
                h={{ base: '120px', md: '150px' }}
            >
                <CardBody p={{ base: 2, md: 3 }} textAlign="center">
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
                        <VStack spacing={0} align="center">
                            <Text
                                fontWeight="bold"
                                fontSize={fontSize}
                                color={textColor}
                                textAlign="center"
                                noOfLines={1}
                            >
                                {node.name.split(' ')[0]}
                            </Text>
                        </VStack>

                        {/* Stats */}
                        <HStack spacing={1} justify="center">
                            <Badge colorScheme={nodeColor} size="sm" fontSize="2xs">
                                {node.directReferrals}
                            </Badge>
                            <Badge colorScheme="green" size="sm" fontSize="2xs">
                                ${node.totalEarnings}
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

                {/* Connection line to level 1 */}
                {(sampleData.leftChild || sampleData.rightChild) && (
                    <Flex justify="center" mb={2}>
                        <Box w="1px" h="30px" bg={lineColor} />
                    </Flex>
                )}

                {/* Level 1 */}
                {(sampleData.leftChild || sampleData.rightChild) && (
                    <>
                        <Flex justify="center" mb={4}>
                            <Box w={{ base: '200px', md: '300px' }} h="1px" bg={lineColor} position="relative">
                                <Box position="absolute" left="0" top="0" w="1px" h="30px" bg={lineColor} />
                                <Box position="absolute" right="0" top="0" w="1px" h="30px" bg={lineColor} />
                            </Box>
                        </Flex>

                        <Flex justify="space-between" maxW={{ base: '300px', md: '400px' }} mx="auto" mb={6}>
                            <TreeNode node={sampleData.leftChild} level={1} position="left" />
                            <TreeNode node={sampleData.rightChild} level={1} position="right" />
                        </Flex>
                    </>
                )}

                {/* Level 2 - Left side */}
                {sampleData.leftChild && (sampleData.leftChild.leftChild || sampleData.leftChild.rightChild) && (
                    <>
                        <Flex justify="center" mb={2} maxW="200px" ml={{ base: '10px', md: '50px' }}>
                            <Box w="1px" h="30px" bg={lineColor} />
                        </Flex>
                        <Flex justify="center" mb={4} maxW="200px" ml={{ base: '10px', md: '50px' }}>
                            <Box w="120px" h="1px" bg={lineColor} position="relative">
                                <Box position="absolute" left="0" top="0" w="1px" h="30px" bg={lineColor} />
                                <Box position="absolute" right="0" top="0" w="1px" h="30px" bg={lineColor} />
                            </Box>
                        </Flex>
                        <Flex justify="space-between" maxW="200px" mx="auto" mb={6} ml={{ base: '-30px', md: '20px' }}>
                            <TreeNode node={sampleData.leftChild.leftChild} level={2} position="left" />
                            <TreeNode node={sampleData.leftChild.rightChild} level={2} position="right" />
                        </Flex>
                    </>
                )}

                {/* Level 2 - Right side */}
                {sampleData.rightChild && (sampleData.rightChild.leftChild || sampleData.rightChild.rightChild) && (
                    <>
                        <Flex justify="center" mb={2} maxW="200px" mr={{ base: '10px', md: '50px' }} ml="auto">
                            <Box w="1px" h="30px" bg={lineColor} />
                        </Flex>
                        <Flex justify="center" mb={4} maxW="200px" mr={{ base: '10px', md: '50px' }} ml="auto">
                            <Box w="120px" h="1px" bg={lineColor} position="relative">
                                <Box position="absolute" left="0" top="0" w="1px" h="30px" bg={lineColor} />
                                <Box position="absolute" right="0" top="0" w="1px" h="30px" bg={lineColor} />
                            </Box>
                        </Flex>
                        <Flex justify="space-between" maxW="200px" mx="auto" mr={{ base: '-30px', md: '20px' }} ml="auto">
                            <TreeNode node={sampleData.rightChild.leftChild} level={2} position="left" />
                            <TreeNode node={sampleData.rightChild.rightChild} level={2} position="right" />
                        </Flex>
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
                                            <Text>Total Referrals</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber color="blue.500">
                                        {selectedNode?.totalReferrals}
                                    </StatNumber>
                                    <StatHelpText>
                                        {selectedNode?.directReferrals} direct
                                    </StatHelpText>
                                </Stat>

                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <FaDollarSign />
                                            <Text>Earnings</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber color="green.500">
                                        ${selectedNode?.totalEarnings?.toLocaleString()}
                                    </StatNumber>
                                    <StatHelpText>
                                        Total earned
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
                                    <Text fontWeight="semibold">Level:</Text>
                                    <Badge colorScheme="purple">
                                        Level {selectedNode?.level}
                                    </Badge>
                                </HStack>

                                <HStack>
                                    <Text fontWeight="semibold">Status:</Text>
                                    <Badge
                                        colorScheme={selectedNode?.totalReferrals > 0 ? 'green' : 'gray'}
                                    >
                                        {selectedNode?.totalReferrals > 0 ? 'Active' : 'Inactive'}
                                    </Badge>
                                </HStack>
                            </VStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default BinaryTreeNew;
