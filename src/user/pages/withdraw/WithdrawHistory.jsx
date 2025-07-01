import React, { useState, useMemo } from "react";
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
    VStack,
    HStack,
    Card,
    CardBody,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Spinner,
    useToast,
    Link,
    Select,
    Stack
} from "@chakra-ui/react";
import { RepeatIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaEye, FaFilter, FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdTrendingDown } from "react-icons/md";
import {
    STATUS_COLORS,
    STATUS_LABELS
} from "./constants";

const WithdrawHistory = ({
    withdrawHistory = [],
    isLoading = false,
    showFullHistory = false,
    onViewAll
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterStatus, setFilterStatus] = useState('all');

    const toast = useToast();

    // Color mode values
    const cardBgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const tableHoverColor = useColorModeValue("gray.50", "gray.600");
    const theadBgColor = useColorModeValue("gray.50", "gray.700");
    const thColor = useColorModeValue("gray.600", "gray.300");
    const fontColor = useColorModeValue("gray.800", "gray.200");

    // Copy to clipboard function
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: `${label} Copied`,
                description: "Address copied to clipboard",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        });
    };

    // Filter and sort data
    const filteredAndSortedData = useMemo(() => {
        let filtered = [...withdrawHistory];

        // Filter by status
        if (filterStatus !== 'all') {
            filtered = filtered.filter(item => item.status === filterStatus);
        }

        // Sort data
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'amount':
                    aValue = parseFloat(a.withdraw_amount || a.amount || 0);
                    bValue = parseFloat(b.withdraw_amount || b.amount || 0);
                    break;
                case 'date':
                    aValue = new Date(a.date_time || a.created_at || 0);
                    bValue = new Date(b.date_time || b.created_at || 0);
                    break;
                case 'status':
                    aValue = a.status || '';
                    bValue = b.status || '';
                    break;
                default:
                    aValue = a.id || 0;
                    bValue = b.id || 0;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    }, [withdrawHistory, filterStatus, sortBy, sortOrder]);

    // Pagination logic
    const paginatedData = useMemo(() => {
        if (!showFullHistory) {
            // For withdraw screen, show only first 10 items
            return filteredAndSortedData.slice(0, 10);
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAndSortedData.slice(startIndex, endIndex);
    }, [filteredAndSortedData, currentPage, itemsPerPage, showFullHistory]);

    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const totalItems = filteredAndSortedData.length;

    // Pagination handlers
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(parseInt(newItemsPerPage));
        setCurrentPage(1);
    };

    // Export data function
    const handleExport = () => {
        const csvContent = [
            ['ID', 'Amount', 'Status', 'Date', 'From Address', 'To Address', 'Txn Hash'],
            ...paginatedData.map(withdraw => [
                withdraw.id || '',
                withdraw.withdraw_amount || withdraw.amount || '',
                withdraw.status || '',
                withdraw.date_time || '',
                withdraw.from_address || '',
                withdraw.to_address || '',
                withdraw.txn_hash || ''
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `withdraw-history-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        buttons.push(
            <IconButton
                key="prev"
                icon={<FaChevronLeft />}
                size="sm"
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                aria-label="Previous page"
            />
        );

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i ? "solid" : "outline"}
                    colorScheme={currentPage === i ? "blue" : "gray"}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Button>
            );
        }

        // Next button
        buttons.push(
            <IconButton
                key="next"
                icon={<FaChevronRight />}
                size="sm"
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                aria-label="Next page"
            />
        );

        return buttons;
    };

    return (
        <Card bg={cardBgColor} border="1px" borderColor={borderColor} boxShadow="md">
            <CardBody>
                <Flex justify="space-between" align="center" mb={4}>
                    <Text fontSize="lg" fontWeight="bold" color={fontColor}>
                        {showFullHistory ? 'All Withdrawal History' : 'Withdrawal History'}
                    </Text>
                    <HStack spacing={2}>
                        {showFullHistory && (
                            <>
                                <Select
                                    size="sm"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    w="120px"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                                <Select
                                    size="sm"
                                    value={`${sortBy}-${sortOrder}`}
                                    onChange={(e) => {
                                        const [field, order] = e.target.value.split('-');
                                        setSortBy(field);
                                        setSortOrder(order);
                                    }}
                                    w="140px"
                                >
                                    <option value="date-desc">Latest First</option>
                                    <option value="date-asc">Oldest First</option>
                                    <option value="amount-desc">Amount High-Low</option>
                                    <option value="amount-asc">Amount Low-High</option>
                                    <option value="status-asc">Status A-Z</option>
                                </Select>
                            </>
                        )}
                        <IconButton
                            icon={<FaFilter />}
                            size="sm"
                            variant="outline"
                            aria-label="Filter"
                        />
                        <IconButton
                            icon={<FaDownload />}
                            size="sm"
                            variant="outline"
                            aria-label="Download"
                            onClick={handleExport}
                        />
                        {!showFullHistory && totalItems > 10 && (
                            <Button
                                size="sm"
                                colorScheme="blue"
                                variant="outline"
                                onClick={onViewAll}
                            >
                                View All ({totalItems})
                            </Button>
                        )}
                    </HStack>
                </Flex>

                {/* Summary Stats for Full History */}
                {showFullHistory && (
                    <Flex justify="space-between" align="center" mb={4} p={3} bg={theadBgColor} borderRadius="md">
                        <Text fontSize="sm" color={textColor}>
                            Showing {paginatedData.length} of {totalItems} transactions
                        </Text>
                        <HStack spacing={4}>
                            <Text fontSize="sm" color={textColor}>
                                Items per page:
                            </Text>
                            <Select
                                size="sm"
                                value={itemsPerPage}
                                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                                w="80px"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Select>
                        </HStack>
                    </Flex>
                )}

                <TableContainer>
                    <Table variant="simple" size="sm">
                        <Thead bg={theadBgColor}>
                            <Tr>
                                <Th color={thColor}>Transaction</Th>
                                <Th color={thColor}>Amount</Th>
                                <Th color={thColor}>Balance</Th>
                                <Th color={thColor}>Addresses</Th>
                                <Th color={thColor}>Date & Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isLoading ? (
                                <Tr>
                                    <Td colSpan={6} textAlign="center" py={8}>
                                        <Spinner />
                                    </Td>
                                </Tr>
                            ) : paginatedData && paginatedData.length > 0 ? (
                                paginatedData.map((withdraw, index) => (
                                    <Tr key={withdraw.id || index} _hover={{ bg: tableHoverColor }}>
                                        <Td>
                                            <VStack align="start" spacing={1}>
                                                <Text fontWeight="bold" color={fontColor}>
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
                                                    colorScheme={STATUS_COLORS[withdraw.status] || "gray"}
                                                    variant="subtle"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    textTransform="capitalize"
                                                >
                                                    {STATUS_LABELS[withdraw.status] || withdraw.status || "Unknown"}
                                                </Badge>
                                            </VStack>
                                        </Td>
                                        <Td>
                                            <Menu>
                                                <MenuButton
                                                    as={IconButton}
                                                    icon={<BsThreeDotsVertical />}
                                                    variant="ghost"
                                                    size="sm"
                                                />
                                                <MenuList>
                                                    <MenuItem icon={<FaEye />}>
                                                        View Details
                                                    </MenuItem>
                                                    {withdraw.txn_hash && (
                                                        <MenuItem
                                                            icon={<ExternalLinkIcon />}
                                                            onClick={() => window.open(`https://bscscan.com/tx/${withdraw.txn_hash}`, '_blank')}
                                                        >
                                                            View on BSCScan
                                                        </MenuItem>
                                                    )}
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={6} textAlign="center" py={8}>
                                        <Box color="gray.500">
                                            No withdrawal history found
                                        </Box>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>

                {/* Pagination for Full History */}
                {showFullHistory && totalPages > 1 && (
                    <Flex justify="space-between" align="center" mt={4} pt={4} borderTop="1px" borderColor={borderColor}>
                        <Text fontSize="sm" color={textColor}>
                            Page {currentPage} of {totalPages}
                        </Text>
                        <HStack spacing={1}>
                            {renderPaginationButtons()}
                        </HStack>
                    </Flex>
                )}
            </CardBody>
        </Card>
    );
};

export default WithdrawHistory;