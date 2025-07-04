import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    Image,
    Spinner,
    useDisclosure,
    InputLeftAddon,
    InputLeftElement,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useAuth, useOther } from '../Context';
import CongratulationsModal from '../Components/CongratulationsModal';
import CongractulationsModalNew from '../Components/CongractulationsModalNew';
// import PhoneInput from '../Components/PhoneInput';
import { isValidPhoneNumber } from '../utils/phoneUtils';
import CountryCodeDropdown from './CountryCodeDropdown';

const Login = React.memo(() => {
    const [hasJustRegistered, setHasJustRegistered] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    // const [isRedirecting, setIsRedirecting] = useState(false);
    // const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
    const [registrationData, setRegistrationData] = useState({ email: '', password: '', name: '' });
    const { login, register, isAuthenticated, isLoading: authLoading, user, sendOTPToEmail, resetPasswordWithOTP, resetPassword } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');
    const [urlinviteCode, setUrlInviteCode] = useState(false);

    // Forgot password states
    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        email: '',
        otp: '',
        password: '',
        confirmPassword: ''
    });
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: email, 2: otp + password
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);


    const toast = useToast();


    // Form states (moved to top)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        email: '',
        mobile: '', // Will be set by PhoneInput component with default US code
        inviteCode: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    // const {getDialingCodes}=useOther();
    // useEffect(() => {
    //     getDialingCodes();
    // }, [])


    // Handle input changes - optimized with useCallback (no dependencies to prevent recreation)
    const handleLoginInputChange = useCallback((field, value) => {
        setLoginForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (prev[field]) {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            }
            return prev;
        });
    }, []);

    const handleRegisterInputChange = useCallback((field, value) => {
        setRegisterForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (prev[field]) {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            }
            return prev;
        });
    }, []);

    const handleForgotPasswordInputChange = useCallback((field, value) => {
        setForgotPasswordForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (prev[field]) {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            }
            return prev;
        });
    }, []);

    // Optimized phone input handler
    const handlePhoneInputChange = useCallback((value) => {
        setRegisterForm(prev => ({ ...prev, mobile: value }));
        setErrors(prev => {
            if (prev.mobile) {
                const newErrors = { ...prev };
                delete newErrors.mobile;
                return newErrors;
            }
            return prev;
        });
    }, []);

    // Responsive values
    const cardWidth = useBreakpointValue({ base: '95%', sm: '400px', md: '450px' });
    const cardPadding = useBreakpointValue({ base: 4, md: 8 });
    const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });

    // Color mode values
    const bgGradient = useColorModeValue(
        'linear(to-br, blue.50, purple.50, pink.50)',
        'linear(to-br, gray.900, blue.900, purple.900)'
    );
    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const brandColor = useColorModeValue('#4c7d4e', '#4c7d4e');
    const inputBg = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');


    React.useEffect(() => {
        if (!authLoading && isAuthenticated && !hasJustRegistered) {
            const redirectTo = location.state?.from || '/user/dashboard';
            navigate(redirectTo, { replace: true });
        }
    }, [authLoading, isAuthenticated, navigate, location.state, hasJustRegistered]);

    // Handle invite code from URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const inviteCodeFromUrl = urlParams.get('invitecode');

        if (inviteCodeFromUrl) {
            setUrlInviteCode(true);
            setRegisterForm(prev => ({
                ...prev,
                inviteCode: inviteCodeFromUrl
            }));

            // Switch to register tab automatically
            setTabIndex(1);

            toast({
                title: 'Referral Code Applied',
                description: `Invite code "${inviteCodeFromUrl}" has been applied to your registration.`,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        }
    }, [location.search, toast]);
    const handleModalClose = () => {
        onClose();
        setHasJustRegistered(false); // ✅ This triggers the redirect now
    };

    if (authLoading) {
        return (
            <Box
                minH="100vh"
                bgGradient={bgGradient}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <VStack spacing={4}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    <Text color="white" fontSize="lg">
                        Loading...
                    </Text>
                </VStack>
            </Box>
        );
    }

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
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
            // Prepare login credentials
            const credentials = {
                email: loginForm.email,
                password: loginForm.password,
            };

            // Call the login API
            const result = await login(credentials);

            if (result?.status === true) {
                toast({
                    title: 'Login Successful!',
                    description: `Welcome back to NessanForex, ${result.user?.name || 'User'}!`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Reset form
                setLoginForm({
                    email: '',
                    password: '',
                    rememberMe: false
                });

                // Navigation will be handled by useEffect when isAuthenticated becomes true
            } else {
                throw new Error(result.error || 'Login failed');
            }
        } catch (error) {
            toast({
                title: 'Login Failed',
                description: 'Invalid login credentials',
                status: 'error',
                duration: 5000,
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

        if (!registerForm.mobile || registerForm.mobile.trim().length <= 4) {
            newErrors.mobile = 'Phone number is required';
        } else if (!isValidPhoneNumber(registerForm.mobile)) {
            newErrors.mobile = 'Please enter a valid phone number (7-15 digits)';
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
            // Prepare user data for registration
            const userData = {
                name: registerForm.firstName,
                email: registerForm.email,
                mobile: registerForm.mobile, // This includes country code like "+1 1234567890"
                inviteCode: registerForm.inviteCode,
                password: registerForm.password,
            };

            // Call the register API
            const result = await register(userData);

            if (result?.status === true) {
                setRegisteredEmail(registerForm.email);
                setRegisteredPassword(registerForm.password);
                setHasJustRegistered(true); // ✅ Set this to stop auto-redirect in useEffect
                onOpen()
                // Store registration data for the modal
                setRegistrationData({
                    email: registerForm.email,
                    password: registerForm.password,
                    name: registerForm.firstName
                });

                // Show success message
                toast({
                    title: 'Registration Successful!',
                    description: 'Welcome to NessanForex!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Clear the form
                setRegisterForm({
                    firstName: '',
                    email: '',
                    mobile: '', // PhoneInput will reset to default country code
                    inviteCode: '',
                    password: '',
                    confirmPassword: '',
                    agreeToTerms: false
                });





            } else {
                toast({
                    title: 'Registration Failed',
                    description: result?.response?.data?.error?.email[0] || 'Something went wrong. Please try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });

                // throw new Error(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('❌ Registration error:', error);
            // toast({
            //     title: 'Registration Failed',
            //     description: error?.email?.message || 'Something went wrong. Please try again.',
            //     status: 'error',
            //     duration: 5000,
            //     isClosable: true,
            // });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle send OTP for forgot password
    const handleSendOTP = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!forgotPasswordForm.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(forgotPasswordForm.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setOtpLoading(true);
        try {
            const result = await sendOTPToEmail(forgotPasswordForm.email);

            if (result.success) {
                toast({
                    title: 'OTP Sent!',
                    description: 'Please check your email for the verification code.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setIsOTPSent(true);
                setForgotPasswordStep(2);
                setErrors({});
            } else {
                throw new Error(result.error || 'Failed to send OTP');
            }
        } catch (error) {
            toast({
                title: 'Failed to Send OTP',
                description: error.message || 'Please try again',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setOtpLoading(false);
        }
    };

    // Handle reset password with OTP
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!forgotPasswordForm.otp) {
            newErrors.otp = 'OTP is required';
        }

        if (!forgotPasswordForm.password) {
            newErrors.password = 'New password is required';
        } else if (!validatePassword(forgotPasswordForm.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!forgotPasswordForm.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (forgotPasswordForm.password !== forgotPasswordForm.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const result = await resetPassword(
                {
                    email: forgotPasswordForm.email,
                    password: forgotPasswordForm.password,
                    confirm_password: forgotPasswordForm.confirmPassword,
                    otp: forgotPasswordForm.otp

                }
            );

            if (result.success) {
                toast({
                    title: 'Password Reset Successful!',
                    description: 'Your password has been reset. You can now login with your new password.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                // Reset form and go back to login tab
                setForgotPasswordForm({
                    email: '',
                    otp: '',
                    password: '',
                    confirmPassword: ''
                });
                setForgotPasswordStep(1);
                setIsOTPSent(false);
                setTabIndex(0); // Switch to login tab
                setErrors({});
            } else {
                throw new Error(result.error || 'Failed to reset password');
            }
        } catch (error) {
            toast({
                title: 'Password Reset Failed',
                description: error.message || 'Please try again',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle forgot password link click
    const handleForgotPasswordClick = () => {
        setTabIndex(2); // Switch to forgot password tab
        // Clear any existing errors
        setErrors({});
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
            minH="80vh"
            bgGradient={bgGradient}
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={10}
        // pt={{ base: 0, sm: 0, md: 50, lg: 110 }}
        // pb={{ base: 20, sm: 20 }}
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
                // overflow="hidden"
                >
                    <CardBody p={cardPadding}>
                        {/* Header */}
                        <VStack spacing={2} mb={6}>

                            <VStack spacing={1}>
                                {/* <Heading
                                    size={useBreakpointValue({ base: 'lg', md: 'xl' })}
                                    color={textColor}
                                    textAlign="center"
                                >
                                    NessanForex
                                </Heading>
                                <Text color="gray.500" fontSize={fontSize} textAlign="center">
                                    Your trusted trading partner
                                </Text> */}
                                <Image src='assets/images/MagicAutpool Logo.png' />
                            </VStack>
                        </VStack>

                        {/* Tabs */}
                        <Tabs
                            index={tabIndex}
                            onChange={(index) => {
                                setTabIndex(index);
                                // Reset errors when switching tabs
                                setErrors({});
                                // Reset forgot password form when leaving the tab
                                if (index !== 2) {
                                    setForgotPasswordForm({
                                        email: '',
                                        otp: '',
                                        password: '',
                                        confirmPassword: ''
                                    });
                                    setForgotPasswordStep(1);
                                    setIsOTPSent(false);
                                }
                            }}
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
                                {/* <Tab
                                    fontSize={fontSize}
                                    fontWeight="semibold"
                                    _selected={{
                                        bg: brandColor,
                                        color: 'white',
                                        shadow: 'md'
                                    }}
                                >
                                    Reset Password
                                </Tab> */}
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
                                                    onClick={handleForgotPasswordClick}
                                                    cursor="pointer"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </HStack>

                                            <Button
                                                type="button"
                                                onClick={handleLogin}
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
                                                    {/* <FormLabel fontSize={fontSize} color={textColor}>
                                                        Full Name
                                                    </FormLabel> */}
                                                    <Input
                                                        placeholder="Full name"
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

                                            </HStack>

                                            <FormControl isInvalid={errors.email}>
                                                {/* <FormLabel fontSize={fontSize} color={textColor}>
                                                    Email Address
                                                </FormLabel> */}
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
                                            <FormControl isInvalid={errors.mobile}>
                                                {/* <FormLabel fontSize={fontSize} color={textColor}>
                                                    Phone Number
                                                </FormLabel> */}
                                                {/* <PhoneInput
                                                    value={registerForm.mobile}
                                                    onChange={handlePhoneInputChange}
                                                    placeholder="Enter phone number"
                                                    bg={inputBg}
                                                    border="1px"
                                                    borderColor={borderColor}
                                                    _hover={{ borderColor: brandColor }}
                                                    _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                    fontSize={fontSize}
                                                    h="48px"
                                                    isInvalid={errors.mobile}
                                                /> */}
                                                <InputGroup>

                                                    <Input
                                                        placeholder="Enter your phone"
                                                        value={registerForm.mobile}
                                                        onChange={(e) => handleRegisterInputChange('mobile', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                    />
                                                    <InputRightElement h="48px">
                                                        <AiOutlinePhone color="gray" />

                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.mobile}</FormErrorMessage>
                                            </FormControl>



                                            <FormControl isInvalid={errors.email}>
                                                {/* <FormLabel fontSize={fontSize} color={textColor}>
                                                    Invite Code
                                                </FormLabel> */}
                                                <InputGroup>
                                                    <Input
                                                        type="text"
                                                        placeholder="Invite Code"
                                                        value={registerForm.inviteCode}
                                                        onChange={(e) => handleRegisterInputChange('inviteCode', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                        isReadOnly={urlinviteCode}
                                                    />

                                                </InputGroup>
                                                <FormErrorMessage fontSize="sm">{errors.email}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={errors.password}>
                                                {/* <FormLabel fontSize={fontSize} color={textColor}>
                                                    Password
                                                </FormLabel> */}
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
                                                {/* <FormLabel fontSize={fontSize} color={textColor}>
                                                    Confirm Password
                                                </FormLabel> */}
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
                                                type="button"
                                                onClick={handleRegister}
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

                                {/* Forgot Password Panel */}
                                <TabPanel p={0}>
                                    {forgotPasswordStep === 1 ? (
                                        // Step 1: Enter Email
                                        <form onSubmit={handleSendOTP}>
                                            <VStack spacing={4}>
                                                <Text
                                                    fontSize={fontSize}
                                                    color={textColor}
                                                    textAlign="center"
                                                    mb={2}
                                                >
                                                    Enter your email address to receive a verification code
                                                </Text>

                                                <FormControl isInvalid={errors.email}>
                                                    <FormLabel fontSize={fontSize} color={textColor}>
                                                        Email Address
                                                    </FormLabel>
                                                    <InputGroup>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            value={forgotPasswordForm.email}
                                                            onChange={(e) => handleForgotPasswordInputChange('email', e.target.value)}
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

                                                <Button
                                                    type="submit"
                                                    w="full"
                                                    bg={brandColor}
                                                    color="white"
                                                    _hover={{ bg: 'blue.600' }}
                                                    _active={{ bg: 'blue.700' }}
                                                    isLoading={otpLoading}
                                                    loadingText="Sending OTP..."
                                                    size="lg"
                                                    fontSize={fontSize}
                                                    fontWeight="semibold"
                                                    borderRadius="xl"
                                                    h="48px"
                                                >
                                                    Send Verification Code
                                                </Button>

                                                <Text fontSize="sm" color="gray.500" textAlign="center">
                                                    Remember your password?{' '}
                                                    <Link
                                                        color={brandColor}
                                                        fontWeight="medium"
                                                        onClick={() => setTabIndex(0)}
                                                        cursor="pointer"
                                                    >
                                                        Back to Sign In
                                                    </Link>
                                                </Text>
                                            </VStack>
                                        </form>
                                    ) : (
                                        // Step 2: Enter OTP and New Password
                                        <form onSubmit={handleResetPassword}>
                                            <VStack spacing={4}>
                                                <Text
                                                    fontSize={fontSize}
                                                    color={textColor}
                                                    textAlign="center"
                                                    mb={2}
                                                >
                                                    Enter the verification code sent to {forgotPasswordForm.email} and your new password
                                                </Text>

                                                <FormControl isInvalid={errors.otp}>
                                                    <FormLabel fontSize={fontSize} color={textColor}>
                                                        Verification Code (OTP)
                                                    </FormLabel>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter 6-digit code"
                                                        value={forgotPasswordForm.otp}
                                                        onChange={(e) => handleForgotPasswordInputChange('otp', e.target.value)}
                                                        bg={inputBg}
                                                        border="1px"
                                                        borderColor={borderColor}
                                                        _hover={{ borderColor: brandColor }}
                                                        _focus={{ borderColor: brandColor, boxShadow: `0 0 0 1px ${brandColor}` }}
                                                        fontSize={fontSize}
                                                        h="48px"
                                                        maxLength={6}
                                                    />
                                                    <FormErrorMessage fontSize="sm">{errors.otp}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl isInvalid={errors.password}>
                                                    <FormLabel fontSize={fontSize} color={textColor}>
                                                        New Password
                                                    </FormLabel>
                                                    <InputGroup>
                                                        <Input
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder="Enter new password"
                                                            value={forgotPasswordForm.password}
                                                            onChange={(e) => handleForgotPasswordInputChange('password', e.target.value)}
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
                                                        Confirm New Password
                                                    </FormLabel>
                                                    <InputGroup>
                                                        <Input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            placeholder="Confirm new password"
                                                            value={forgotPasswordForm.confirmPassword}
                                                            onChange={(e) => handleForgotPasswordInputChange('confirmPassword', e.target.value)}
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

                                                <Button
                                                    type="submit"
                                                    w="full"
                                                    bg={brandColor}
                                                    color="white"
                                                    _hover={{ bg: 'blue.600' }}
                                                    _active={{ bg: 'blue.700' }}
                                                    isLoading={isLoading}
                                                    loadingText="Resetting Password..."
                                                    size="lg"
                                                    fontSize={fontSize}
                                                    fontWeight="semibold"
                                                    borderRadius="xl"
                                                    h="48px"
                                                    onClick={handleResetPassword}
                                                >
                                                    Reset Password
                                                </Button>

                                                <HStack spacing={4} fontSize="sm" color="gray.500">
                                                    <Link
                                                        color={brandColor}
                                                        fontWeight="medium"
                                                        onClick={() => {
                                                            setForgotPasswordStep(1);
                                                            setIsOTPSent(false);
                                                        }}
                                                        cursor="pointer"
                                                    >
                                                        Change Email
                                                    </Link>
                                                    <Text>•</Text>
                                                    <Link
                                                        color={brandColor}
                                                        fontWeight="medium"
                                                        onClick={() => setTabIndex(0)}
                                                        cursor="pointer"
                                                    >
                                                        Back to Sign In
                                                    </Link>
                                                </HStack>
                                            </VStack>
                                        </form>
                                    )}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                        {/* Social Login */}
                        {/* <Box mt={6}>
                            <HStack>
                                <Divider />
                                <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                                    Or continue with
                                </Text>
                                <Divider />
                            </HStack>

                            <HStack
                                // direction={useBreakpointValue({ base: 'column', sm: 'row' })}
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
                            </HStack>
                        </Box> */}

                        {/* Footer */}
                        <Text
                            textAlign="center"
                            fontSize="sm"
                            color="gray.500"
                            mt={6}
                        >
                            <CountryCodeDropdown />
                            ©2025 MagicAutoPool. All rights reserved.
                        </Text>
                    </CardBody>
                </Card>
            </Container>

            {/* Congratulations Modal */}

            <CongractulationsModalNew
                isOpen={isOpen}
                onClose={handleModalClose}
                email={registeredEmail}
                password={registeredPassword}
            />

        </Box>
    );
});

Login.displayName = 'Login';

export default Login;