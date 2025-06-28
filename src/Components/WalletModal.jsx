import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    HStack,
    Text,
    Box,
    Divider,
    Badge,
    Spinner,
    Icon,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react';
import { FiWifi, FiWifiOff, FiExternalLink } from 'react-icons/fi';
import { useWeb3 } from '../Context/Web3Context';

const WalletModal = ({ isOpen, onClose }) => {
    const { connectWallet, isConnecting, walletTypes, isWalletInstalled } = useWeb3();
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const handleWalletConnect = async (walletId) => {
        const success = await connectWallet(walletId);
        if (success) {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
            <ModalContent mx={4} borderRadius="xl" bg="white" shadow="2xl">
                <ModalHeader>
                    <VStack spacing={2} align="start">
                        <Box fontSize="xl" fontWeight="bold">Connect Wallet</Box>
                        <Box fontSize="sm" color="gray.600" fontWeight="normal">
                            Choose your preferred wallet to connect
                        </Box>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                    <VStack spacing={4}>
                        {/* Network Info */}
                        <Box
                            p={4}
                            bg="blue.50"
                            borderRadius="lg"
                            w="full"
                            border="1px"
                            borderColor="blue.200"
                        >
                            <HStack justify="space-between" mb={2}>
                                <Box fontSize="sm" fontWeight="semibold" color="blue.800">
                                    Target Network
                                </Box>
                                <Badge colorScheme="blue" variant="solid">
                                    BSC Mainnet
                                </Badge>
                            </HStack>
                            <Text fontSize="xs" color="blue.700">
                                You'll be prompted to switch to BSC network if needed
                            </Text>
                        </Box>

                        <Divider />

                        {/* Wallet Options */}
                        <VStack spacing={3} w="full">
                            {walletTypes.map((wallet) => {
                                const isInstalled = isWalletInstalled(wallet.id);

                                return (
                                    <Box
                                        key={wallet.id}
                                        w="full"
                                        p={4}
                                        bg={cardBg}
                                        border="2px"
                                        borderColor={isInstalled ? borderColor : 'orange.200'}
                                        borderRadius="lg"
                                        cursor={isInstalled ? 'pointer' : 'default'}
                                        _hover={isInstalled ? {
                                            borderColor: 'blue.300',
                                            bg: useColorModeValue('blue.50', 'blue.900')
                                        } : {}}
                                        onClick={isInstalled ? () => handleWalletConnect(wallet.id) : undefined}
                                        position="relative"
                                        opacity={isConnecting ? 0.7 : 1}
                                    >
                                        <Flex justify="space-between" align="center">
                                            <HStack spacing={3}>
                                                <Box fontSize="2xl">{wallet.icon}</Box>
                                                <VStack align="start" spacing={0}>
                                                    <Box fontWeight="semibold" fontSize="md">
                                                        {wallet.name}
                                                    </Box>
                                                    <HStack spacing={2}>
                                                        <Icon
                                                            as={isInstalled ? FiWifi : FiWifiOff}
                                                            color={isInstalled ? 'green.500' : 'orange.500'}
                                                            boxSize={3}
                                                        />
                                                        <Box
                                                            fontSize="xs"
                                                            color={isInstalled ? 'green.600' : 'orange.600'}
                                                        >
                                                            {isInstalled ? 'Installed' : 'Not Installed'}
                                                        </Box>
                                                    </HStack>
                                                </VStack>
                                            </HStack>

                                            {isInstalled ? (
                                                isConnecting ? (
                                                    <Spinner size="sm" color="blue.500" />
                                                ) : (
                                                    <Button size="sm" colorScheme="blue" variant="outline">
                                                        Connect
                                                    </Button>
                                                )
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    colorScheme="orange"
                                                    leftIcon={<FiExternalLink />}
                                                    onClick={() => window.open(wallet.downloadUrl, '_blank')}
                                                >
                                                    Install
                                                </Button>
                                            )}
                                        </Flex>
                                    </Box>
                                );
                            })}
                        </VStack>

                        {/* Help Text */}
                        <Box
                            p={3}
                            bg={useColorModeValue('gray.50', 'gray.700')}
                            borderRadius="md"
                            w="full"
                        >
                            <Text fontSize="xs" color="gray.600" textAlign="center">
                                💡 New to wallets? MetaMask is recommended for beginners.
                                <br />
                                Your wallet will be used to securely sign transactions.
                            </Text>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} size="sm">
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default WalletModal;