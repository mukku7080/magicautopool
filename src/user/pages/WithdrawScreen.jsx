import React from "react";
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
} from "@chakra-ui/react";
import { RepeatIcon, CalendarIcon } from "@chakra-ui/icons";
import { FaWallet, FaHandHoldingUsd } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

const WithdrawScreen = () => {
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
                    <Box >
                        <Box color={'white'} fontSize="sm">Available Amount</Box>
                        <Box color={'white'} fontSize="2xl" fontWeight="bold">
                            242.868
                        </Box>
                    </Box>
                </Flex>
                <Flex gap={2}>
                    <Button size="sm" colorScheme="green">
                        Enable
                    </Button>
                    <Button colorScheme="teal" leftIcon={<FaWallet />}>
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
                            <Box fontSize="sm">Total Amount</Box>
                            <Box fontSize="xl" fontWeight="bold">
                                8.868
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
                                59
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            {/* Withdraw History */}
            <Box bg="white" p={6} rounded="md" shadow="md" >
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Withdraw History
                </Text>

                <TableContainer overflowX={['auto', 'auto', 'unset']} w="full">
                    <Table variant="simple" size="sm">
                        <Thead bg={useColorModeValue("gray.100", "gray.600")}>
                            <Tr>
                                <Th>#</Th>
                                <Th>Available Amount</Th>
                                <Th>Remain Amount</Th>
                                <Th>Withdraw Amount</Th>
                                <Th>Paid Amount</Th>
                                <Th>Fees</Th>
                                <Th>From Address</Th>
                                <Th>To Address</Th>
                                <Th>Txn Hash</Th>
                                <Th>Date Time</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td fontWeight="bold">28</Td>
                                <Td>398.308</Td>
                                <Td>397.308</Td>
                                <Td>1</Td>
                                <Td>0.9</Td>
                                <Td>0.1</Td>
                                <Td>0x7FF9Da1b......fa2D81A181</Td>
                                <Td>0x3Bc7cB06......c5DEf864dE</Td>
                                <Td>0xce02c03f......e120d1a121</Td>
                                <Td>2025-06-24 15:34:38</Td>
                                <Td>
                                    <Badge colorScheme="green">Success</Badge>
                                </Td>
                            </Tr>

                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default WithdrawScreen; 
