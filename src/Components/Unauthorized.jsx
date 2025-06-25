import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiLock, FiHome, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <Box minH="100vh" bg={bgColor} py={20}>
            <Container maxW="md" centerContent>
                <VStack
                    spacing={8}
                    p={8}
                    bg={cardBg}
                    borderRadius="xl"
                    boxShadow="lg"
                    textAlign="center"
                >
                    <Icon as={FiLock} boxSize={16} color="red.500" />

                    <VStack spacing={4}>
                        <Heading size="xl" color="red.500">
                            Access Denied
                        </Heading>
                        <Text fontSize="lg" color={textColor}>
                            You need to be logged in to access this page.
                        </Text>
                        <Text fontSize="md" color={textColor}>
                            Please sign in to your account to continue.
                        </Text>
                    </VStack>

                    <VStack spacing={4} w="full">
                        <Button
                            leftIcon={<FiLogIn />}
                            colorScheme="blue"
                            size="lg"
                            w="full"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </Button>

                        <Button
                            leftIcon={<FiHome />}
                            variant="outline"
                            size="lg"
                            w="full"
                            onClick={() => navigate('/')}
                        >
                            Go Home
                        </Button>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default Unauthorized;