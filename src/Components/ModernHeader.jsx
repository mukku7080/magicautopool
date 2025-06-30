import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    useColorModeValue,
    useDisclosure,
    Container,
    Image,
    HStack,
    VStack,
    Divider,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useBreakpointValue,
    Slide,
    ScaleFade,
    Fade,
    Spacer,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
} from '@chakra-ui/icons';
import {
    FiHome,
    FiInfo,
    FiPackage,
    FiMail,
    FiUserPlus,
    FiMenu,
    FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ModernHeader = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {
            label: 'Home',
            href: '/',
            icon: FiHome,
        },
        {
            label: 'About',
            href: '/about',
            icon: FiInfo,
        },
        {
            label: 'Plan',
            href: '/crypto_services',
            icon: FiPackage,
        },
        {
            label: 'Contact',
            href: '/contact',
            icon: FiMail,
        }
    ];

    const handleNavigation = (href) => {
        navigate(href);
        onClose();
    };

    const bg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box position="sticky" top={0} zIndex={1000}>
            <Box
                bg={scrolled ? bg : useColorModeValue('white', 'gray.800')}
                backdropFilter={scrolled ? 'blur(10px)' : 'none'}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={borderColor}
                transition="all 0.3s ease"
                boxShadow={scrolled ? 'lg' : 'sm'}
            >
                <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                    <Flex
                        align="center"
                        justify="space-between"
                        h={useBreakpointValue({ base: '65px', md: '80px' })}
                    >
                        {/* Logo Section */}
                        <Flex align="center" flex={1}>
                            <Link
                                href="/"
                                _hover={{ textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/');
                                }}
                            >
                                <HStack spacing={3}>
                                    <Image
                                        src="assets/images/MagicAutpool Logo.png"
                                        alt="MagicAutpool Logo"
                                        h={useBreakpointValue({ base: '35px', md: '45px' })}
                                        w="auto"
                                        transition="transform 0.3s ease"
                                        _hover={{ transform: 'scale(1.05)' }}
                                    />
                                    {/* <Text
                                        fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })}
                                        fontWeight="bold"
                                        color={useColorModeValue('gray.800', 'white')}
                                        display={useBreakpointValue({ base: 'none', sm: 'block' })}
                                    >
                                        MagicAutpool
                                    </Text> */}
                                </HStack>
                            </Link>
                        </Flex>

                        {/* Desktop Navigation */}
                        <Flex display={{ base: 'none', md: 'flex' }} flex={2} justify="center">
                            <DesktopNav navItems={navItems} onNavigate={handleNavigation} />
                        </Flex>

                        {/* Desktop Actions */}
                        <Flex flex={1} justify="flex-end" align="center">
                            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                                <Button
                                    leftIcon={<FiUserPlus />}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'#4a7b4c'}
                                    _hover={{
                                        bg: '#3a6b3c',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'xl',
                                    }}
                                    _active={{
                                        bg: '#2a5b2c',
                                        transform: 'translateY(0)',
                                    }}
                                    borderRadius="12px"
                                    px={6}
                                    py={3}
                                    transition="all 0.3s ease"
                                    onClick={() => navigate('/login')}
                                    size="md"
                                >
                                    Join Us
                                </Button>
                            </HStack>

                            {/* Mobile menu button */}
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                onClick={onToggle}
                                icon={isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                                variant="ghost"
                                aria-label="Toggle Navigation"
                                _hover={{ bg: 'gray.100' }}
                                _active={{ bg: 'gray.200' }}
                                border="1px solid"
                                borderColor={borderColor}
                                borderRadius="8px"
                                size="md"
                            />
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            {/* Mobile Navigation */}
            <Collapse in={isOpen} animateOpacity>
                <MobileNav
                    navItems={navItems}
                    onNavigate={handleNavigation}
                    onJoinUs={() => {
                        navigate('/login');
                        onClose();
                    }}
                />
            </Collapse>
        </Box>
    );
};

const DesktopNav = ({ navItems, onNavigate }) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('#4a7b4c', 'white');
    const activeBg = useColorModeValue('gray.50', 'gray.700');

    return (
        <Stack direction={'row'} spacing={1}>
            {navItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Button
                        variant="ghost"
                        onClick={() => onNavigate(navItem.href)}
                        fontSize={'md'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            color: linkHoverColor,
                            bg: activeBg,
                            transform: 'translateY(-1px)',
                        }}
                        _active={{
                            transform: 'translateY(0)',
                        }}
                        transition="all 0.3s ease"
                        borderRadius="8px"
                        px={4}
                        py={2}
                        leftIcon={<navItem.icon size={16} />}
                        iconSpacing={2}
                    >
                        {navItem.label}
                    </Button>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = ({ navItems, onNavigate, onJoinUs }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box
            bg={bgColor}
            borderTop="1px solid"
            borderColor={borderColor}
            boxShadow="xl"
            display={{ md: 'none' }}
        >
            <Container maxW="7xl" px={4}>
                <VStack spacing={1} py={4} align="stretch">
                    {navItems.map((navItem, index) => (
                        <ScaleFade
                            key={navItem.label}
                            in={true}
                            initialScale={0.9}
                            transition={{
                                enter: { delay: index * 0.1, duration: 0.3 }
                            }}
                        >
                            <MobileNavItem
                                navItem={navItem}
                                onNavigate={onNavigate}
                            />
                        </ScaleFade>
                    ))}

                    <Divider my={3} />

                    {/* Mobile Join Us Button */}
                    <ScaleFade
                        in={true}
                        initialScale={0.9}
                        transition={{
                            enter: { delay: navItems.length * 0.1, duration: 0.3 }
                        }}
                    >
                        <Button
                            leftIcon={<FiUserPlus />}
                            fontSize={'md'}
                            fontWeight={600}
                            color={'white'}
                            bg={'#4a7b4c'}
                            _hover={{
                                bg: '#3a6b3c',
                                transform: 'scale(1.02)',
                            }}
                            _active={{
                                bg: '#2a5b2c',
                                transform: 'scale(0.98)',
                            }}
                            borderRadius="12px"
                            py={3}
                            h="auto"
                            onClick={onJoinUs}
                            w="full"
                            size="lg"
                            transition="all 0.3s ease"
                        >
                            Join Us
                        </Button>
                    </ScaleFade>
                </VStack>
            </Container>
        </Box>
    );
};

const MobileNavItem = ({ navItem, onNavigate }) => {
    const hoverBg = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const hoverColor = useColorModeValue('#4a7b4c', 'white');

    return (
        <Button
            variant="ghost"
            onClick={() => onNavigate(navItem.href)}
            fontWeight={500}
            color={textColor}
            fontSize="md"
            _hover={{
                bg: hoverBg,
                color: hoverColor,
                transform: 'translateX(4px)',
            }}
            _active={{
                transform: 'translateX(2px)',
            }}
            transition="all 0.3s ease"
            w="full"
            justifyContent="flex-start"
            leftIcon={<navItem.icon size={18} />}
            iconSpacing={3}
            py={3}
            h="auto"
            borderRadius="8px"
        >
            {navItem.label}
        </Button>
    );
};

export default ModernHeader;