import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    IconButton,
    useColorModeValue,
    Heading,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const DepositForm = () => {
    return (
        <Box p={8} bg={useColorModeValue("gray.100", "gray.700")} minH="100vh">
            {/* Form Section */}
            <Box
                maxW="500px"
                mx="auto"
                bg="white"
                p={6}
                rounded="md"
                shadow="md"
                mb={10}
            >
                <Heading size="md" mb={4}>
                    Deposit Form
                </Heading>

                <FormControl mb={4}>
                    <FormLabel>Deposit Asset</FormLabel>
                    <Input value="USDT" isReadOnly />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Select Network</FormLabel>
                    <Input value="BEP 20" isReadOnly />
                </FormControl>

                <FormControl mb={4} isRequired>
                    <FormLabel>Deposit Amount</FormLabel>
                    <Input placeholder="Enter Amount" type="number" />
                </FormControl>

                <Box display="flex" justifyContent="space-between">
                    <Button colorScheme="blackAlpha" variant="solid">
                        Pay With Wallet
                    </Button>
                    <Button colorScheme="teal">Pay With Gateway</Button>
                </Box>
            </Box>

            {/* Deposit History */}
            <Box maxW="full" bg="white" p={6} rounded="md" shadow="md">
                <Heading size="md" mb={4}>
                    Deposit History
                </Heading>

                <TableContainer>
                    <Table variant="simple">
                        <Thead bg={useColorModeValue("gray.100", "gray.600")}>
                            <Tr>
                                <Th>#</Th>
                                <Th>Deposit Asset</Th>
                                <Th>Deposit Amount</Th>
                                <Th>Deposit Type</Th>
                                <Th>From Address</Th>
                                <Th>To Address</Th>
                                <Th>Txn Hash</Th>
                                <Th>Date Time</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontWeight="bold">1</Td>
                                <Td>USDT</Td>
                                <Td>0</Td>
                                <Td>getWay</Td>
                                <Td>NA</Td>
                                <Td>0x7015AFc4......BFA2548C9F</Td>
                                <Td>NA</Td>
                                <Td>2025-06-26 11:19:19</Td>
                                <Td>
                                    <Badge colorScheme="orange">Pending</Badge>
                                </Td>
                                <Td>
                                    <IconButton
                                        icon={<ViewIcon />}
                                        variant="ghost"
                                        colorScheme="blackAlpha"
                                        aria-label="View"
                                    />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default DepositForm;
