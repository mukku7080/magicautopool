import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,
    Badge,
    useColorModeValue,
    Button,
    Spacer,
    useColorMode,
    Portal,
    useToast,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiSettings, FiLogOut, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { AiOutlineWallet } from 'react-icons/ai';
import { useAuth, useUser } from '../../Context';
import { ReferralIconButton } from '../../Components/ReferralButton';

const UserHeader = ({ onOpen, user }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const { profile } = useUser();
    const account_blc=profile?.USER?.available_amount;


    const handleLogout = async () => {
        try {
            // Show loading toast
            const loadingToast = toast({
                title: 'Signing out...',
                status: 'loading',
                duration: null,
                isClosable: false,
            });

            // Call logout API
            await logout();

            // Close loading toast
            toast.close(loadingToast);

            // Show success message
            toast({
                title: 'Signed out successfully',
                description: 'You have been logged out of your account',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            // Show error message
            toast({
                title: 'Logout Failed',
                description: error.message || 'An error occurred while signing out',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            px={{ base: 4, md: 6 }}
            height="16"
            alignItems="center"
            bg={bgColor}
            borderBottomWidth="1px"
            borderBottomColor={borderColor}
            justifyContent="space-between"
            position="sticky"
            top="0"
            zIndex="1000"
            boxShadow="sm"
            w="100%"
            maxW="100%"
            overflow="hidden"
        >
            {/* Left Side - Mobile Menu & Logo */}
            <HStack spacing={3} flex="1" minW={0}>
                {/* Mobile Menu Button */}
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu />}
                    size="sm"
                    flexShrink={0}
                />

                {/* Mobile Logo */}
                <Box
                    display={{ base: 'flex', md: 'none' }}
                    fontSize={{ base: 'md', sm: 'lg' }}
                    fontFamily="monospace"
                    fontWeight="bold"
                    color="blue.500"
                    isTruncated
                >
                    NessanForex
                </Box>
            </HStack>

            {/* Right Side - User Actions */}
            <HStack spacing={{ base: 1, md: 4 }} flexShrink={0}>
                {/* Balance Display - Hidden on mobile */}
                <Box
                    display={{ base: 'none', lg: 'flex' }}
                    alignItems="center"
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    border="1px"
                    borderColor={useColorModeValue('blue.200', 'blue.700')}
                >
                    <AiOutlineWallet color={useColorModeValue('#3182CE', '#63B3ED')} />
                    <Box
                        ml={2}
                        fontSize="sm"
                        fontWeight="semibold"
                        color={useColorModeValue('blue.700', 'blue.200')}
                        whiteSpace="nowrap"
                    >
                        {`$${account_blc}`}
                    </Box>
                </Box>

                {/* Referral Button */}
                <Flex display={{ base: 'none', md: 'flex' }}>

                    <ReferralIconButton
                        size="sm"
                        variant="solid"
                        colorScheme="blue"

                    />
                </Flex>

                {/* Color Mode Toggle */}
                <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Toggle color mode"
                    icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                    onClick={toggleColorMode}
                />

                {/* Notifications */}
                <Box position="relative">
                    <Menu placement="bottom-end" strategy="fixed">
                        <MenuButton
                            as={IconButton}
                            size="sm"
                            variant="ghost"
                            aria-label="Notifications"
                            icon={<FiBell />}
                        />
                        <Badge
                            position="absolute"
                            top="-1"
                            right="-1"
                            colorScheme="red"
                            borderRadius="full"
                            boxSize="18px"
                            fontSize="10px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            zIndex="tooltip"
                        >
                            3
                        </Badge>
                        <Portal>
                            <MenuList
                                zIndex="9999"
                                bg={useColorModeValue('white', 'gray.800')}
                                border="1px"
                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                                boxShadow="lg"
                                minW="280px"
                            >
                                <MenuItem>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium">
                                            New deposit received
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            2 minutes ago
                                        </Text>
                                    </Box>
                                </MenuItem>
                                <MenuItem>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium">
                                            Withdrawal processed
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            1 hour ago
                                        </Text>
                                    </Box>
                                </MenuItem>
                                <MenuItem>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium">
                                            Account verified
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            2 hours ago
                                        </Text>
                                    </Box>
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>

                {/* User Profile Menu */}
                <Menu placement="bottom-end" strategy="fixed">
                    <MenuButton
                        as={Button}
                        size="sm"
                        variant="ghost"
                        cursor="pointer"
                        minW={0}
                        p={1}
                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                        _active={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                    >
                        <HStack spacing={2} gap={2} alignItems="center">
                            <Avatar
                                size="sm"
                                name={profile?.USER?.name}
                                src={user.avatar}
                                bg="blue.500"
                            />
                            <Box display={{ base: 'none', md: 'block' }} textAlign="left">
                                <Flex direction={'column'} fontSize="sm" fontWeight="medium" color={textColor}>
                                    <Box >

                                        {profile?.USER?.name}
                                    </Box>

                                    <Box fontSize="xs" color="gray.500">
                                        {user.accountType}
                                    </Box>
                                </Flex>
                            </Box>
                        </HStack>
                    </MenuButton>
                    <Portal>
                        <MenuList
                            zIndex="9999"
                            bg={useColorModeValue('white', 'gray.800')}
                            border="1px"
                            borderColor={useColorModeValue('gray.200', 'gray.700')}
                            boxShadow="lg"
                            minW="200px"
                        >
                            <MenuItem icon={<FiUser />}>
                                Profile Settings
                            </MenuItem>
                            <MenuItem icon={<AiOutlineWallet />}>
                                Wallet
                            </MenuItem>
                            <MenuItem icon={<FiSettings />}>
                                Account Settings
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout} color="red.500">
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </HStack>
        </Flex>
    );
};

export default UserHeader;