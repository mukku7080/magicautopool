import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useColorModeValue,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
    useDisclosure,
    useToast,
    Spinner,
    AlertDescription,
    VStack,
    HStack,
    Stack,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Divider,
    SimpleGrid,
    IconButton,
    Tooltip,
    useBreakpointValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Center,
    Avatar,
} from "@chakra-ui/react";
import { RepeatIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaWallet, FaHandHoldingUsd, FaEye, FaFilter, FaDownload } from "react-icons/fa";
import { BsCardChecklist, BsThreeDotsVertical } from "react-icons/bs";
import {
    AiOutlineCalendar,
    AiOutlineBank,
    AiOutlineDollarCircle,
    AiOutlineTransaction,
    AiOutlineHistory
} from "react-icons/ai";
import {
    MdOutlineAccountBalanceWallet,
    MdOutlinePayment,
    MdOutlineReceipt,
    MdTrendingUp,
    MdTrendingDown
} from "react-icons/md";
import { useAccount } from "../../Context/AccountContext";
import { useUser } from "../../Context";

const WithdrawScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [transactionPassword, setTransactionPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const toast = useToast();

    // Use Account Context
    const {
        balance,
        withdrawHistory,
        accountStats,
        isLoading,
        withdrawing,
        withdrawSuccess,
        error,
        requestWithdraw,
        clearError,
        clearWithdrawSuccess,
        refreshAccountData,
        getAvailableBalance,
        getTotalBalance,
        getTotalWithdrawn,
    } = useAccount();
    const { profile } = useUser();

    // console.log("Profile Data:", profile);

    // Load account data on component mount
    useEffect(() => {
        refreshAccountData();
    }, []);

    // Handle withdraw success
    useEffect(() => {
        if (withdrawSuccess) {
            toast({
                title: "Withdraw Request Submitted",
                description: "Your withdraw request has been submitted successfully and is being processed.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Reset form
            setWithdrawAmount("");
            setWithdrawAddress("");
            setTransactionPassword("");
            setFormErrors({});

            // Close modal
            onClose();

            // Clear success state
            clearWithdrawSuccess();
        }
    }, [withdrawSuccess, toast, onClose, clearWithdrawSuccess]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            clearError();
        }
    }, [error, toast, clearError]);

    // Form validation
    const validateForm = () => {
        const errors = {};

        // if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
        //   errors.amount = "Please enter a valid withdraw amount";
        // } else if (parseFloat(withdrawAmount) > getAvailableBalance()) {
        //   errors.amount = "Amount exceeds available balance";
        // }

        // if (!withdrawAddress) {
        //   errors.address = "Please enter a withdraw address";
        // }

        // if (!transactionPassword) {
        //   errors.password = "Please enter your transaction password";
        // }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle withdraw request
    const handleWithdrawRequest = async () => {
        if (!validateForm()) {
            return;
        }

        const result = await requestWithdraw(
            parseFloat(withdrawAmount),
            withdrawAddress,
            transactionPassword
        );

        if (!result.success) {
            toast({
                title: result?.message || "Withdraw Request Failed",
                description: result.error || "Failed to submit withdraw request",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Handle modal close
    const handleModalClose = () => {
        setWithdrawAmount("");
        setWithdrawAddress("");
        setTransactionPassword("");
        setFormErrors({});
        onClose();
    };

    // Calculate remaining amount
    const calculateRemainingAmount = () => {
        const amount = parseFloat(withdrawAmount) || 0;
        return Math.max(0, getAvailableBalance() - amount);
    };

    // Copy to clipboard function
    const copyToClipboard = async (text, label = "Text") => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: `${label} Copied!`,
                description: `${label} has been copied to your clipboard.`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } catch (err) {
            toast({
                title: "Copy Failed",
                description: "Failed to copy to clipboard.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <Box p={8} bg={useColorModeValue("gray.100", "gray.700")} minH="100vh">
            {/* Available Amount Section */}
            <Flex
                bg="#4a7b4c"
                color="white"
                justify="space-between"
                align="center"
                p={6}
                rounded="md"
                mb={6}
            >
                <Flex align="center">
                    <Box
                        bg="white"
                        p={4}
                        rounded="full"
                        mr={4}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon color={'black'} as={RepeatIcon} boxSize={6} />
                    </Box>
                    <Box>
                        <Box color={'white'} fontSize="sm">Available Amount</Box>
                        <Box color={'white'} fontSize="2xl" fontWeight="bold">
                            {isLoading ? <Spinner size="sm" /> : profile?.USER?.available_amount.toFixed(2)}
                        </Box>
                    </Box>
                </Flex>
                <Flex gap={2}>
                    <Button size="sm" colorScheme="green">
                        Enable
                    </Button>
                    <Button
                        colorScheme="teal"
                        leftIcon={<FaWallet />}
                        onClick={onOpen}
                    // isDisabled={isLoading || getAvailableBalance() <= 0}
                    >
                        Withdraw Now
                    </Button>
                </Flex>
            </Flex>

            {/* Stat Cards */}
            <Flex gap={4} mb={6} flexWrap="wrap">
                <Box
                    flex="1"
                    minW="260px"
                    bg="white"
                    p={4}
                    border="2px solid rgb(173, 224, 174)"
                    rounded="md"
                    boxShadow="md"
                >
                    <Flex align="center" mb={2}>
                        <Box
                            bg="gray.100"
                            rounded="full"
                            p={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                        >
                            <Icon as={BsCardChecklist} boxSize={6} color="gray.600" />
                        </Box>
                        <Box>
                            <Box fontSize="sm">Total Income</Box>
                            <Box fontSize="xl" fontWeight="bold">
                                {isLoading ? <Spinner size="sm" /> : profile?.USER?.total_income.toFixed(2)}
                            </Box>
                        </Box>
                    </Flex>
                </Box>

                <Box
                    flex="1"
                    minW="260px"
                    bg="white"
                    p={4}
                    border="2px solid rgb(173, 224, 174)"
                    rounded="md"
                    boxShadow="md"
                >
                    <Flex align="center" mb={2}>
                        <Box
                            bg="green.100"
                            rounded="full"
                            p={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                        >
                            <Icon as={FaHandHoldingUsd} boxSize={6} color="green.600" />
                        </Box>
                        <Box>
                            <Box fontSize="sm">Withdraw Amount</Box>
                            <Box fontSize="xl" fontWeight="bold">
                                {isLoading ? <Spinner size="sm" /> : profile?.USER?.withdraw_amount.toFixed(2)}
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            {/* Withdraw History */}
            <Box bg="white" p={6} rounded="xl" shadow="lg" border="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                {/* Header */}
                <Flex justify="space-between" align="center" mb={6}>
                    <HStack spacing={3}>
                        <Icon as={AiOutlineHistory} boxSize={6} color="blue.500" />
                        <Heading size="md" color={useColorModeValue("gray.700", "gray.200")}>
                            Withdraw History
                        </Heading>
                    </HStack>
                    <HStack spacing={2}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Filter options"
                                icon={<FaFilter />}
                                variant="outline"
                                size="sm"
                            />
                            <MenuList>
                                <MenuItem>All Transactions</MenuItem>
                                <MenuItem>Successful</MenuItem>
                                <MenuItem>Pending</MenuItem>
                                <MenuItem>Failed</MenuItem>
                                <MenuItem>Last 30 days</MenuItem>
                            </MenuList>
                        </Menu>
                        <IconButton
                            aria-label="Download history"
                            icon={<FaDownload />}
                            variant="outline"
                            size="sm"
                        />
                    </HStack>
                </Flex>

                {/* Loading State */}
                {isLoading ? (
                    <Center py={12}>
                        <VStack spacing={4}>
                            <Spinner size="xl" color="blue.500" thickness="4px" />
                            <Text color="gray.600" fontSize="lg">Loading withdraw history...</Text>
                        </VStack>
                    </Center>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <Box display={{ base: "none", lg: "block" }}>
                            <TableContainer>
                                <Table variant="simple" size="md">
                                    <Thead bg={useColorModeValue("gray.50", "gray.700")}>
                                        <Tr>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineTransaction} boxSize={4} />
                                                    <Text>Transaction</Text>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineDollarCircle} boxSize={4} />
                                                    <Text>Amount</Text>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={MdOutlinePayment} boxSize={4} />
                                                    <Text>Payment</Text>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineBank} boxSize={4} />
                                                    <Text>Addresses</Text>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineCalendar} boxSize={4} />
                                                    <Text>Date & Status</Text>
                                                </HStack>
                                            </Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {withdrawHistory && withdrawHistory.length > 0 ? (
                                            withdrawHistory.map((withdraw, index) => (
                                                <Tr key={withdraw.id || index} _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <Text fontWeight="bold" color={useColorModeValue("gray.800", "gray.200")}>
                                                                #{withdraw.id || index + 1}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                {withdraw.txn_hash ?
                                                                    `${withdraw.txn_hash.substring(0, 8)}...${withdraw.txn_hash.substring(withdraw.txn_hash.length - 6)}`
                                                                    : "N/A"
                                                                }
                                                            </Text>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <HStack>
                                                                <Icon as={MdTrendingDown} color="red.500" boxSize={4} />
                                                                <Text fontWeight="bold" color="red.500" fontSize="lg">
                                                                    -${withdraw.withdraw_amount || withdraw.amount || "0.00"}
                                                                </Text>
                                                            </HStack>
                                                            <Text fontSize="sm" color="gray.500">
                                                                Paid: ${withdraw.paid_amount || "0.00"}
                                                            </Text>
                                                            <Text fontSize="sm" color="orange.500">
                                                                Fee: ${withdraw.fees_deduction || "0.00"}
                                                            </Text>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <Text fontSize="sm" color="gray.600">
                                                                Available: ${withdraw.available_amount || "N/A"}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.600">
                                                                Remaining: ${withdraw.remain_amount || "N/A"}
                                                            </Text>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={1}>
                                                            <HStack>
                                                                <Text fontSize="xs" color="gray.500">From:</Text>
                                                                <Text fontSize="xs" fontFamily="mono">
                                                                    {withdraw.from_address ?
                                                                        `${withdraw.from_address.substring(0, 6)}...${withdraw.from_address.substring(withdraw.from_address.length - 4)}`
                                                                        : "N/A"
                                                                    }
                                                                </Text>
                                                                {withdraw.from_address && (
                                                                    <IconButton
                                                                        aria-label="Copy from address"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.from_address, "From Address")}
                                                                    />
                                                                )}
                                                            </HStack>
                                                            <HStack>
                                                                <Text fontSize="xs" color="gray.500">To:</Text>
                                                                <Text fontSize="xs" fontFamily="mono">
                                                                    {withdraw.to_address ?
                                                                        `${withdraw.to_address.substring(0, 6)}...${withdraw.to_address.substring(withdraw.to_address.length - 4)}`
                                                                        : "N/A"
                                                                    }
                                                                </Text>
                                                                {withdraw.to_address && (
                                                                    <IconButton
                                                                        aria-label="Copy to address"
                                                                        icon={<CopyIcon />}
                                                                        size="xs"
                                                                        variant="ghost"
                                                                        onClick={() => copyToClipboard(withdraw.to_address, "To Address")}
                                                                    />
                                                                )}
                                                            </HStack>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <VStack align="start" spacing={2}>
                                                            <Text fontSize="sm" color="gray.600">
                                                                {withdraw.date_time || "N/A"}
                                                            </Text>
                                                            <Badge
                                                                colorScheme={
                                                                    withdraw.status === "success" ? "green" :
                                                                        withdraw.status === "pending" ? "yellow" :
                                                                            withdraw.status === "failed" ? "red" : "gray"
                                                                }
                                                                variant="subtle"
                                                                px={3}
                                                                py={1}
                                                                borderRadius="full"
                                                            >
                                                                {typeof withdraw.status === "string"
                                                                    ? withdraw.status.charAt(0).toUpperCase() + withdraw.status.slice(1)
                                                                    : "Pending"}
                                                            </Badge>
                                                        </VStack>
                                                    </Td>
                                                    <Td>
                                                        <Menu>
                                                            <MenuButton
                                                                as={IconButton}
                                                                aria-label="More options"
                                                                icon={<BsThreeDotsVertical />}
                                                                variant="ghost"
                                                                size="sm"
                                                            />
                                                            <MenuList>
                                                                <MenuItem icon={<FaEye />}>View Details</MenuItem>
                                                                <MenuItem icon={<CopyIcon />}>Copy Transaction ID</MenuItem>
                                                                <MenuItem icon={<ExternalLinkIcon />}>View on Explorer</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan={6} textAlign="center" py={12}>
                                                    <VStack spacing={4}>
                                                        <Icon as={AiOutlineHistory} boxSize={16} color="gray.300" />
                                                        <Text color="gray.500" fontSize="lg">No withdraw history found</Text>
                                                        <Text color="gray.400" fontSize="sm">Your withdrawal transactions will appear here</Text>
                                                    </VStack>
                                                </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Mobile Card View */}
                        <Box display={{ base: "block", lg: "none" }}>
                            {withdrawHistory && withdrawHistory.length > 0 ? (
                                <VStack spacing={4}>
                                    {withdrawHistory.map((withdraw, index) => (
                                        <Card key={withdraw.id || index} w="full" variant="outline" bg={useColorModeValue("white", "gray.800")}>
                                            <CardHeader pb={2}>
                                                <Flex justify="space-between" align="center">
                                                    <HStack spacing={3}>
                                                        <Avatar
                                                            size="sm"
                                                            bg={
                                                                withdraw.status === "success" ? "green.500" :
                                                                    withdraw.status === "pending" ? "yellow.500" :
                                                                        withdraw.status === "failed" ? "red.500" : "gray.500"
                                                            }
                                                            icon={<Icon as={MdOutlineReceipt} color="white" />}
                                                        />
                                                        <Box>
                                                            <Text fontWeight="bold" fontSize="lg">
                                                                #{withdraw.id || index + 1}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                {withdraw.date_time || "N/A"}
                                                            </Text>
                                                        </Box>
                                                    </HStack>
                                                    <Badge
                                                        colorScheme={
                                                            withdraw.status === "success" ? "green" :
                                                                withdraw.status === "pending" ? "yellow" :
                                                                    withdraw.status === "failed" ? "red" : "gray"
                                                        }
                                                        variant="subtle"
                                                        px={3}
                                                        py={1}
                                                        borderRadius="full"
                                                    >
                                                        {typeof withdraw.status === "string"
                                                            ? withdraw.status.charAt(0).toUpperCase() + withdraw.status.slice(1)
                                                            : "Pending"}
                                                    </Badge>
                                                </Flex>
                                            </CardHeader>
                                            <CardBody pt={0}>
                                                <VStack spacing={4} align="stretch">
                                                    {/* Amount Section */}
                                                    <Box p={4} bg={useColorModeValue("red.50", "red.900")} borderRadius="lg">
                                                        <HStack justify="space-between" mb={2}>
                                                            <HStack>
                                                                <Icon as={MdTrendingDown} color="red.500" boxSize={5} />
                                                                <Text fontSize="sm" color="gray.600">Withdraw Amount</Text>
                                                            </HStack>
                                                            <Text fontWeight="bold" color="red.500" fontSize="lg">
                                                                -${withdraw.withdraw_amount || withdraw.amount || "0.00"}
                                                            </Text>
                                                        </HStack>
                                                        <SimpleGrid columns={2} spacing={2}>
                                                            <Box>
                                                                <Text fontSize="xs" color="gray.500">Paid Amount</Text>
                                                                <Text fontSize="sm" fontWeight="semibold">${withdraw.paid_amount || "0.00"}</Text>
                                                            </Box>
                                                            <Box>
                                                                <Text fontSize="xs" color="gray.500">Fees</Text>
                                                                <Text fontSize="sm" fontWeight="semibold" color="orange.500">
                                                                    ${withdraw.fees_deduction || "0.00"}
                                                                </Text>
                                                            </Box>
                                                        </SimpleGrid>
                                                    </Box>

                                                    {/* Balance Section */}
                                                    <SimpleGrid columns={2} spacing={4}>
                                                        <Box>
                                                            <Text fontSize="xs" color="gray.500" mb={1}>Available Amount</Text>
                                                            <Text fontSize="sm" fontWeight="semibold">${withdraw.available_amount || "N/A"}</Text>
                                                        </Box>
                                                        <Box>
                                                            <Text fontSize="xs" color="gray.500" mb={1}>Remaining Amount</Text>
                                                            <Text fontSize="sm" fontWeight="semibold">${withdraw.remain_amount || "N/A"}</Text>
                                                        </Box>
                                                    </SimpleGrid>

                                                    {/* Address Section */}
                                                    <Box>
                                                        <Text fontSize="xs" color="gray.500" mb={2}>Transaction Details</Text>
                                                        <VStack spacing={2} align="stretch">
                                                            <HStack justify="space-between">
                                                                <Text fontSize="xs" color="gray.600">From:</Text>
                                                                <HStack>
                                                                    <Text fontSize="xs" fontFamily="mono">
                                                                        {withdraw.from_address ?
                                                                            `${withdraw.from_address.substring(0, 8)}...${withdraw.from_address.substring(withdraw.from_address.length - 6)}`
                                                                            : "N/A"
                                                                        }
                                                                    </Text>
                                                                    {withdraw.from_address && (
                                                                        <IconButton
                                                                            aria-label="Copy from address"
                                                                            icon={<CopyIcon />}
                                                                            size="xs"
                                                                            variant="ghost"
                                                                            onClick={() => copyToClipboard(withdraw.from_address, "From Address")}
                                                                        />
                                                                    )}
                                                                </HStack>
                                                            </HStack>
                                                            <HStack justify="space-between">
                                                                <Text fontSize="xs" color="gray.600">To:</Text>
                                                                <HStack>
                                                                    <Text fontSize="xs" fontFamily="mono">
                                                                        {withdraw.to_address ?
                                                                            `${withdraw.to_address.substring(0, 8)}...${withdraw.to_address.substring(withdraw.to_address.length - 6)}`
                                                                            : "N/A"
                                                                        }
                                                                    </Text>
                                                                    {withdraw.to_address && (
                                                                        <IconButton
                                                                            aria-label="Copy to address"
                                                                            icon={<CopyIcon />}
                                                                            size="xs"
                                                                            variant="ghost"
                                                                            onClick={() => copyToClipboard(withdraw.to_address, "To Address")}
                                                                        />
                                                                    )}
                                                                </HStack>
                                                            </HStack>
                                                            <HStack justify="space-between">
                                                                <Text fontSize="xs" color="gray.600">Txn Hash:</Text>
                                                                <HStack>
                                                                    <Text fontSize="xs" fontFamily="mono">
                                                                        {withdraw.txn_hash ?
                                                                            `${withdraw.txn_hash.substring(0, 8)}...${withdraw.txn_hash.substring(withdraw.txn_hash.length - 6)}`
                                                                            : "N/A"
                                                                        }
                                                                    </Text>
                                                                    {withdraw.txn_hash && (
                                                                        <IconButton
                                                                            aria-label="Copy transaction hash"
                                                                            icon={<ExternalLinkIcon />}
                                                                            size="xs"
                                                                            variant="ghost"
                                                                        />
                                                                    )}
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>
                                                    </Box>

                                                    {/* Action Buttons */}
                                                    <HStack spacing={2} pt={2}>
                                                        <Button size="xs" variant="outline" leftIcon={<FaEye />} flex={1}>
                                                            View Details
                                                        </Button>
                                                        <Button size="xs" variant="outline" leftIcon={<CopyIcon />} flex={1}>
                                                            Copy ID
                                                        </Button>
                                                    </HStack>
                                                </VStack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </VStack>
                            ) : (
                                <Center py={12}>
                                    <VStack spacing={4}>
                                        <Icon as={AiOutlineHistory} boxSize={16} color="gray.300" />
                                        <Text color="gray.500" fontSize="lg" textAlign="center">No withdraw history found</Text>
                                        <Text color="gray.400" fontSize="sm" textAlign="center">Your withdrawal transactions will appear here</Text>
                                        <Button colorScheme="blue" variant="outline" size="sm" leftIcon={<FaWallet />} onClick={onOpen}>
                                            Make First Withdrawal
                                        </Button>
                                    </VStack>
                                </Center>
                            )}
                        </Box>
                    </>
                )}
            </Box>

            {/* Withdraw Modal */}
            <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Withdraw Request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Show errors */}
                        {error && (
                            <Alert status="error" fontSize="sm" rounded="md" mb={3}>
                                <AlertIcon />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <FormControl mb={3} isInvalid={formErrors.amount}>
                            <FormLabel>Amount</FormLabel>
                            <Input
                                placeholder="Enter amount"
                                type="number"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                step="0.001"
                                min="0"
                                max={getAvailableBalance()}
                            />
                            {formErrors.amount && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {formErrors.amount}
                                </Text>
                            )}
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel>Select Network</FormLabel>
                            <Input value="BEP 20" isReadOnly />
                        </FormControl>

                        {/* <FormControl mb={3} isInvalid={formErrors.address}>
              <FormLabel>Address</FormLabel>
              <Input 
                placeholder="Enter withdrawal address" 
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
              />
              {formErrors.address && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formErrors.address}
                </Text>
              )}
            </FormControl> */}

                        {/* <FormControl mb={3} isInvalid={formErrors.password}>
              <FormLabel>Transaction Password</FormLabel>
              <Input 
                placeholder="Enter transaction password" 
                type="password" 
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
              />
              {formErrors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formErrors.password}
                </Text>
              )}
            </FormControl> */}

                        <Text fontWeight="bold" fontSize="sm">
                            Available Amount:
                            <Text as="span" fontWeight="normal"> {getAvailableBalance().toFixed(3)}</Text>
                        </Text>
                        <Text fontWeight="bold" fontSize="sm" mb={2}>
                            Remaining Amount:
                            <Text as="span" fontWeight="normal"> {calculateRemainingAmount().toFixed(3)}</Text>
                        </Text>

                        <Alert status="warning" fontSize="sm" rounded="md" mb={2}>
                            <AlertIcon />
                            <AlertDescription>
                                Please double-check the withdrawal address before proceeding. Transactions are irreversible!
                            </AlertDescription>
                        </Alert>
                    </ModalBody>

                    <ModalFooter>
                        <Flex gap={2} w="full">
                            <Button variant="outline" onClick={handleModalClose} flex={1}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={handleWithdrawRequest}
                                isLoading={withdrawing}
                                loadingText="Processing..."
                                flex={1}
                            >
                                Confirm Withdraw
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default WithdrawScreen;
