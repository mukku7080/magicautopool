import React, { useState } from 'react';
import {
    Box,
    Flex,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
    DrawerOverlay,
} from '@chakra-ui/react';
import UserSidebar from './components/UserSidebar';
import UserHeader from './components/UserHeader';

const UserLayout = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
        balance: 15420.50,
        accountType: 'Premium'
    });

    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box
            minH="100vh"
            bg={bgColor}
            w="100%"
            maxW="100vw"
            overflow="hidden"
        >
            {/* Mobile Sidebar Drawer */}
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="xs"
            >
                <DrawerOverlay bg="blackAlpha.600" />
                <DrawerContent maxW="240px">
                    <UserSidebar onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* Desktop Sidebar - Fixed Position */}
            <Box
                display={{ base: 'none', md: 'block' }}
                position="fixed"
                left="0"
                top="0"
                h="100vh"
                w="240px"
                zIndex="900"
            >
                <UserSidebar onClose={onClose} />
            </Box>

            {/* Main Content Area */}
            <Flex
                direction="column"
                ml={{ base: 0, md: '240px' }}
                minH="100vh"
                w={{ base: '100%', md: 'calc(100vw - 240px)' }}
                maxW="100%"
                overflow="hidden"
            >
                {/* Header */}
                <UserHeader onOpen={onOpen} user={user} />

                {/* Page Content */}
                <Box
                    flex="1"
                    p={{ base: 4, md: 6 }}
                    w="100%"
                    maxW="100%"
                    overflow="auto"
                    position="relative"
                    zIndex="1"
                >
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default UserLayout;