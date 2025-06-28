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
    FiCreditCard,
    FiShield,
    FiCheckCircle,
    FiAlertTriangle,
    FiRefreshCw,
    FiArrowRight,
    FiDollarSign,
    FiTrendingUp,
} from "react-icons/fi";
import { MdWallet } from "react-icons/md";
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
import { useWeb3 } from "../../Context/Web3Context";
import WalletModal from "../../Components/WalletModal";
import WalletStatus from "../../Components/WalletStatus";
import { useAccount, useUser } from "../../Context";

const DepositForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isWalletModalOpen, onOpen: onWalletModalOpen, onClose: onWalletModalClose } = useDisclosure();
    const { isOpen: isConfirmModalOpen, onOpen: onConfirmModalOpen, onClose: onConfirmModalClose } = useDisclosure();
    const [depositAmount, setDepositAmount] = useState("");
    const [depositAddress, setDepositAddress] = useState("0x742d35Cc6634C0532925a3b8D1d8C4C47F4b58b6");
    const [transactionPassword, setTransactionPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [asset, setAsset] = useState("USDT");
    const { startDeposit, startDepositData } = useAccount();
    const [depositType, setDepositType] = useState("wallet"); // Default to Wallet

    const toast = useToast();

    // Use Web3 Context
    const {
        isConnected,
        account,
        usdtBalance,
        sendUSDT,
        chainId,
    } = useWeb3();
    const { profile } = useUser();
    console.log("startdeosit:", startDepositData);
    console.log("Profile:", profile);

    // Mock deposit data - replace with real data from your context
    const [isLoading, setIsLoading] = useState(false);
    const [depositHistory, setDepositHistory] = useState([
        {
            id: 1,
            deposit_asset: "USDT",
            deposit_amount: "100.00",
            deposit_type: "Wallet",
            from_address: "0x742d35Cc6634C0532925a3b8D1d8C4C47F4b58b6",
            to_address: "0x7015AFc4BF82598C85AF2C2B5C5C8BFA2548C9F",
            txn_hash: "0xabc123def456789",
            date_time: "2025-01-15 14:30:00",
            status: "completed"
        },
        {
            id: 2,
            deposit_asset: "USDT",
            deposit_amount: "0",
            deposit_type: "Gateway",
            from_address: "NA",
            to_address: "0x7015AFc4BF82598C85AF2C2B5C5C8BFA2548C9F",
            txn_hash: "NA",
            date_time: "2025-06-26 11:19:19",
            status: "pending"
        }
    ]);
    const handleDeposite = async (type) => {
        setDepositType(type);
        const dto = {
            deposit_amount: depositAmount,
            deposit_asset: asset,
            deposit_type: type,
        }
        if (type === "wallet") {

            const response = await startDeposit(dto);
            console.log("Deposit response:", response);
            onWalletModalOpen();
        } else {
            const response = await startDeposit(dto);
            console.log("Deposit response:", response);
        }
    }

    // Load deposit data on component mount
    useEffect(() => {
        // You can add your refresh deposit data function here
        setIsLoading(false);
    }, []);

    // Form validation
    const validateForm = () => {
        const errors = {};

        if (!depositAmount || parseFloat(depositAmount) <= 0) {
            errors.amount = "Please enter a valid deposit amount";
        } else if (isConnected && parseFloat(depositAmount) > parseFloat(usdtBalance)) {
            errors.amount = "Amount exceeds available balance";
        }

        if (!depositAddress) {
            errors.address = "Please enter a deposit address";
        }



        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle deposit request
    const handleDepositRequest = async () => {
        if (!validateForm()) {
            return;
        }

        if (isConnected) {
            // Use Web3 deposit
            try {
                setIsProcessing(true);

                const result = await sendUSDT(depositAddress, depositAmount);

                if (result.success) {
                    toast({
                        title: "Deposit Successful!",
                        description: `Successfully deposited ${depositAmount} USDT`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });

                    // Reset form
                    setDepositAmount("");
                    setDepositAddress("");
                    setTransactionPassword("");
                    setFormErrors({});
                    onClose();

                } else {
                    throw new Error(result.error);
                }

            } catch (error) {
                toast({
                    title: "Deposit Failed",
                    description: error.message || "Failed to process deposit",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsProcessing(false);
            }
        } else {
            // Handle gateway deposit or other methods
            toast({
                title: "Deposit Request Submitted",
                description: "Your deposit request has been submitted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Reset form
            setDepositAmount("");
            setDepositAddress("");
            setTransactionPassword("");
            setFormErrors({});
            onClose();
        }
    };

    // Handle modal close
    const handleModalClose = () => {
        setDepositAmount("");
        setDepositAddress("");
        setTransactionPassword("");
        setFormErrors({});
        onClose();
    };

    // Handle wallet deposit from confirmation modal
    const handleWalletDeposit = async () => {
        try {
            setIsProcessing(true);

            const result = await sendUSDT(depositAddress, depositAmount);

            if (result.success) {
                toast({
                    title: "Deposit Successful!",
                    description: `Successfully deposited ${depositAmount} USDT`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Reset form
                setDepositAmount("");
                setDepositAddress("");
                setTransactionPassword("");
                setFormErrors({});
                onClose();
                onConfirmModalClose();

            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            toast({
                title: "Deposit Failed",
                description: error.message || "Failed to process deposit",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsProcessing(false);
        }
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
                        <Box color={'white'} fontSize="sm">Available Balance</Box>
                        <Box color={'white'} fontSize="2xl" fontWeight="bold">
                            {isLoading ? <Spinner size="sm" /> : (isConnected ? parseFloat(usdtBalance).toFixed(2) : profile?.USER?.available_amount?.toFixed(2) || "0.00")}
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
                    >
                        Deposit Now
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
                                {isLoading ? <Spinner size="sm" /> : profile?.USER?.total_income?.toFixed(2) || "0.00"}
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
                            bg="blue.100"
                            rounded="full"
                            p={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                        >
                            <Icon as={FaHandHoldingUsd} boxSize={6} color="blue.600" />
                        </Box>
                        <Box>
                            <Box fontSize="sm">Total Deposit</Box>
                            <Box fontSize="xl" fontWeight="bold">
                                {isLoading ? <Spinner size="sm" /> : profile?.USER?.deposit_amount?.toFixed(2) || "0.00"}
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            {/* Deposit History */}
            <Box bg="white" p={6} rounded="xl" shadow="lg" border="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                {/* Header */}
                <Flex justify="space-between" align="center" mb={6}>
                    <HStack spacing={3}>
                        <Icon as={AiOutlineHistory} boxSize={6} color="blue.500" />
                        <Heading size="md" color={useColorModeValue("gray.700", "gray.200")}>
                            Deposit History
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
                            <Text color="gray.600" fontSize="lg">Loading deposit history...</Text>
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
                                                    <Box>Transaction</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineDollarCircle} boxSize={4} />
                                                    <Box>Deposit Asset</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={MdOutlinePayment} boxSize={4} />
                                                    <Box>Deposit Amount</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineBank} boxSize={4} />
                                                    <Box>Deposit Type</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineBank} boxSize={4} />
                                                    <Box>From Address</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineBank} boxSize={4} />
                                                    <Box>To Address</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineTransaction} boxSize={4} />
                                                    <Box>Txn Hash</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                <HStack spacing={2}>
                                                    <Icon as={AiOutlineCalendar} boxSize={4} />
                                                    <Box>Date Time</Box>
                                                </HStack>
                                            </Th>
                                            <Th color={useColorModeValue("gray.600", "gray.300")} fontWeight="semibold">
                                                Status
                                            </Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {depositHistory && depositHistory.length > 0 ? (
                                            depositHistory.map((deposit, index) => (
                                                <Tr key={deposit.id || index} _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}>
                                                    <Td fontWeight="bold">#{deposit.id || index + 1}</Td>
                                                    <Td>{deposit.deposit_asset || "N/A"}</Td>
                                                    <Td>
                                                        <HStack>
                                                            <Icon as={MdTrendingUp} color="green.500" boxSize={4} />
                                                            <Text fontWeight="bold" color="green.500">
                                                                +${deposit.deposit_amount || "0.00"}
                                                            </Text>
                                                        </HStack>
                                                    </Td>
                                                    <Td>{deposit.deposit_type || "N/A"}</Td>
                                                    <Td>
                                                        <HStack>
                                                            <Text fontSize="sm" fontFamily="mono">
                                                                {deposit.from_address && deposit.from_address !== "NA" ?
                                                                    `${deposit.from_address.substring(0, 6)}...${deposit.from_address.substring(deposit.from_address.length - 4)}`
                                                                    : "N/A"
                                                                }
                                                            </Text>
                                                            {deposit.from_address && deposit.from_address !== "NA" && (
                                                                <IconButton
                                                                    aria-label="Copy from address"
                                                                    icon={<CopyIcon />}
                                                                    size="xs"
                                                                    variant="ghost"
                                                                    onClick={() => copyToClipboard(deposit.from_address, "From Address")}
                                                                />
                                                            )}
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Text fontSize="sm" fontFamily="mono">
                                                                {deposit.to_address ?
                                                                    `${deposit.to_address.substring(0, 6)}...${deposit.to_address.substring(deposit.to_address.length - 4)}`
                                                                    : "N/A"
                                                                }
                                                            </Text>
                                                            {deposit.to_address && (
                                                                <IconButton
                                                                    aria-label="Copy to address"
                                                                    icon={<CopyIcon />}
                                                                    size="xs"
                                                                    variant="ghost"
                                                                    onClick={() => copyToClipboard(deposit.to_address, "To Address")}
                                                                />
                                                            )}
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Text fontSize="sm" fontFamily="mono">
                                                                {deposit.txn_hash && deposit.txn_hash !== "NA" ?
                                                                    `${deposit.txn_hash.substring(0, 8)}...${deposit.txn_hash.substring(deposit.txn_hash.length - 6)}`
                                                                    : "N/A"
                                                                }
                                                            </Text>
                                                            {deposit.txn_hash && deposit.txn_hash !== "NA" && (
                                                                <IconButton
                                                                    aria-label="View transaction"
                                                                    icon={<ExternalLinkIcon />}
                                                                    size="xs"
                                                                    variant="ghost"
                                                                    onClick={() => window.open(`https://bscscan.com/tx/${deposit.txn_hash}`, '_blank')}
                                                                />
                                                            )}
                                                        </HStack>
                                                    </Td>
                                                    <Td>{deposit.date_time || "N/A"}</Td>
                                                    <Td>
                                                        <Badge
                                                            colorScheme={
                                                                deposit.status === "completed" ? "green" :
                                                                    deposit.status === "pending" ? "yellow" :
                                                                        deposit.status === "failed" ? "red" : "gray"
                                                            }
                                                            variant="subtle"
                                                            px={3}
                                                            py={1}
                                                            borderRadius="full"
                                                        >
                                                            {typeof deposit.status === "string"
                                                                ? deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)
                                                                : "Pending"}
                                                        </Badge>
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
                                                <Td colSpan={10} textAlign="center" py={12}>
                                                    <VStack spacing={4}>
                                                        <Icon as={AiOutlineHistory} boxSize={16} color="gray.300" />
                                                        <Text color="gray.500" fontSize="lg">No deposit history found</Text>
                                                        <Text color="gray.400" fontSize="sm">Your deposit transactions will appear here</Text>
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
                            {depositHistory && depositHistory.length > 0 ? (
                                <VStack spacing={4}>
                                    {depositHistory.map((deposit, index) => (
                                        <Card key={deposit.id || index} w="full" variant="outline" bg={useColorModeValue("white", "gray.800")}>
                                            <CardHeader pb={2}>
                                                <Flex justify="space-between" align="center">
                                                    <HStack spacing={3}>
                                                        <Avatar
                                                            size="sm"
                                                            bg={
                                                                deposit.status === "completed" ? "green.500" :
                                                                    deposit.status === "pending" ? "yellow.500" :
                                                                        deposit.status === "failed" ? "red.500" : "gray.500"
                                                            }
                                                            icon={<Icon as={MdOutlineReceipt} color="white" />}
                                                        />
                                                        <Box>
                                                            <Text fontWeight="bold" fontSize="lg">
                                                                #{deposit.id || index + 1}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                {deposit.date_time || "N/A"}
                                                            </Text>
                                                        </Box>
                                                    </HStack>
                                                    <Badge
                                                        colorScheme={
                                                            deposit.status === "completed" ? "green" :
                                                                deposit.status === "pending" ? "yellow" :
                                                                    deposit.status === "failed" ? "red" : "gray"
                                                        }
                                                        variant="subtle"
                                                        px={3}
                                                        py={1}
                                                        borderRadius="full"
                                                    >
                                                        {typeof deposit.status === "string"
                                                            ? deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)
                                                            : "Pending"}
                                                    </Badge>
                                                </Flex>
                                            </CardHeader>
                                            <CardBody pt={0}>
                                                <VStack spacing={4} align="stretch">
                                                    {/* Amount Section */}
                                                    <Box p={4} bg={useColorModeValue("green.50", "green.900")} borderRadius="lg">
                                                        <HStack justify="space-between" mb={2}>
                                                            <HStack>
                                                                <Icon as={MdTrendingUp} color="green.500" boxSize={5} />
                                                                <Text fontSize="sm" color="gray.600">Deposit Amount</Text>
                                                            </HStack>
                                                            <Text fontWeight="bold" color="green.500" fontSize="lg">
                                                                +${deposit.deposit_amount || "0.00"}
                                                            </Text>
                                                        </HStack>
                                                        <SimpleGrid columns={2} spacing={2}>
                                                            <Box>
                                                                <Text fontSize="xs" color="gray.500">Asset</Text>
                                                                <Text fontSize="sm" fontWeight="semibold">{deposit.deposit_asset || "N/A"}</Text>
                                                            </Box>
                                                            <Box>
                                                                <Text fontSize="xs" color="gray.500">Type</Text>
                                                                <Text fontSize="sm" fontWeight="semibold">
                                                                    {deposit.deposit_type || "N/A"}
                                                                </Text>
                                                            </Box>
                                                        </SimpleGrid>
                                                    </Box>

                                                    {/* Address Section */}
                                                    <Box>
                                                        <Text fontSize="xs" color="gray.500" mb={2}>Transaction Details</Text>
                                                        <VStack spacing={2} align="stretch">
                                                            <HStack justify="space-between">
                                                                <Text fontSize="xs" color="gray.600">From:</Text>
                                                                <HStack>
                                                                    <Text fontSize="xs" fontFamily="mono">
                                                                        {deposit.from_address && deposit.from_address !== "NA" ?
                                                                            `${deposit.from_address.substring(0, 8)}...${deposit.from_address.substring(deposit.from_address.length - 6)}`
                                                                            : "N/A"
                                                                        }
                                                                    </Text>
                                                                    {deposit.from_address && deposit.from_address !== "NA" && (
                                                                        <IconButton
                                                                            aria-label="Copy from address"
                                                                            icon={<CopyIcon />}
                                                                            size="xs"
                                                                            variant="ghost"
                                                                            onClick={() => copyToClipboard(deposit.from_address, "From Address")}
                                                                        />
                                                                    )}
                                                                </HStack>
                                                            </HStack>
                                                            <HStack justify="space-between">
                                                                <Text fontSize="xs" color="gray.600">To:</Text>
                                                                <HStack>
                                                                    <Text fontSize="xs" fontFamily="mono">
                                                                        {deposit.to_address ?
                                                                            `${deposit.to_address.substring(0, 8)}...${deposit.to_address.substring(deposit.to_address.length - 6)}`
                                                                            : "N/A"
                                                                        }
                                                                    </Text>
                                                                    {deposit.to_address && (
                                                                        <IconButton
                                                                            aria-label="Copy to address"
                                                                            icon={<CopyIcon />}
                                                                            size="xs"
                                                                            variant="ghost"
                                                                            onClick={() => copyToClipboard(deposit.to_address, "To Address")}
                                                                        />
                                                                    )}
                                                                </HStack>
                                                            </HStack>
                                                            <HStack justify="space-between">
                                                                <Text fontSize="xs" color="gray.600">Txn Hash:</Text>
                                                                <HStack>
                                                                    <Text fontSize="xs" fontFamily="mono">
                                                                        {deposit.txn_hash && deposit.txn_hash !== "NA" ?
                                                                            `${deposit.txn_hash.substring(0, 8)}...${deposit.txn_hash.substring(deposit.txn_hash.length - 6)}`
                                                                            : "N/A"
                                                                        }
                                                                    </Text>
                                                                    {deposit.txn_hash && deposit.txn_hash !== "NA" && (
                                                                        <IconButton
                                                                            aria-label="View transaction hash"
                                                                            icon={<ExternalLinkIcon />}
                                                                            size="xs"
                                                                            variant="ghost"
                                                                            onClick={() => window.open(`https://bscscan.com/tx/${deposit.txn_hash}`, '_blank')}
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
                                        <Text color="gray.500" fontSize="lg" textAlign="center">No deposit history found</Text>
                                        <Text color="gray.400" fontSize="sm" textAlign="center">Your deposit transactions will appear here</Text>
                                        <Button colorScheme="blue" variant="outline" size="sm" leftIcon={<FaWallet />} onClick={onOpen}>
                                            Make First Deposit
                                        </Button>
                                    </VStack>
                                </Center>
                            )}
                        </Box>
                    </>
                )}
            </Box>

            {/* Deposit Modal */}
            <Modal isOpen={isOpen} onClose={handleModalClose} isCentered size="lg">
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent mx={4} borderRadius="xl" bg="white" shadow="2xl">
                    <ModalHeader>
                        <VStack spacing={2} align="start">
                            <HStack spacing={3}>
                                <Icon as={FiDollarSign} color="green.500" boxSize={6} />
                                <Box fontSize="xl" color={'gray.500'} fontWeight="bold">Make a Deposit</Box>
                            </HStack>
                            <Text fontSize="sm" color="gray.600" fontWeight="normal">
                                Enter amount and choose payment method
                            </Text>
                        </VStack>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <VStack spacing={6}>
                            {/* Network Status */}
                            {isConnected && (
                                <Alert
                                    status={chainId === '56' ? "success" : "warning"}
                                    borderRadius="lg"
                                    w="full"
                                >
                                    <AlertIcon />
                                    <AlertDescription>
                                        {chainId === '56'
                                            ? "Connected to BSC Mainnet - Ready to deposit"
                                            : "Please switch to BSC Mainnet to make deposits"
                                        }
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Asset & Network Info */}
                            <SimpleGrid columns={2} spacing={4} w="full">
                                <FormControl>
                                    <FormLabel fontSize="sm">Deposit Asset</FormLabel>
                                    <Input
                                        value="USDT"
                                        isReadOnly
                                        bg="gray.50"
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize="sm">Network</FormLabel>
                                    <Input
                                        value="BSC (BEP-20)"
                                        isReadOnly
                                        bg="gray.50"
                                        fontWeight="bold"
                                    />
                                </FormControl>
                            </SimpleGrid>

                            {/* Amount Input */}
                            <FormControl isRequired>
                                <FormLabel fontSize="sm">
                                    Deposit Amount
                                    {isConnected && (
                                        <Text as="span" fontSize="xs" color="gray.500" ml={2}>
                                            (Balance: {parseFloat(usdtBalance).toFixed(2)} USDT)
                                        </Text>
                                    )}
                                </FormLabel>
                                <Input
                                    placeholder="Enter amount in USDT"
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    size="lg"
                                    focusBorderColor="blue.400"
                                    isInvalid={formErrors.amount}
                                />
                                {formErrors.amount && (
                                    <Text fontSize="xs" color="red.500" mt={1}>
                                        {formErrors.amount}
                                    </Text>
                                )}
                            </FormControl>

                            {/* Deposit Address */}{
                                isConnected &&

                                <FormControl isRequired>
                                    <FormLabel fontSize="sm">Deposit Address</FormLabel>
                                    <HStack>
                                        <Input
                                            value={startDepositData?.data?.to_address}
                                            onChange={(e) => setDepositAddress(e.target.value)}
                                            placeholder="Enter deposit address"
                                            fontFamily="mono"
                                            fontSize="sm"
                                            isInvalid={formErrors.address}
                                        />
                                        <Tooltip label="Copy Address">
                                            <IconButton
                                                aria-label="Copy address"
                                                icon={<CopyIcon />}
                                                size="sm"
                                                onClick={() => navigator.clipboard.writeText(depositAddress)}
                                            />
                                        </Tooltip>
                                    </HStack>
                                    {formErrors.address && (
                                        <Text fontSize="xs" color="red.500" mt={1}>
                                            {formErrors.address}
                                        </Text>
                                    )}
                                </FormControl>
                            }

                            {/* Transaction Password */}
                            {/* <FormControl isRequired>
                                <FormLabel fontSize="sm">Transaction Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Enter transaction password"
                                    value={transactionPassword}
                                    onChange={(e) => setTransactionPassword(e.target.value)}
                                    isInvalid={formErrors.password}
                                />
                                {formErrors.password && (
                                    <Text fontSize="xs" color="red.500" mt={1}>
                                        {formErrors.password}
                                    </Text>
                                )}
                            </FormControl> */}

                            {/* <Divider /> */}

                            {/* Payment Methods */}
                            <VStack spacing={4} w="full">


                                {/* Wallet Payment */}
                                <Box w="full">
                                    {!isConnected ? (
                                        <Button
                                            colorScheme="blue"
                                            size="lg"
                                            w="full"
                                            leftIcon={<MdWallet />}
                                            onClick={() => handleDeposite('wallet')}
                                        >
                                            Connect Wallet to Pay
                                        </Button>
                                    ) : (
                                        <VStack spacing={3} w="full">
                                            <WalletStatus onConnect={onWalletModalOpen} size="lg" />

                                            <Button
                                                colorScheme="green"
                                                size="lg"
                                                w="full"
                                                leftIcon={<MdWallet />}
                                                onClick={handleDepositRequest}
                                                isDisabled={!depositAmount || parseFloat(depositAmount) <= 0 || !depositAddress || chainId !== '56'}
                                                rightIcon={<FiArrowRight />}
                                            >
                                                Pay with Wallet ({depositAmount || "0"} USDT)
                                            </Button>

                                            {chainId !== '56' && (
                                                <Text fontSize="xs" color="orange.500" textAlign="center">
                                                    Please switch to BSC Mainnet
                                                </Text>
                                            )}
                                        </VStack>
                                    )}
                                </Box>

                                <Box position="relative" w="full">
                                    <Divider />
                                    <Box
                                        position="absolute"
                                        left="50%"
                                        top="50%"
                                        transform="translate(-50%, -50%)"
                                        bg="white"
                                        px={3}
                                    >
                                        <Text fontSize="xs" color="gray.500">OR</Text>
                                    </Box>
                                </Box>

                                {/* Gateway Payment */}
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    w="full"
                                    leftIcon={<FiCreditCard />}
                                    variant="outline"
                                    onClick={() => handleDeposite('getway')}
                                    // onClick={handleDepositRequest}
                                    isLoading={isProcessing}
                                    loadingText="Processing..."
                                >
                                    Pay with Gateway
                                </Button>
                            </VStack>

                            {/* Security Notice */}
                            <Box
                                p={4}
                                bg="blue.50"
                                borderRadius="lg"
                                w="full"
                                border="1px"
                                borderColor="blue.200"
                            >
                                <HStack spacing={3}>
                                    <Icon as={FiShield} color="blue.500" />
                                    <Box fontSize="sm" color="blue.700">
                                        <strong>Secure:</strong> All transactions are secured by blockchain technology
                                    </Box>
                                </HStack>
                            </Box>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={handleModalClose} size="sm">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Wallet Connection Modal */}
            <WalletModal isOpen={isWalletModalOpen} onClose={onWalletModalClose} />

            {/* Deposit Confirmation Modal */}
            <Modal isOpen={isConfirmModalOpen} onClose={onConfirmModalClose} size="md" isCentered>
                <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
                <ModalContent mx={4}>
                    <ModalHeader>
                        <HStack spacing={3}>
                            <Icon as={FiCheckCircle} color="green.500" />
                            <Text>Confirm Deposit</Text>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Alert status="info" borderRadius="lg">
                                <AlertIcon />
                                <Box>
                                    <Box fontWeight="bold">Transaction Details</Box>
                                    <Box fontSize="sm">Please review before confirming</Box>
                                </Box>
                            </Alert>

                            <Box p={4} bg="gray.50" borderRadius="lg">
                                <VStack spacing={3} align="stretch">
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="gray.600">Amount:</Text>
                                        <Text fontWeight="bold">{depositAmount} USDT</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="gray.600">To Address:</Text>
                                        <Text fontSize="sm" fontFamily="mono">
                                            {depositAddress?.slice(0, 10)}...{depositAddress?.slice(-8)}
                                        </Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="gray.600">Network:</Text>
                                        <Text fontSize="sm">BSC (BEP-20)</Text>
                                    </HStack>
                                </VStack>
                            </Box>

                            <Alert status="warning" borderRadius="lg">
                                <AlertIcon />
                                <Box fontSize="sm">
                                    This transaction cannot be reversed. Please verify all details are correct.
                                </Box>
                            </Alert>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onConfirmModalClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="green"
                            onClick={handleWalletDeposit}
                            isLoading={isProcessing}
                            loadingText="Processing..."
                            leftIcon={<MdWallet />}
                        >
                            Confirm Deposit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DepositForm;