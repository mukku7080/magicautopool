import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    HStack,
    Text,
    Heading,
    useColorModeValue,
    Flex,
    useToast,
    Divider,
    Link,
    Card,
    CardBody,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormErrorMessage,
    Checkbox,
    IconButton,
    Stack,
    useBreakpointValue,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const toast = useToast();

    // Responsive values
    const cardWidth = useBreakpointValue({ base: '95%', sm: '400px', md: '450px' });
    const cardPadding = useBreakpointValue({ base: 4, md: 8 });
    const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });

    // Form states
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});

    // Color mode values
    const bgGradient = useColorModeValue(
        'linear(to-br, blue.50, purple.50, pink.50)',
        'linear(to-br, gray.900, blue.900, purple.900)'
    );
    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const brandColor = useColorModeValue('blue.500', 'blue.300');
    const inputBg = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Handle input changes
    const handleLoginInputChange = (field, value) => {
        setLoginForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleRegisterInputChange = (field, value) => {
        setRegisterForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!loginForm.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(loginForm.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!loginForm.password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: 'Login Successful!',
                description: 'Welcome back to NessanForex',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Login Failed',
                description: 'Please check your credentials and try again',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle registration
    const handleRegister = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!registerForm.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!registerForm.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!registerForm.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(registerForm.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!registerForm.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(registerForm.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!registerForm.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (registerForm.password !== registerForm.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!registerForm.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: 'Registration Successful!',
                description: 'Welcome to NessanForex! Please check your email to verify your account.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Switch to login tab
            setTabIndex(0);
        } catch (error) {
            toast({
                title: 'Registration Failed',
                description: 'Something went wrong. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Social login handlers
    const handleSocialLogin = (provider) => {
        toast({
            title: `${provider} Login`,
            description: `${provider} login integration coming soon!`,
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            minH="100vh"
            bgGradient={bgGradient}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
            // mt={100}
        >
            <Container maxW="container.sm" centerContent>
                <Card
                    w={cardWidth}
                    bg={cardBg}
                    shadow="2xl"
                    borderRadius="2xl"
                    border="1px"
                    borderColor={borderColor}
                    overflow="hidden"
                    mt={100}
                >
                    <CardBody p={cardPadding}>
                        {/* Header */}
                        <VStack spacing={4} mb={6}>
                            <Box
                                w="60px"
                                h="60px"
                                bg={brandColor}
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="white"
                                fontSize="2xl"
                                fontWeight="bold"
                            >
                                N
                            </Box>
                            <VStack spacing={1}>
                                <Heading
                                    size={useBreakpointValue({ base: 'lg', md: 'xl' })}
                                    color={textColor}
                                    textAlign="center"
                                >
                                    NessanForex
                                </Heading>
                                <Text color="gray.500" fontSize={fontSize} textAlign="center">
                                    Your trusted trading partner
                                </Text>
                            </VStack>
                        </VStack>

                        {/* Tabs */}
                        <Tabs
                            index={tabIndex}
                            onChange={setTabIndex}
                            variant="soft-rounded"
                            colorScheme="blue"
                            isFitted
                        >
                            <TabList mb={6} bg={inputBg} p={1} borderRadius="xl">
                                <Tab
                                    fontSize={fontSize}
                                    fontWeight="semibold"
                                    _selected={{
                                        bg: brandColor,
                                        color: 'white',
                                        shadow: 'md'
                                    }}
                                >
                                    Sign In
                                </Tab>
                                <Tab
                                    fontSize={fontSize}
                                    fontWeight="semibold"
                                    _selected={{
                                        bg: brandColor,
                                        color: 'white',
                                        shadow: 'md'
                                    }}
                                >
                                    Sign Up
                                </Tab>
                            </TabList>

                            <TabPanels>
                                {/* Login Panel */}
                                <TabPanel p={0}>
                                    <form onSubmit={handleLogin}>
                                        <VStack spacing={4}>
                                            <FormControl isInvalid={errors.email}>
                                                <FormLabel fontSize={fontSize} color={textColor}>
                                                    Email Address
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={loginForm.email}
                                                        onChange={(e) => handleLoginInputChange('email', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <InputRightElement h="48px">
                                                        <AiOutlineMail color="gray" />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.email}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={errors.password}>
                                                <FormLabel fontSize={fontSize} color={textColor}>
                                                    Password
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter your password"
                                                        value={loginForm.password}
                                                        onChange={(e) => handleLoginInputChange('password', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <InputRightElement h="48px">
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.password}</FormErrorMessage>
                                            </FormControl>

                                            <HStack justify="space-between" w="full">
                                                <Checkbox
                                                    isChecked={loginForm.rememberMe}
                                                    onChange={(e) => handleLoginInputChange('rememberMe', e.target.checked)}
                                                    colorScheme="blue"
                                                    fontSize={fontSize}
                                                >
                                                    Remember me
                                                </Checkbox>
                                                <Link
                                                    color={brandColor}
                                                    fontSize={fontSize}
                                                    fontWeight="medium"
                                                    _hover={{ textDecoration: 'underline' }}
                                                >
                                                    Forgot password?
                                                </Link>
                                            </HStack>

                                            <Button
                                                type="submit"
                                                w="full"
                                                bg={brandColor}
                                                color="white"
                                                _hover={{ bg: 'blue.600' }}
                                                _active={{ bg: 'blue.700' }}
                                                isLoading={isLoading}
                                                loadingText="Signing in..."
                                                size="lg"
                                                fontSize={fontSize}
                                                fontWeight="semibold"
                                                borderRadius="xl"
                                                h="48px"
                                            >
                                                Sign In
                                            </Button>
                                        </VStack>
                                    </form>
                                </TabPanel>

                                {/* Register Panel */}
                                <TabPanel p={0}>
                                    <form onSubmit={handleRegister}>
                                        <VStack spacing={4}>
                                            <HStack spacing={3} w="full">
                                                <FormControl isInvalid={errors.firstName}>
                                                    <FormLabel fontSize={fontSize} color={textColor}>
                                                        First Name
                                                    </FormLabel>
                                                    <Input
                                                        placeholder="First name"
                                                        value={registerForm.firstName}
                                                        onChange={(e) => handleRegisterInputChange('firstName', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <FormErrorMessage fontSize="sm">{errors.firstName}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl isInvalid={errors.lastName}>
                                                    <FormLabel fontSize={fontSize} color={textColor}>
                                                        Last Name
                                                    </FormLabel>
                                                    <Input
                                                        placeholder="Last name"
                                                        value={registerForm.lastName}
                                                        onChange={(e) => handleRegisterInputChange('lastName', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <FormErrorMessage fontSize="sm">{errors.lastName}</FormErrorMessage>
                                                </FormControl>
                                            </HStack>

                                            <FormControl isInvalid={errors.email}>
                                                <FormLabel fontSize={fontSize} color={textColor}>
                                                    Email Address
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={registerForm.email}
                                                        onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <InputRightElement h="48px">
                                                        <AiOutlineMail color="gray" />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.email}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={errors.password}>
                                                <FormLabel fontSize={fontSize} color={textColor}>
                                                    Password
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Create a password"
                                                        value={registerForm.password}
                                                        onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <InputRightElement h="48px">
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.password}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={errors.confirmPassword}>
                                                <FormLabel fontSize={fontSize} color={textColor}>
                                                    Confirm Password
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        placeholder="Confirm your password"
                                                        value={registerForm.confirmPassword}
                                                        onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <InputRightElement h="48px">
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            icon={showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.confirmPassword}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={errors.agreeToTerms}>
                                                <Checkbox
                                                    isChecked={registerForm.agreeToTerms}
                                                    onChange={(e) => handleRegisterInputChange('agreeToTerms', e.target.checked)}
                                                    colorScheme="blue"
                                                    fontSize={fontSize}
                                                >
                                                    I agree to the{' '}
                                                    <Link color={brandColor} fontWeight="medium">
                                                        Terms of Service
                                                    </Link>{' '}
                                                    and{' '}
                                                    <Link color={brandColor} fontWeight="medium">
                                                        Privacy Policy
                                                    </Link>
                                                </Checkbox>
                                                <FormErrorMessage fontSize="sm">{errors.agreeToTerms}</FormErrorMessage>
                                            </FormControl>

                                            <Button
                                                type="submit"
                                                w="full"
                                                bg={brandColor}
                                                color="white"
                                                _hover={{ bg: 'blue.600' }}
                                                _active={{ bg: 'blue.700' }}
                                                isLoading={isLoading}
                                                loadingText="Creating account..."
                                                size="lg"
                                                fontSize={fontSize}
                                                fontWeight="semibold"
                                                borderRadius="xl"
                                                h="48px"
                                            >
                                                Create Account
                                            </Button>
                                        </VStack>
                                    </form>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                        {/* Social Login */}
                        <Box mt={6}>
                            <HStack>
                                <Divider />
                                <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                                    Or continue with
                                </Text>
                                <Divider />
                            </HStack>

                            <Stack
                                direction={useBreakpointValue({ base: 'column', sm: 'row' })}
                                spacing={3}
                                mt={4}
                            >
                                <Button
                                    variant="outline"
                                    leftIcon={<FaGoogle />}
                                    onClick={() => handleSocialLogin('Google')}
                                    flex={1}
                                    fontSize={fontSize}
                                    h="44px"
                                    borderColor={borderColor}
                                    _hover={{ bg: inputBg }}
                                >
                                    Google
                                </Button>
                                <Button
                                    variant="outline"
                                    leftIcon={<FaFacebook />}
                                    onClick={() => handleSocialLogin('Facebook')}
                                    flex={1}
                                    fontSize={fontSize}
                                    h="44px"
                                    borderColor={borderColor}
                                    _hover={{ bg: inputBg }}
                                >
                                    Facebook
                                </Button>
                                <Button
                                    variant="outline"
                                    leftIcon={<FaTwitter />}
                                    onClick={() => handleSocialLogin('Twitter')}
                                    flex={1}
                                    fontSize={fontSize}
                                    h="44px"
                                    borderColor={borderColor}
                                    _hover={{ bg: inputBg }}
                                >
                                    Twitter
                                </Button>
                            </Stack>
                        </Box>

                        {/* Footer */}
                        <Text
                            textAlign="center"
                            fontSize="sm"
                            color="gray.500"
                            mt={6}
                        >
                            © 2024 NessanForex. All rights reserved.
                        </Text>
                    </CardBody>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;