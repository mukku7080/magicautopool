import React from 'react';
import {
    Box,
    Card,
    CardBody,
    Text,
    Heading,
    Avatar,
    VStack,
    HStack,
    Badge,
    Button,
    useColorModeValue,
    Spinner,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useUser } from '../Context/UserContext';

const UserProfileDemo = () => {
    const {
        profile,
        isLoading,
        error,
        getUserName,
        getUserEmail,
        getUserAvatar,
        isProfileLoaded,
        loadUserProfile,
    } = useUser();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    // Console log the profile data for demo
    React.useEffect(() => {
        if (profile) {
            console.log('🎯 UserProfileDemo - Profile Data Available:', profile);
            console.log('👤 User Name:', getUserName());
            console.log('📧 User Email:', getUserEmail());
            console.log('🖼️ User Avatar:', getUserAvatar());
            console.log('✅ Profile Loaded:', isProfileLoaded());
        }
    }, [profile]);

    return (
        <Card bg={cardBg} border="1px" borderColor={borderColor} maxW="md">
            <CardBody>
                <VStack spacing={4}>
                    <Heading size="md" textAlign="center">
                        User Profile Demo
                    </Heading>

                    {isLoading && (
                        <VStack spacing={2}>
                            <Spinner color="blue.500" />
                            <Text fontSize="sm">Loading profile...</Text>
                        </VStack>
                    )}

                    {error && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            <Text fontSize="sm">{error}</Text>
                        </Alert>
                    )}

                    {isProfileLoaded() && (
                        <VStack spacing={3}>
                            <Avatar
                                size="lg"
                                name={getUserName()}
                                src={getUserAvatar()}
                                bg="blue.500"
                            />

                            <VStack spacing={1}>
                                <Heading size="sm">{getUserName()}</Heading>
                                <Text fontSize="sm" color="gray.500">
                                    {getUserEmail()}
                                </Text>
                            </VStack>

                            <Badge colorScheme="green" variant="subtle">
                                Profile Loaded ✅
                            </Badge>

                            {/* Display raw profile data */}
                            <Box p={3} bg="gray.50" borderRadius="md" w="full">
                                <Text fontSize="xs" fontWeight="bold" mb={2}>
                                    Raw Profile Data:
                                </Text>
                                <Text fontSize="xs" fontFamily="mono" whiteSpace="pre-wrap">
                                    {JSON.stringify(profile, null, 2)}
                                </Text>
                            </Box>
                        </VStack>
                    )}

                    <HStack spacing={2}>
                        <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={loadUserProfile}
                            isLoading={isLoading}
                        >
                            Refresh Profile
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => console.log('Current Profile State:', profile)}
                        >
                            Log Profile
                        </Button>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default UserProfileDemo;