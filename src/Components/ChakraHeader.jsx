import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Container,
    Image,
    HStack,
    VStack,
    Divider,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ChakraHeader = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const navigate = useNavigate();

    const navItems = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'About',
            href: '/about',
        },
        {
            label: 'Plan',
            href: '/crypto_services',
        },
        {
            label: 'Contact',
            href: '/contact',
        }
    ];

    const handleNavigation = (href) => {
        navigate(href);
        onClose();
    };

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'70px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                position="relative"
                zIndex={1000}
            >
                <Container maxW="7xl">
                    <Flex align="center" justify="space-between" w="full">
                        {/* Logo */}
                        <Flex align="center">
                            <Link href="/" _hover={{ textDecoration: 'none' }}>
                                <Image
                                    src="assets/images/MagicAutpool Logo.png"
                                    alt="MagicAutpool Logo"
                                    h={{ base: '40px', md: '50px' }}
                                    w="auto"
                                />
                            </Link>
                        </Flex>

                        {/* Desktop Navigation */}
                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav navItems={navItems} onNavigate={handleNavigation} />
                        </Flex>

                        {/* Desktop Join Us Button */}
                        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                            <Button
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'#4a7b4c'}
                                _hover={{
                                    bg: '#3a6b3c',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                                _active={{
                                    bg: '#2a5b2c',
                                }}
                                borderRadius="10px"
                                px={6}
                                py={3}
                                transition="all 0.3s ease"
                                onClick={() => navigate('/login')}
                            >
                                Join Us
                            </Button>
                        </HStack>

                        {/* Mobile menu button */}
                        <Flex display={{ base: 'flex', md: 'none' }}>
                            <IconButton
                                onClick={onToggle}
                                icon={
                                    isOpen ? (
                                        <CloseIcon w={3} h={3} />
                                    ) : (
                                        <HamburgerIcon w={5} h={5} />
                                    )
                                }
                                variant={'ghost'}
                                aria-label={'Toggle Navigation'}
                                _hover={{
                                    bg: 'gray.100',
                                }}
                                border="1px solid"
                                borderColor="gray.200"
                            />
                        </Flex>
                    </Flex>
                </Container>
            </Flex>

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

    return (
        <Stack direction={'row'} spacing={8}>
            {navItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Link
                        href={navItem.href}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate(navItem.href);
                        }}
                        fontSize={'md'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                            transform: 'translateY(-1px)',
                        }}
                        transition="all 0.3s ease"
                        position="relative"
                        _after={{
                            content: '""',
                            position: 'absolute',
                            width: '0%',
                            height: '2px',
                            bottom: '-4px',
                            left: '50%',
                            bg: linkHoverColor,
                            transition: 'all 0.3s ease',
                            transform: 'translateX(-50%)',
                        }}
                        _groupHover={{
                            _after: {
                                width: '100%',
                            },
                        }}
                        role="group"
                    >
                        {navItem.label}
                    </Link>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = ({ navItems, onNavigate, onJoinUs }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
            borderTop="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        >
            <VStack spacing={4} align="stretch">
                {navItems.map((navItem) => (
                    <MobileNavItem
                        key={navItem.label}
                        navItem={navItem}
                        onNavigate={onNavigate}
                    />
                ))}

                <Divider my={2} />

                {/* Mobile Join Us Button */}
                <Button
                    fontSize={'md'}
                    fontWeight={600}
                    color={'white'}
                    bg={'#4a7b4c'}
                    _hover={{
                        bg: '#3a6b3c',
                    }}
                    _active={{
                        bg: '#2a5b2c',
                    }}
                    borderRadius="10px"
                    py={3}
                    onClick={onJoinUs}
                    w="full"
                >
                    Join Us
                </Button>
            </VStack>
        </Stack>
    );
};

const MobileNavItem = ({ navItem, onNavigate }) => {
    return (
        <Stack spacing={4}>
            <Flex
                py={2}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                    fontSize="md"
                    cursor="pointer"
                    onClick={() => onNavigate(navItem.href)}
                    _hover={{
                        color: '#4a7b4c',
                    }}
                    transition="color 0.3s ease"
                    w="full"
                    textAlign="center"
                    py={2}
                    borderRadius="md"
                    _active={{
                        bg: 'gray.50',
                    }}
                >
                    {navItem.label}
                </Text>
            </Flex>
        </Stack>
    );
};

export default ChakraHeader;