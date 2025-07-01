import React from 'react';
import {
    Box,
    Flex,
    Spinner,
    Text,
    VStack,
    useColorModeValue,
    Fade,
} from '@chakra-ui/react';
import { useNavigationLoading } from '../../Context/NavigationLoadingContext';

// Minimal Top Progress Bar Loader (Recommended)
const NavigationLoader = () => {
    const { isNavigationLoading } = useNavigationLoading();

    // ✅ Hooks must come first, always
    const bgColor = useColorModeValue('blue.500', 'blue.300');
    const containerBg = useColorModeValue('gray.100', 'gray.700');

    if (!isNavigationLoading) return null;

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            h="3px"
            zIndex="9999"
            bg={containerBg}
        >
            <Box
                h="full"
                bg={bgColor}
                borderRadius="0 3px 3px 0"
                animation="progress 1s ease-in-out infinite"
                sx={{
                    '@keyframes progress': {
                        '0%': { width: '0%' },
                        '50%': { width: '70%' },
                        '100%': { width: '100%' },
                    },
                }}
            />
        </Box>
    );
};


// Full Screen Loader Alternative
export const FullScreenNavigationLoader = () => {
    const { isNavigationLoading, currentRoute } = useNavigationLoading();
    const bgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');
    const spinnerColor = useColorModeValue('blue.500', 'blue.300');

    if (!isNavigationLoading) return null;

    return (
        <Fade in={isNavigationLoading}>
            <Box
                position="fixed"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg={bgColor}
                zIndex="9999"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backdropFilter="blur(4px)"
            >
                <VStack spacing={4}>
                    <Spinner
                        thickness="4px"
                        speed="0.8s"
                        emptyColor="gray.200"
                        color={spinnerColor}
                        size="xl"
                    />
                    <VStack spacing={1}>
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color={useColorModeValue('gray.700', 'gray.200')}
                        >
                            Loading {currentRoute}
                        </Text>
                        <Text
                            fontSize="sm"
                            color={useColorModeValue('gray.500', 'gray.400')}
                        >
                            Please wait...
                        </Text>
                    </VStack>
                </VStack>
            </Box>
        </Fade>
    );
};

// Content Area Loader (for layout content only)
export const ContentNavigationLoader = () => {
    const { isNavigationLoading, currentRoute } = useNavigationLoading();
    const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');

    if (!isNavigationLoading) return null;

    return (
        <Fade in={isNavigationLoading}>
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg={bgColor}
                zIndex="999"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
            >
                <VStack spacing={3}>
                    <Spinner
                        thickness="3px"
                        speed="0.8s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                    />
                    <Text fontSize="sm" color="gray.600">
                        Loading {currentRoute}...
                    </Text>
                </VStack>
            </Box>
        </Fade>
    );
};

export default NavigationLoader;