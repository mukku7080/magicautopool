import React from 'react';
import { ChakraProvider, Box, VStack, Text, Heading, Container } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

// Import the headers
import ChakraHeader from './ChakraHeader';
import ModernHeader from './ModernHeader';

const HeaderExample = () => {
    return (
        <ChakraProvider>
            <Router>
                <Box minH="100vh" bg="gray.50">
                    {/* You can choose which header to use */}

                    {/* Option 1: Basic Chakra Header */}
                    {/* <ChakraHeader /> */}

                    {/* Option 2: Modern Header with animations */}
                    <ModernHeader />

                    {/* Sample content to test scrolling */}
                    <Container maxW="7xl" py={10}>
                        <VStack spacing={8} align="stretch">
                            <Heading size="xl" textAlign="center">
                                Welcome to MagicAutpool
                            </Heading>
                            <Text textAlign="center" fontSize="lg" color="gray.600">
                                This is a sample page to test the new Chakra UI header component.
                            </Text>

                            {/* Add more content to test scrolling */}
                            {Array.from({ length: 50 }, (_, i) => (
                                <Box key={i} p={4} bg="white" rounded="md" shadow="sm">
                                    <Text>Sample content block {i + 1}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </Container>
                </Box>
            </Router>
        </ChakraProvider>
    );
};

export default HeaderExample;