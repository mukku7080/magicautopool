import React from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaArrowLeft } from "react-icons/fa";
import { useAccount } from "../../Context/AccountContext";
import WithdrawHistory from "./withdraw/WithdrawHistory";
import { generateSampleWithdrawHistory } from "./withdraw/sampleData";

const WithdrawHistoryPage = () => {
    // Color mode values
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const textColor = useColorModeValue("gray.700", "gray.200");

    // Context hooks
    const {
        withdrawHistory,
        isLoading,
    } = useAccount() || {};

    // Generate sample data for testing if no real data available
    const sampleWithdrawHistory = generateSampleWithdrawHistory(25);
    const displayWithdrawHistory = withdrawHistory && withdrawHistory.length > 0 ? withdrawHistory : sampleWithdrawHistory;

    return (
        <Box bg={bgColor} minH="100vh" p={{ base: 4, md: 6 }}>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={2}>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={RouterLink} to="/user/dashboard" color={textColor}>
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={RouterLink} to="/user/withdraw" color={textColor}>
                                Withdraw
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink color={textColor} fontWeight="semibold">
                                Transaction History
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    
                    <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                        Withdrawal Transaction History
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                        View and manage all your withdrawal transactions
                    </Text>
                </Box>
                
                <Button
                    as={RouterLink}
                    to="/user/withdraw"
                    leftIcon={<FaArrowLeft />}
                    variant="outline"
                    colorScheme="blue"
                >
                    Back to Withdraw
                </Button>
            </Flex>

            {/* Full History Component */}
            <WithdrawHistory 
                withdrawHistory={displayWithdrawHistory}
                isLoading={isLoading}
                showFullHistory={true}
            />
        </Box>
    );
};

export default WithdrawHistoryPage;