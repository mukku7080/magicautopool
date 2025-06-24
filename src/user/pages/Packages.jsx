import React, { useState } from 'react';
import {
    Box,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    Badge,
    useColorModeValue,
    Icon,
    Progress,
    Divider,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import {
    FiStar,
    FiTrendingUp,
    FiClock,
    FiDollarSign,
    FiShield,
    FiAward,
    FiTarget,
    FiCalendar,
} from 'react-icons/fi';
import { AiOutlineRocket, AiOutlineCrown, AiOutlineStar } from 'react-icons/ai';

const Packages = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const toast = useToast();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    // Available packages
    const availablePackages = [
        {
            id: 1,
            name: 'Starter Package',
            icon: AiOutlineRocket,
            color: 'blue',
            minInvestment: 100,
            maxInvestment: 999,
            dailyReturn: 1.5,
            duration: 30,
            totalReturn: 145,
            features: [
                'Daily returns',
                'Basic support',
                'Mobile app access',
                'Email notifications'
            ],
            popular: false,
            risk: 'Low',
        },
        {
            id: 2,
            name: 'Gold Package',
            icon: AiOutlineCrown,
            color: 'yellow',
            minInvestment: 1000,
            maxInvestment: 4999,
            dailyReturn: 2.5,
            duration: 45,
            totalReturn: 212.5,
            features: [
                'Higher daily returns',
                'Priority support',
                'Advanced analytics',
                'SMS notifications',
                'Dedicated account manager'
            ],
            popular: true,
            risk: 'Medium',
        },
        {
            id: 3,
            name: 'Platinum Package',
            icon: AiOutlineStar,
            color: 'purple',
            minInvestment: 5000,
            maxInvestment: 19999,
            dailyReturn: 3.2,
            duration: 60,
            totalReturn: 292,
            features: [
                'Premium daily returns',
                'VIP support',
                'Real-time analytics',
                'All notifications',
                'Personal advisor',
                'Exclusive webinars'
            ],
            popular: false,
            risk: 'Medium-High',
        },
        {
            id: 4,
            name: 'Diamond Package',
            icon: FiAward,
            color: 'cyan',
            minInvestment: 20000,
            maxInvestment: 100000,
            dailyReturn: 4.0,
            duration: 90,
            totalReturn: 460,
            features: [
                'Maximum daily returns',
                'White-glove support',
                'Custom analytics',
                'All premium features',
                'Direct line to executives',
                'Exclusive events',
                'Custom investment strategies'
            ],
            popular: false,
            risk: 'High',
        },
    ];

    // Active investments
    const activeInvestments = [
        {
            id: 1,
            packageName: 'Gold Package',
            investment: 1000,
            dailyReturn: 2.5,
            totalEarned: 125.50,
            daysLeft: 28,
            progress: 65,
            status: 'Active',
            startDate: '2024-01-01',
            endDate: '2024-02-15',
        },
        {
            id: 2,
            packageName: 'Silver Package',
            investment: 500,
            dailyReturn: 1.8,
            totalEarned: 45.20,
            daysLeft: 15,
            progress: 80,
            status: 'Active',
            startDate: '2023-12-15',
            endDate: '2024-01-30',
        },
    ];

    const handleInvest = (pkg) => {
        setSelectedPackage(pkg);
        onOpen();
    };

    const handleInvestmentSubmit = () => {
        const amount = parseFloat(investmentAmount);

        if (!amount || amount < selectedPackage.minInvestment || amount > selectedPackage.maxInvestment) {
            toast({
                title: 'Invalid Amount',
                description: `Investment amount must be between $${selectedPackage.minInvestment} and $${selectedPackage.maxInvestment}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Investment Successful!',
            description: `You have successfully invested $${amount} in ${selectedPackage.name}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        setInvestmentAmount('');
        onClose();
    };

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return 'green';
            case 'Medium': return 'yellow';
            case 'Medium-High': return 'orange';
            case 'High': return 'red';
            default: return 'gray';
        }
    };

    return (
        <Box>
            <Heading size="lg" mb={6}>
                Investment Packages
            </Heading>

            <Tabs variant="enclosed" colorScheme="blue">
                <TabList>
                    <Tab>Available Packages</Tab>
                    <Tab>My Investments</Tab>
                    <Tab>Investment History</Tab>
                </TabList>

                <TabPanels>
                    {/* Available Packages Tab */}
                    <TabPanel p={0} pt={6}>
                        <Alert status="info" mb={6} borderRadius="lg">
                            <AlertIcon />
                            <Box>
                                <AlertTitle>Investment Notice</AlertTitle>
                                <AlertDescription>
                                    All investments carry risk. Please read the terms and conditions carefully before investing.
                                    Past performance does not guarantee future results.
                                </AlertDescription>
                            </Box>
                        </Alert>

                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6}>
                            {availablePackages.map((pkg) => (
                                <GridItem key={pkg.id}>
                                    <Card
                                        bg={cardBg}
                                        border="2px"
                                        borderColor={pkg.popular ? `${pkg.color}.300` : borderColor}
                                        position="relative"
                                        _hover={{
                                            transform: 'translateY(-4px)',
                                            shadow: 'xl',
                                        }}
                                        transition="all 0.3s"
                                    >
                                        {pkg.popular && (
                                            <Badge
                                                position="absolute"
                                                top="-10px"
                                                left="50%"
                                                transform="translateX(-50%)"
                                                colorScheme={pkg.color}
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                fontSize="xs"
                                                fontWeight="bold"
                                            >
                                                MOST POPULAR
                                            </Badge>
                                        )}

                                        <CardHeader textAlign="center" pb={4}>
                                            <VStack spacing={3}>
                                                <Box
                                                    p={4}
                                                    borderRadius="full"
                                                    bg={`${pkg.color}.100`}
                                                    color={`${pkg.color}.600`}
                                                >
                                                    <Icon as={pkg.icon} boxSize={8} />
                                                </Box>
                                                <VStack spacing={1}>
                                                    <Heading size="md">{pkg.name}</Heading>
                                                    <Badge
                                                        colorScheme={getRiskColor(pkg.risk)}
                                                        variant="subtle"
                                                    >
                                                        {pkg.risk} Risk
                                                    </Badge>
                                                </VStack>
                                            </VStack>
                                        </CardHeader>

                                        <CardBody pt={0}>
                                            <VStack spacing={4} align="stretch">
                                                {/* Key Stats */}
                                                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                                    <Box textAlign="center" p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                                                        <Text fontSize="2xl" fontWeight="bold" color={`${pkg.color}.500`}>
                                                            {pkg.dailyReturn}%
                                                        </Text>
                                                        <Text fontSize="sm" color={textColor}>
                                                            Daily Return
                                                        </Text>
                                                    </Box>
                                                    <Box textAlign="center" p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                                                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                                                            {pkg.totalReturn}%
                                                        </Text>
                                                        <Text fontSize="sm" color={textColor}>
                                                            Total Return
                                                        </Text>
                                                    </Box>
                                                </Grid>

                                                {/* Investment Range */}
                                                <Box>
                                                    <HStack justify="space-between" mb={2}>
                                                        <Text fontSize="sm" fontWeight="medium">
                                                            Investment Range
                                                        </Text>
                                                        <HStack>
                                                            <Icon as={FiClock} boxSize={4} color={textColor} />
                                                            <Text fontSize="sm" color={textColor}>
                                                                {pkg.duration} days
                                                            </Text>
                                                        </HStack>
                                                    </HStack>
                                                    <Text fontSize="lg" fontWeight="bold">
                                                        ${pkg.minInvestment.toLocaleString()} - ${pkg.maxInvestment.toLocaleString()}
                                                    </Text>
                                                </Box>

                                                <Divider />

                                                {/* Features */}
                                                <Box>
                                                    <Text fontSize="sm" fontWeight="medium" mb={3}>
                                                        Package Features
                                                    </Text>
                                                    <VStack spacing={2} align="stretch">
                                                        {pkg.features.map((feature, index) => (
                                                            <HStack key={index} spacing={2}>
                                                                <Icon as={FiTarget} color="green.500" boxSize={4} />
                                                                <Text fontSize="sm">{feature}</Text>
                                                            </HStack>
                                                        ))}
                                                    </VStack>
                                                </Box>

                                                <Button
                                                    colorScheme={pkg.color}
                                                    size="lg"
                                                    onClick={() => handleInvest(pkg)}
                                                    leftIcon={<FiDollarSign />}
                                                >
                                                    Invest Now
                                                </Button>
                                            </VStack>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* My Investments Tab */}
                    <TabPanel p={0} pt={6}>
                        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6} mb={6}>
                            <Card bg={cardBg} border="1px" borderColor={borderColor}>
                                <CardBody>
                                    <Stat>
                                        <StatLabel>Total Invested</StatLabel>
                                        <StatNumber color="blue.500">$1,500</StatNumber>
                                        <StatHelpText>Across 2 packages</StatHelpText>
                                    </Stat>
                                </CardBody>
                            </Card>
                            <Card bg={cardBg} border="1px" borderColor={borderColor}>
                                <CardBody>
                                    <Stat>
                                        <StatLabel>Total Earned</StatLabel>
                                        <StatNumber color="green.500">$170.70</StatNumber>
                                        <StatHelpText>11.38% return</StatHelpText>
                                    </Stat>
                                </CardBody>
                            </Card>
                        </Grid>

                        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                            {activeInvestments.map((investment) => (
                                <Card key={investment.id} bg={cardBg} border="1px" borderColor={borderColor}>
                                    <CardHeader>
                                        <HStack justify="space-between">
                                            <Heading size="sm">{investment.packageName}</Heading>
                                            <Badge colorScheme="green" variant="subtle">
                                                {investment.status}
                                            </Badge>
                                        </HStack>
                                    </CardHeader>
                                    <CardBody pt={0}>
                                        <VStack spacing={4} align="stretch">
                                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                                <Box>
                                                    <Text fontSize="sm" color={textColor}>Investment</Text>
                                                    <Text fontWeight="bold">${investment.investment}</Text>
                                                </Box>
                                                <Box>
                                                    <Text fontSize="sm" color={textColor}>Daily Return</Text>
                                                    <Text fontWeight="bold" color="green.500">{investment.dailyReturn}%</Text>
                                                </Box>
                                                <Box>
                                                    <Text fontSize="sm" color={textColor}>Total Earned</Text>
                                                    <Text fontWeight="bold" color="green.500">${investment.totalEarned}</Text>
                                                </Box>
                                                <Box>
                                                    <Text fontSize="sm" color={textColor}>Days Left</Text>
                                                    <Text fontWeight="bold">{investment.daysLeft}</Text>
                                                </Box>
                                            </Grid>

                                            <Box>
                                                <HStack justify="space-between" mb={2}>
                                                    <Text fontSize="sm" color={textColor}>Progress</Text>
                                                    <Text fontSize="sm" color={textColor}>{investment.progress}%</Text>
                                                </HStack>
                                                <Progress
                                                    value={investment.progress}
                                                    colorScheme="blue"
                                                    size="md"
                                                    borderRadius="full"
                                                />
                                            </Box>

                                            <HStack justify="space-between" fontSize="sm" color={textColor}>
                                                <Text>Start: {investment.startDate}</Text>
                                                <Text>End: {investment.endDate}</Text>
                                            </HStack>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* Investment History Tab */}
                    <TabPanel p={0} pt={6}>
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardHeader>
                                <Heading size="md">Investment History</Heading>
                            </CardHeader>
                            <CardBody pt={0}>
                                <TableContainer>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Package</Th>
                                                <Th>Investment</Th>
                                                <Th>Duration</Th>
                                                <Th>Total Return</Th>
                                                <Th>Status</Th>
                                                <Th>Date</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Gold Package</Td>
                                                <Td>$1,000</Td>
                                                <Td>45 days</Td>
                                                <Td color="green.500">$125.50</Td>
                                                <Td>
                                                    <Badge colorScheme="green" variant="subtle">
                                                        Active
                                                    </Badge>
                                                </Td>
                                                <Td>2024-01-01</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Silver Package</Td>
                                                <Td>$500</Td>
                                                <Td>30 days</Td>
                                                <Td color="green.500">$45.20</Td>
                                                <Td>
                                                    <Badge colorScheme="green" variant="subtle">
                                                        Active
                                                    </Badge>
                                                </Td>
                                                <Td>2023-12-15</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Starter Package</Td>
                                                <Td>$200</Td>
                                                <Td>30 days</Td>
                                                <Td color="green.500">$29.00</Td>
                                                <Td>
                                                    <Badge colorScheme="gray" variant="subtle">
                                                        Completed
                                                    </Badge>
                                                </Td>
                                                <Td>2023-11-01</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </CardBody>
                        </Card>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Investment Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Invest in {selectedPackage?.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedPackage && (
                            <VStack spacing={6} align="stretch">
                                {/* Package Summary */}
                                <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                                    <Grid templateColumns="repeat(3, 1fr)" gap={4} textAlign="center">
                                        <Box>
                                            <Text fontSize="lg" fontWeight="bold" color={`${selectedPackage.color}.500`}>
                                                {selectedPackage.dailyReturn}%
                                            </Text>
                                            <Text fontSize="sm" color={textColor}>Daily Return</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize="lg" fontWeight="bold" color="green.500">
                                                {selectedPackage.totalReturn}%
                                            </Text>
                                            <Text fontSize="sm" color={textColor}>Total Return</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize="lg" fontWeight="bold">
                                                {selectedPackage.duration}
                                            </Text>
                                            <Text fontSize="sm" color={textColor}>Days</Text>
                                        </Box>
                                    </Grid>
                                </Box>

                                <FormControl>
                                    <FormLabel>Investment Amount</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder={`Min: $${selectedPackage.minInvestment} - Max: $${selectedPackage.maxInvestment}`}
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(e.target.value)}
                                    />
                                    <Text fontSize="sm" color={textColor} mt={1}>
                                        Investment range: ${selectedPackage.minInvestment.toLocaleString()} - ${selectedPackage.maxInvestment.toLocaleString()}
                                    </Text>
                                </FormControl>

                                {investmentAmount && (
                                    <Box p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg">
                                        <Text fontSize="sm" fontWeight="medium" mb={2}>Investment Summary:</Text>
                                        <VStack spacing={1} align="stretch" fontSize="sm">
                                            <HStack justify="space-between">
                                                <Text>Investment Amount:</Text>
                                                <Text fontWeight="bold">${parseFloat(investmentAmount || 0).toLocaleString()}</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text>Daily Return ({selectedPackage.dailyReturn}%):</Text>
                                                <Text fontWeight="bold" color="green.500">
                                                    ${((parseFloat(investmentAmount || 0) * selectedPackage.dailyReturn) / 100).toFixed(2)}
                                                </Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text>Total Expected Return:</Text>
                                                <Text fontWeight="bold" color="green.500">
                                                    ${((parseFloat(investmentAmount || 0) * selectedPackage.totalReturn) / 100).toFixed(2)}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </Box>
                                )}

                                <Alert status="warning" borderRadius="lg">
                                    <AlertIcon />
                                    <AlertDescription fontSize="sm">
                                        Please ensure you understand the risks involved. All investments carry the risk of loss.
                                    </AlertDescription>
                                </Alert>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleInvestmentSubmit}
                            isDisabled={!investmentAmount}
                        >
                            Confirm Investment
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Packages;