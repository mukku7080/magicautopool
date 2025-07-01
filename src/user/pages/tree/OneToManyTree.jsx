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
    Wrap,
    WrapItem,
    useBreakpointValue,
    Grid
} from '@chakra-ui/react';
import { FaEye, FaUser, FaDollarSign, FaCalendar, FaUsers, FaPlus } from 'react-icons/fa';

const OneToManyTree = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Responsive values
    const nodeSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
    const spacing = useBreakpointValue({ base: 2, md: 4, lg: 6 });
    const fontSize = useBreakpointValue({ base: 'xs', md: 'sm' });
    const columnsCount = useBreakpointValue({ base: 2, md: 3, lg: 4, xl: 5 });

    // Color mode values
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const lineColor = useColorModeValue('gray.300', 'gray.500');

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
        if (!node) return null;

        const nodeColor = getNodeColor(node, isRoot);
        const hasChildren = node.children && node.children.length > 0;

        return (
            <VStack spacing={6} align="center">
                {/* Node */}
                <Card
                    bg={cardBgColor}
                    borderColor={borderColor}
                    borderWidth="2px"
                    borderRadius="xl"
                    shadow="md"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                        transform: 'translateY(-2px)',
                        shadow: 'lg',
                        borderColor: `${nodeColor}.400`
                    }}
                    onClick={() => handleNodeClick(node)}
                    minW="180px"
                    maxW="220px"
                    position="relative"
                >
                    <CardBody p={4}>
                        <VStack spacing={1} align="center">
                            {/* Profile Picture and Status Indicator */}
                            <Box position="relative">
                                <Avatar
                                    size={isRoot ? "xl" : "lg"}
                                    name={node.name}
                                    src={node.profilePic}
                                    bg={`${nodeColor}.500`}
                                    color="white"
                                />
                                <Box
                                    position="absolute"
                                    bottom="0"
                                    right="0"
                                    w="6"
                                    h="6"
                                    bg={`${nodeColor}.500`}
                                    borderRadius="full"
                                    border="2px solid white"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text fontSize="xs" fontWeight="bold" color="white">
                                        {level}
                                    </Text>
                                </Box>
                            </Box>

                            {/* User Info */}
                            <VStack spacing={1} mb={2} align="center">
                                <Box
                                    fontWeight="bold"
                                    fontSize="sm"
                                    color={textColor}
                                    textAlign="center"
                                    noOfLines={1}
                                >
                                    {node.name}
                                </Box>
                                <Box
                                    fontSize="xs"
                                    color={textColor}
                                    opacity={0.7}
                                    textAlign="center"
                                    noOfLines={1}
                                >
                                    {node.email}
                                </Box>
                            </VStack>

                            {/* Stats */}
                            <VStack spacing={1} w="full">
                                <HStack spacing={2} w="full" justify="center">
                                    <Badge colorScheme={nodeColor} variant="subtle" fontSize="xs">
                                        {node.directReferrals} Direct
                                    </Badge>
                                    <Badge colorScheme="orange" variant="subtle" fontSize="xs">
                                        {node.totalReferrals} Total
                                    </Badge>
                                </HStack>
                                <Badge colorScheme="green" variant="subtle" fontSize="xs">
                                    ${node.totalEarnings?.toLocaleString()}
                                </Badge>
                            </VStack>

                            {/* View Details Button */}
                            <IconButton
                                icon={<FaEye />}
                                size="sm"
                                colorScheme={nodeColor}
                                variant="ghost"
                                aria-label="View Details"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNodeClick(node);
                                }}
                            />
                        </VStack>
                    </CardBody>
                </Card>

                {/* Connection Lines and Children */}
                {hasChildren && (
                    <VStack spacing={6} align="center">
                        {/* Simple vertical line down from parent */}
                        <Box w="2px" h="40px" bg={lineColor} />

                        {/* Horizontal line with vertical connectors to children */}
                        <Box position="relative" w="full" display="flex" justifyContent="center">
                            {/* Main horizontal line */}
                            <Box
                                w={`${Math.min(node.children.length * 240, 1200)}px`}
                                h="2px"
                                bg={lineColor}
                                position="relative"
                            >
                                {/* Vertical connectors to each child */}
                                {node.children.map((_, index) => {
                                    const totalChildren = node.children.length;
                                    const spacing = 100 / (totalChildren + 1);
                                    const leftPosition = `${spacing * (index + 1)}%`;

                                    return (
                                        <Box
                                            key={index}
                                            position="absolute"
                                            left={leftPosition}
                                            top="0"
                                            w="2px"
                                            h="40px"
                                            bg={lineColor}
                                            transform="translateX(-50%)"
                                        />
                                    );
                                })}
                            </Box>
                        </Box>

                        {/* Children Nodes */}
                        <Wrap spacing={6} justify="center" maxW="1400px">
                            {node.children.map((child, index) => (
                                <WrapItem key={child.id || index}>
                                    <TreeNode node={child} level={level + 1} />
                                </WrapItem>
                            ))}

                            {/* Add empty slots for visual balance if needed */}
                            {level < 2 && node.children.length < 6 && (
                                <WrapItem>
                                    <Box
                                        w="180px"
                                        h="220px"
                                        border="2px dashed"
                                        borderColor={borderColor}
                                        borderRadius="xl"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        opacity={0.2}
                                        transition="all 0.2s"
                                        _hover={{ opacity: 0.5 }}
                                    >
                                        <VStack spacing={2}>
                                            <FaPlus size={16} color={lineColor} />
                                            <Text fontSize="xs" color={textColor} opacity={0.6}>
                                                Add Member
                                            </Text>
                                        </VStack>
                                    </Box>
                                </WrapItem>
                            )}
                        </Wrap>
                    </VStack>
                )}

                {/* Show empty slots for nodes without children at level < 2 */}
                {!hasChildren && level < 2 && (
                    <VStack spacing={4} align="center">
                        <Box w="2px" h="40px" bg={lineColor} opacity={0.2} />
                        <Box
                            w="180px"
                            h="120px"
                            border="2px dashed"
                            borderColor={borderColor}
                            borderRadius="xl"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            opacity={0.2}
                            transition="opacity 0.2s"
                            _hover={{ opacity: 0.4 }}
                        >
                            <VStack spacing={2}>
                                <FaUser size={16} color={lineColor} />
                                <Text fontSize="xs" color={textColor} opacity={0.7}>
                                    Build Network
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>
                )}
            </VStack>
        );
    };

    return (
        <>
            <Box p={6} overflowX="auto" minH="600px">
                <Flex direction="column" align="center" w="full">
                    <TreeNode node={data} isRoot={true} />
                </Flex>
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
                            {/* Performance Stats */}
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

                            {/* Additional Details */}
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

                            {/* Network Breakdown */}
                            {selectedNode?.children && selectedNode.children.length > 0 && (
                                <>
                                    <Divider />
                                    <Box>
                                        <Text fontWeight="semibold" mb={3}>Direct Network Members:</Text>
                                        <Wrap spacing={2}>
                                            {selectedNode.children.map((child, index) => (
                                                <WrapItem key={child.id || index}>
                                                    <HStack
                                                        p={2}
                                                        bg={cardBgColor}
                                                        borderRadius="md"
                                                        border="1px solid"
                                                        borderColor={borderColor}
                                                    >
                                                        <Avatar size="xs" name={child.name} src={child.profilePic} />
                                                        <Text fontSize="sm">{child.name}</Text>
                                                        <Badge size="sm" colorScheme={getNodeColor(child)}>
                                                            ${child.totalEarnings}
                                                        </Badge>
                                                    </HStack>
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                    </Box>
                                </>
                            )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default OneToManyTree;