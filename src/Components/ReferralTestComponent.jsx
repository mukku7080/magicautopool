import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Button,
    Alert,
    AlertIcon,
    Code,
    Badge,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ReferralTestComponent = () => {
    const testReferralCode = '4kBBsj749';
    const testReferralUrl = `http://localhost:5173/login?invitecode=${testReferralCode}`;

    return (
        <Container maxW="4xl" py={8}>
            <VStack spacing={6}>
                <Heading size="lg">Referral System Test</Heading>

                <Alert status="info">
                    <AlertIcon />
                    <Box>
                        <Text fontWeight="bold">Test the Referral System</Text>
                        <Text fontSize="sm">
                            Use the test URL below to verify the referral system works correctly.
                        </Text>
                    </Box>
                </Alert>

                <Box p={4} border="1px" borderColor="gray.200" borderRadius="md" w="full">
                    <VStack spacing={3} align="start">
                        <Text fontWeight="bold">Test Referral URL:</Text>
                        <Code p={2} borderRadius="md" w="full" fontSize="sm">
                            {testReferralUrl}
                        </Code>
                        <Badge colorScheme="purple">Test Code: {testReferralCode}</Badge>
                    </VStack>
                </Box>

                <VStack spacing={3}>
                    <Button
                        as={RouterLink}
                        to={`/login?invitecode=${testReferralCode}`}
                        colorScheme="blue"
                        size="lg"
                    >
                        Test Referral Link
                    </Button>

                    <Text fontSize="sm" color="gray.600" textAlign="center">
                        This should:
                        <br />
                        1. Open login page with register tab active
                        <br />
                        2. Auto-fill the invite code: {testReferralCode}
                        <br />
                        3. After registration, redirect to dashboard
                    </Text>
                </VStack>

                <Alert status="warning" borderRadius="md">
                    <AlertIcon />
                    <Box>
                        <Text fontWeight="bold">Expected Flow:</Text>
                        <VStack spacing={1} align="start" fontSize="sm" mt={2}>
                            <Text>• Click test link → Login page opens</Text>
                            <Text>• Register tab is automatically selected</Text>
                            <Text>• Invite code is pre-filled</Text>
                            <Text>• Fill form and register</Text>
                            <Text>• Success → Redirect to /user/dashboard</Text>
                            <Text>• Token saved in localStorage</Text>
                        </VStack>
                    </Box>
                </Alert>
            </VStack>
        </Container>
    );
};

export default ReferralTestComponent;