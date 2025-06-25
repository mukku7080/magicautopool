import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Center, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../Context';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
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
                        Verifying authentication...
                    </Text>
                </VStack>
            </Center>
        );
    }

    // If not authenticated, redirect to login with return URL
    if (!isAuthenticated) {
        return (
            <Navigate 
                to="/login" 
                state={{ from: location.pathname }} 
                replace 
            />
        );
    }

    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;