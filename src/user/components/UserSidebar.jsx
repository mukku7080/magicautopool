import React from 'react';
import {
    Box,
    CloseButton,
    Flex,
    Text,
    VStack,
    HStack,
    Icon,
    Link,
    useColorModeValue,
    Avatar,
    Badge,
    Divider,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiUser,
    FiCreditCard,
    FiPackage,
    FiDownload,
    FiUpload,
    FiSettings,
    FiHelpCircle,
    FiBarChart,
    FiUsers,
    FiGitBranch,
    FiUserPlus,
} from 'react-icons/fi';
import { AiOutlineWallet, AiOutlineHistory } from 'react-icons/ai';
import { useUser } from '../../Context';
import { useNavigationLoading } from '../../Context/NavigationLoadingContext';

const LinkItems = [
    { name: 'Dashboard', icon: FiHome, path: '/user/dashboard' },
    { name: 'Profile', icon: FiUser, path: '/user/profile' },
    { name: 'Wallet', icon: AiOutlineWallet, path: '/user/wallet' },
    { name: 'Packages', icon: FiPackage, path: '/user/packages' },
    { name: 'Deposit', icon: FiUpload, path: '/user/deposit' },
    { name: 'Withdraw', icon: FiDownload, path: '/user/withdraw' },
    { name: 'My Team', icon: FiUserPlus, path: '/user/team' },
    { name: 'Tree', icon: FiGitBranch, path: '/user/tree' },
    // { name: 'Transactions', icon: AiOutlineHistory, path: '/user/transactions' },
    // { name: 'Referrals', icon: FiUsers, path: '/user/referrals' },
    // { name: 'Analytics', icon: FiBarChart, path: '/user/analytics' },
    { name: 'Settings', icon: FiSettings, path: '/user/settings' },
    { name: 'Support', icon: FiHelpCircle, path: '/user/support' },
];

const UserSidebar = ({ onClose, ...rest }) => {
    const location = useLocation();
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const { profile } = useUser();
    const { setIsNavigationLoading, setCurrentRoute, setChange, change } = useNavigationLoading();
    const account_blc=profile?.USER?.available_amount;


    return (
        <Flex
            direction="column"
            bg={bgColor}
            borderRight="1px"
            borderRightColor={borderColor}
            w="full"
            h="full"
            overflow="hidden"
            {...rest}
        >
            {/* Header */}
            <Flex h="16" alignItems="center" mx={{ base: 4, md: 6 }} justifyContent="space-between" flexShrink={0}>
                <HStack spacing={3}>
                    <Box
                        w="32px"
                        h="32px"
                        bg="blue.500"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="lg"
                        fontWeight="bold"
                    >
                        M
                    </Box>
                    <Box
                        fontSize={{ base: 'md', md: 'lg' }}
                        fontFamily="monospace"
                        fontWeight="bold"
                        color="blue.500"
                    >
                        MagicAutoPool
                    </Box>
                </HStack>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>

            {/* User Info Card */}
            <Box mx={{ base: 3, md: 4 }} mb="4" flexShrink={0}>
                <Box
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    p={{ base: 3, md: 4 }}
                    borderRadius="lg"
                    border="1px"
                    borderColor={useColorModeValue('blue.200', 'blue.700')}
                >
                    <HStack spacing={3}>
                        <Avatar
                            size="sm"
                            name={profile?.USER?.name}
                            bg="blue.500"
                        />
                        <Flex direction={'column'} flex="1" gap={1}>
                            <Box
                                fontSize="sm"
                                fontWeight="semibold"
                                color={useColorModeValue('blue.700', 'blue.200')}
                            >
                                {profile?.USER?.name}
                            </Box>
                            <HStack spacing={2}>
                                <Badge
                                    size="sm"
                                    colorScheme="green"
                                    variant="subtle"
                                >
                                    Premium
                                </Badge>
                                <Badge
                                    size="sm"
                                    colorScheme="blue"
                                    variant="subtle"
                                >
                                    Verified
                                </Badge>
                            </HStack>
                        </Flex>
                    </HStack>
                </Box>
            </Box>

            <Divider mx={{ base: 3, md: 4 }} mb="4" flexShrink={0} />

            {/* Navigation Links - Scrollable without visible scrollbar */}
            <Box
                flex="1"
                overflow="hidden"
                css={{
                    '&:hover': {
                        overflowY: 'auto',
                    },
                    '&::-webkit-scrollbar': {
                        width: '0px',
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'transparent',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <VStack spacing={1} align="stretch" px={{ base: 3, md: 4 }} pb="4">
                    {LinkItems.map((link) => (
                        <NavItem
                            key={link.name}
                            icon={link.icon}
                            path={link.path}
                            isActive={location.pathname === link.path}
                            onClick={() => {
                                setIsNavigationLoading(true);
                                setChange(!change);
                                setCurrentRoute(link.name);
                                onClose();
                            }}
                        >
                            {link.name}
                        </NavItem>
                    ))}
                </VStack>
            </Box>

            {/* Bottom Section */}
            <Box mx={{ base: 3, md: 4 }} mb="4" flexShrink={0}>
                <Box
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    p={{ base: 2, md: 3 }}
                    borderRadius="lg"
                    textAlign="center"
                >
                    <Text fontSize="xs" color="gray.500" mb="1">
                        Account Balance
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="green.500">
                       {` $${account_blc}`}
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

const NavItem = ({ icon, children, path, isActive, onClick, ...rest }) => {
    const activeColor = useColorModeValue('blue.500', 'blue.300');
    const activeBg = useColorModeValue('blue.50', 'blue.900');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'gray.200');

    return (
        <Link
            as={RouterLink}
            to={path}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            onClick={onClick}
        >
            <Flex
                align="center"
                p={{ base: 2, md: 3 }}
                mx={{ base: 1, md: 2 }}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={isActive ? activeBg : 'transparent'}
                color={isActive ? activeColor : textColor}
                fontWeight={isActive ? 'semibold' : 'medium'}
                fontSize={{ base: 'sm', md: 'md' }}
                _hover={{
                    bg: isActive ? activeBg : hoverBg,
                    color: isActive ? activeColor : textColor,
                }}
                transition="all 0.2s"
                {...rest}
            >
                {icon && (
                    <Icon
                        mr={{ base: 2, md: 3 }}
                        fontSize={{ base: 16, md: 18 }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default UserSidebar;