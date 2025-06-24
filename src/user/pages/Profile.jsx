import React, { useState } from 'react';
import {
    Box,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Avatar,
    Badge,
    Divider,
    useColorModeValue,
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Select,
    Textarea,
    Switch,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Progress,
    Icon,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { FiEdit2, FiCamera, FiShield, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-01-15',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        bio: 'Experienced forex trader with 5+ years in the market.',
    });

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: true,
        emailNotifications: true,
        smsNotifications: false,
        loginAlerts: true,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleProfileUpdate = () => {
        toast({
            title: 'Profile Updated',
            description: 'Your profile information has been successfully updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setIsEditing(false);
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: 'Password Mismatch',
                description: 'New password and confirm password do not match.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Password Changed',
            description: 'Your password has been successfully updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const profileCompleteness = 85;

    return (
        <Box>
            <Heading size="lg" mb={6}>
                Profile Settings
            </Heading>

            <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={6}>
                {/* Profile Summary */}
                <GridItem>
                    <Card bg={cardBg} border="1px" borderColor={borderColor} mb={6}>
                        <CardBody textAlign="center">
                            <VStack spacing={4}>
                                <Box position="relative">
                                    <Avatar
                                        size="2xl"
                                        name="John Doe"
                                        bg="blue.500"
                                    />
                                    <IconButton
                                        icon={<FiCamera />}
                                        size="sm"
                                        borderRadius="full"
                                        position="absolute"
                                        bottom="0"
                                        right="0"
                                        colorScheme="blue"
                                        aria-label="Change avatar"
                                    />
                                </Box>
                                
                                <VStack spacing={1}>
                                    <Heading size="md">John Doe</Heading>
                                    <Text color={textColor}>john.doe@example.com</Text>
                                    <HStack spacing={2}>
                                        <Badge colorScheme="green" variant="subtle">
                                            Verified
                                        </Badge>
                                        <Badge colorScheme="purple" variant="subtle">
                                            Premium
                                        </Badge>
                                    </HStack>
                                </VStack>

                                <Box w="full">
                                    <HStack justify="space-between" mb={2}>
                                        <Text fontSize="sm" color={textColor}>
                                            Profile Completeness
                                        </Text>
                                        <Text fontSize="sm" fontWeight="medium">
                                            {profileCompleteness}%
                                        </Text>
                                    </HStack>
                                    <Progress
                                        value={profileCompleteness}
                                        colorScheme="blue"
                                        size="sm"
                                        borderRadius="full"
                                    />
                                </Box>
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* Account Status */}
                    <Card bg={cardBg} border="1px" borderColor={borderColor}>
                        <CardHeader>
                            <Heading size="sm">Account Status</Heading>
                        </CardHeader>
                        <CardBody pt={0}>
                            <VStack spacing={3} align="stretch">
                                <HStack justify="space-between">
                                    <HStack>
                                        <Icon as={FiShield} color="green.500" />
                                        <Text fontSize="sm">Email Verified</Text>
                                    </HStack>
                                    <Icon as={FiCheck} color="green.500" />
                                </HStack>
                                <HStack justify="space-between">
                                    <HStack>
                                        <Icon as={AiOutlinePhone} color="green.500" />
                                        <Text fontSize="sm">Phone Verified</Text>
                                    </HStack>
                                    <Icon as={FiCheck} color="green.500" />
                                </HStack>
                                <HStack justify="space-between">
                                    <HStack>
                                        <Icon as={AiOutlineUser} color="orange.500" />
                                        <Text fontSize="sm">KYC Pending</Text>
                                    </HStack>
                                    <Icon as={FiX} color="orange.500" />
                                </HStack>
                            </VStack>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Profile Details */}
                <GridItem>
                    <Tabs variant="enclosed" colorScheme="blue">
                        <TabList>
                            <Tab>Personal Information</Tab>
                            <Tab>Security Settings</Tab>
                            <Tab>Change Password</Tab>
                        </TabList>

                        <TabPanels>
                            {/* Personal Information Tab */}
                            <TabPanel p={0} pt={6}>
                                <Card bg={cardBg} border="1px" borderColor={borderColor}>
                                    <CardHeader>
                                        <HStack justify="space-between">
                                            <Heading size="md">Personal Information</Heading>
                                            <Button
                                                size="sm"
                                                leftIcon={<FiEdit2 />}
                                                onClick={() => setIsEditing(!isEditing)}
                                                variant={isEditing ? 'solid' : 'outline'}
                                                colorScheme="blue"
                                            >
                                                {isEditing ? 'Cancel' : 'Edit'}
                                            </Button>
                                        </HStack>
                                    </CardHeader>
                                    <CardBody pt={0}>
                                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                                            <FormControl>
                                                <FormLabel fontSize="sm">First Name</FormLabel>
                                                <Input
                                                    value={profileData.firstName}
                                                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Last Name</FormLabel>
                                                <Input
                                                    value={profileData.lastName}
                                                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Email</FormLabel>
                                                <Input
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Phone</FormLabel>
                                                <Input
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Date of Birth</FormLabel>
                                                <Input
                                                    type="date"
                                                    value={profileData.dateOfBirth}
                                                    onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Country</FormLabel>
                                                <Select
                                                    value={profileData.country}
                                                    onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                                                    isDisabled={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                >
                                                    <option value="United States">United States</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Australia">Australia</option>
                                                </Select>
                                            </FormControl>

                                            <FormControl gridColumn={{ base: '1', md: '1 / -1' }}>
                                                <FormLabel fontSize="sm">Address</FormLabel>
                                                <Input
                                                    value={profileData.address}
                                                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">City</FormLabel>
                                                <Input
                                                    value={profileData.city}
                                                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">ZIP Code</FormLabel>
                                                <Input
                                                    value={profileData.zipCode}
                                                    onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl gridColumn={{ base: '1', md: '1 / -1' }}>
                                                <FormLabel fontSize="sm">Bio</FormLabel>
                                                <Textarea
                                                    value={profileData.bio}
                                                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    rows={3}
                                                />
                                            </FormControl>
                                        </Grid>

                                        {isEditing && (
                                            <HStack spacing={3} mt={6} justify="flex-end">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={handleProfileUpdate}
                                                >
                                                    Save Changes
                                                </Button>
                                            </HStack>
                                        )}
                                    </CardBody>
                                </Card>
                            </TabPanel>

                            {/* Security Settings Tab */}
                            <TabPanel p={0} pt={6}>
                                <Card bg={cardBg} border="1px" borderColor={borderColor}>
                                    <CardHeader>
                                        <Heading size="md">Security Settings</Heading>
                                    </CardHeader>
                                    <CardBody pt={0}>
                                        <VStack spacing={6} align="stretch">
                                            <Alert status="info" borderRadius="lg">
                                                <AlertIcon />
                                                <Box>
                                                    <AlertTitle>Security Tip!</AlertTitle>
                                                    <AlertDescription>
                                                        Enable two-factor authentication for enhanced account security.
                                                    </AlertDescription>
                                                </Box>
                                            </Alert>

                                            <VStack spacing={4} align="stretch">
                                                <HStack justify="space-between">
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="medium">Two-Factor Authentication</Text>
                                                        <Text fontSize="sm" color={textColor}>
                                                            Add an extra layer of security to your account
                                                        </Text>
                                                    </VStack>
                                                    <Switch
                                                        isChecked={securitySettings.twoFactorAuth}
                                                        onChange={(e) => setSecuritySettings({
                                                            ...securitySettings,
                                                            twoFactorAuth: e.target.checked
                                                        })}
                                                        colorScheme="blue"
                                                    />
                                                </HStack>

                                                <Divider />

                                                <HStack justify="space-between">
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="medium">Email Notifications</Text>
                                                        <Text fontSize="sm" color={textColor}>
                                                            Receive email alerts for account activities
                                                        </Text>
                                                    </VStack>
                                                    <Switch
                                                        isChecked={securitySettings.emailNotifications}
                                                        onChange={(e) => setSecuritySettings({
                                                            ...securitySettings,
                                                            emailNotifications: e.target.checked
                                                        })}
                                                        colorScheme="blue"
                                                    />
                                                </HStack>

                                                <Divider />

                                                <HStack justify="space-between">
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="medium">SMS Notifications</Text>
                                                        <Text fontSize="sm" color={textColor}>
                                                            Receive SMS alerts for important activities
                                                        </Text>
                                                    </VStack>
                                                    <Switch
                                                        isChecked={securitySettings.smsNotifications}
                                                        onChange={(e) => setSecuritySettings({
                                                            ...securitySettings,
                                                            smsNotifications: e.target.checked
                                                        })}
                                                        colorScheme="blue"
                                                    />
                                                </HStack>

                                                <Divider />

                                                <HStack justify="space-between">
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="medium">Login Alerts</Text>
                                                        <Text fontSize="sm" color={textColor}>
                                                            Get notified when someone logs into your account
                                                        </Text>
                                                    </VStack>
                                                    <Switch
                                                        isChecked={securitySettings.loginAlerts}
                                                        onChange={(e) => setSecuritySettings({
                                                            ...securitySettings,
                                                            loginAlerts: e.target.checked
                                                        })}
                                                        colorScheme="blue"
                                                    />
                                                </HStack>
                                            </VStack>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            </TabPanel>

                            {/* Change Password Tab */}
                            <TabPanel p={0} pt={6}>
                                <Card bg={cardBg} border="1px" borderColor={borderColor}>
                                    <CardHeader>
                                        <Heading size="md">Change Password</Heading>
                                    </CardHeader>
                                    <CardBody pt={0}>
                                        <VStack spacing={4} align="stretch">
                                            <Alert status="warning" borderRadius="lg">
                                                <AlertIcon />
                                                <Box>
                                                    <AlertTitle>Password Requirements</AlertTitle>
                                                    <AlertDescription>
                                                        Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.
                                                    </AlertDescription>
                                                </Box>
                                            </Alert>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Current Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type={showCurrentPassword ? 'text' : 'password'}
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({
                                                            ...passwordData,
                                                            currentPassword: e.target.value
                                                        })}
                                                        placeholder="Enter current password"
                                                    />
                                                    <InputRightElement>
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                            icon={showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                                                            aria-label="Toggle password visibility"
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">New Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({
                                                            ...passwordData,
                                                            newPassword: e.target.value
                                                        })}
                                                        placeholder="Enter new password"
                                                    />
                                                    <InputRightElement>
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                            icon={showNewPassword ? <FiEyeOff /> : <FiEye />}
                                                            aria-label="Toggle password visibility"
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Confirm New Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({
                                                            ...passwordData,
                                                            confirmPassword: e.target.value
                                                        })}
                                                        placeholder="Confirm new password"
                                                    />
                                                    <InputRightElement>
                                                        <IconButton
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                                            aria-label="Toggle password visibility"
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>

                                            <Button
                                                colorScheme="blue"
                                                onClick={handlePasswordChange}
                                                isDisabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                            >
                                                Change Password
                                            </Button>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default Profile;