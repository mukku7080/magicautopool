import React from 'react';
import {
    Box,
    Text,
    VStack,
    Badge,
    Code,
    Alert,
    AlertIcon,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../Context';

const AuthDebugger = () => {
    const { user, token, isAuthenticated, isLoading } = useAuth();
    const bg = useColorModeValue('gray.50', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    // Get token from localStorage for debugging
    const localStorageToken = localStorage.getItem('authToken');
    const localStorageUser = localStorage.getItem('user');

    const handleClearAuth = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <Box
            position="fixed"
            top="4"
            right="4"
            bg={bg}
            border="1px"
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            maxW="300px"
            fontSize="sm"
            zIndex={1000}
        >
            <VStack spacing={2} align="stretch">
                <Text fontWeight="bold" fontSize="sm">🔍 Auth Debugger</Text>

                <VStack spacing={1} align="stretch">
                    <Text fontSize="xs">
                        <Badge colorScheme={isAuthenticated ? 'green' : 'red'}>
                            {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                        </Badge>
                    </Text>

                    <Text fontSize="xs">
                        <Badge colorScheme={isLoading ? 'yellow' : 'gray'}>
                            {isLoading ? 'Loading' : 'Ready'}
                        </Badge>
                    </Text>

                    <Text fontSize="xs">
                        Token: {token ? '✅ Present' : '❌ Missing'}
                    </Text>

                    <Text fontSize="xs">
                        User: {user ? '✅ Present' : '❌ Missing'}
                    </Text>

                    <Text fontSize="xs">
                        LocalStorage Token: {localStorageToken ? '✅ Present' : '❌ Missing'}
                    </Text>

                    <Text fontSize="xs">
                        LocalStorage User: {localStorageUser ? '✅ Present' : '❌ Missing'}
                    </Text>
                </VStack>

                {user && (
                    <Box>
                        <Text fontSize="xs" fontWeight="bold">User Info:</Text>
                        <Code fontSize="10px" p={1} borderRadius="sm">
                            {JSON.stringify(user, null, 2).substring(0, 100)}...
                        </Code>
                    </Box>
                )}

                <Button size="xs" colorScheme="red" onClick={handleClearAuth}>
                    Clear Auth
                </Button>

                <Alert status="info" fontSize="xs" p={2}>
                    <AlertIcon boxSize={3} />
                    <Text fontSize="10px">
                        This debug panel shows the current authentication state.
                    </Text>
                </Alert>
            </VStack>
        </Box>
    );
};

export default AuthDebugger;