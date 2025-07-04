import React, { useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import PhoneInput from './PhoneInput';

const PhoneInputTest = () => {
    const [phoneValue, setPhoneValue] = useState('');
    const [renderCount, setRenderCount] = useState(0);

    React.useEffect(() => {
        setRenderCount(prev => prev + 1);
    });

    return (
        <Box p={6} maxW="400px" mx="auto">
            <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">
                    PhoneInput Performance Test
                </Text>
                <Text fontSize="sm" color="gray.600">
                    Render Count: {renderCount}
                </Text>
                <PhoneInput
                    value={phoneValue}
                    onChange={setPhoneValue}
                    placeholder="Enter phone number"
                    bg="white"
                    border="1px"
                    borderColor="gray.300"
                />
                <Text fontSize="sm">
                    Current Value: {phoneValue}
                </Text>
                <Button onClick={() => setPhoneValue('')} size="sm">
                    Clear Phone
                </Button>
            </VStack>
        </Box>
    );
};

export default PhoneInputTest;