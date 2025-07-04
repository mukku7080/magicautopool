import React, { useState } from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Code,
    useColorModeValue
} from '@chakra-ui/react';
import PhoneInput from './PhoneInput';
import { isValidPhoneNumber } from '../utils/phoneUtils';

const PhoneInputDemo = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const brandColor = '#4c7d4e';

    const handleSubmit = () => {
        setError('');

        if (!phoneNumber || phoneNumber.trim().length <= 4) {
            setError('Phone number is required');
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            setError('Please enter a valid phone number (7-15 digits)');
            return;
        }

        setSubmitted(true);
        console.log('📱 Submitted phone number:', phoneNumber);
    };

    const handleReset = () => {
        setPhoneNumber('');
        setError('');
        setSubmitted(false);
    };

    return (
        <Box maxW="400px" mx="auto" p={6}>
            <VStack spacing={6} align="stretch">
                <Heading size="md" textAlign="center">
                    Phone Input Demo
                </Heading>

                <Text fontSize="sm" color="gray.600" textAlign="center">
                    This demo shows how the phone input works with country codes.
                    Default country is United States (+1).
                </Text>

                <FormControl isInvalid={error}>
                    <FormLabel>Phone Number</FormLabel>
                    <PhoneInput
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        placeholder="Enter phone number"
                        bg={bg}
                        border="1px"
                        borderColor={borderColor}
                        _hover={{ borderColor: brandColor }}
                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                        h="48px"
                        isInvalid={error}
                    />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>

                <VStack spacing={2}>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        w="full"
                        isDisabled={!phoneNumber}
                    >
                        Submit Phone Number
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        w="full"
                        size="sm"
                    >
                        Reset
                    </Button>
                </VStack>

                {phoneNumber && (
                    <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>
                            Current Value:
                        </Text>
                        <Code p={2} borderRadius="md" w="full" display="block">
                            {phoneNumber || 'Empty'}
                        </Code>
                    </Box>
                )}

                {submitted && (
                    <Alert status="success" borderRadius="md">
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Phone number submitted: <Code>{phoneNumber}</Code>
                            </AlertDescription>
                        </Box>
                    </Alert>
                )}

                <Box fontSize="xs" color="gray.500">
                    <Text fontWeight="semibold" mb={1}>Features:</Text>
                    <Text>• Fetches country codes from API</Text>
                    <Text>• Default to US (+1) country code</Text>
                    <Text>• Searchable country dropdown</Text>
                    <Text>• Validates phone number length</Text>
                    <Text>• Concatenates country code with phone number</Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default PhoneInputDemo;