import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Center, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../Context';

/**
 * Component to redirect authenticated users away from auth pages (login/register)
 */
const AuthRedirect = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <Center minH="100vh" bg="gray.50">
                <VStack spacing={4}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    <Text color="gray.600" fontSize="lg">
                        Loading...
                    </Text>
                </VStack>
            </Center>
        );
    }

    // If authenticated, redirect to dashboard or intended page
    if (isAuthenticated) {
        const redirectTo = location.state?.from || '/user/dashboard';
        return <Navigate to={redirectTo} replace />;
    }

    // If not authenticated, render the auth page
    return children;
};

export default AuthRedirect;