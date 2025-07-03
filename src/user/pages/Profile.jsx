import React, { useState, useEffect } from 'react';
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
    Spinner,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { FiEdit2, FiCamera, FiShield, FiEye, FiEyeOff, FiCheck, FiX, FiUpload, FiImage } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';
import { useUser } from '../../Context/UserContext';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const toast = useToast();

    // Camera modal disclosure
    const { isOpen: isCameraOpen, onOpen: onCameraOpen, onClose: onCameraClose } = useDisclosure();
    const fileInputRef = React.createRef();

    // Use User Context
    const {
        profile,
        isLoading,
        error,
        loadUserProfile,
        updateUserProfile,
        changePassword,
        clearError,
        getUserName,
        getUserEmail,
        getUserAvatar,
        isProfileLoaded,
        handleSendOtpProfileUpdate,
        uploadProfilePicture

    } = useUser();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    // Call get user API when component mounts
    useEffect(() => {
        // console.log('🚀 Profile page opened - Calling get user API...');
        loadUserProfile();
    }, []);

    // Console log profile data when it changes
    // useEffect(() => {
    //     if (profile) {
    //         // console.log('✅ User Profile Data Received:', profile);
    //         // console.log('📊 Profile Object:', JSON.stringify(profile, null, 2));
    //     }
    // }, [profile]);

    // Console log any errors
    useEffect(() => {
        if (error) {
            console.error('❌ User Profile Error:', error);
        }
    }, [error]);

    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        mobile: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        otp: '',
        country: '',
        bio: '',
    });

    // Store original data for cancel functionality
    const [originalProfileData, setOriginalProfileData] = useState({});

    // Update local state when profile data is loaded from API
    useEffect(() => {
        if (profile) {     

            // Handle both USER structure and direct profile structure
            const userData = profile?.USER;
            const userAddress = profile?.ADDRESS;

            const newProfileData = {
                name: userData.name || userData.name || userData.name?.split(' ')[0] || '',
                // lastName: userData.lastName || userData.last_name || userData.name?.split(' ').slice(1).join(' ') || '',
                email: userData.email || '',
                mobile: userData.mobile || userData.mobile || userData.mobile || '',
                // dateOfBirth: userData.dateOfBirth || userData.date_of_birth || userData.dob || '',
                address: userAddress?.address_line1 || '',
                city: userAddress?.city || '',
                state: userAddress?.state || '',
                pincode: userAddress?.postal_code || '',
                country: userAddress?.country || '',
                bio: userData.bio || userData.description || userData.about || '',
            };

            setProfileData(newProfileData);
            setOriginalProfileData(newProfileData); // Save original for cancel functionality

        }
    }, [profile]);
    // console.log('🔄 Profile data xxxxxx:', profileData);

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

    const handleProfileUpdate = async () => {
        console.log('📤 Updating profile with data:', profileData);

        try {
            const result = await updateUserProfile(profileData);

            if (result.success) {
                console.log('✅ Profile updated successfully:', result);

                // Update original data with new saved data
                setOriginalProfileData({ ...profileData });

                toast({
                    title: 'Profile Updated',
                    description: result.message || 'Your profile information has been successfully updated.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setIsEditing(false);

                // Reload profile from server to get latest data
                loadUserProfile();
            } else {
                throw new Error(result.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('❌ Profile update failed:', error);
            toast({
                title: 'Update Failed',
                description: error.message || 'Failed to update profile. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle cancel editing
    const handleCancelEdit = () => {
        console.log('❌ Cancelling profile edit, reverting to original data');
        setProfileData({ ...originalProfileData });
        setIsEditing(false);
        toast({
            title: 'Changes Cancelled',
            description: 'All changes have been reverted.',
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
    };

    const handlePasswordChange = async () => {
        // Validation
        if (!passwordData.currentPassword) {
            toast({
                title: 'Current Password Required',
                description: 'Please enter your current password.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!passwordData.newPassword) {
            toast({
                title: 'New Password Required',
                description: 'Please enter a new password.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

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

        if (passwordData.newPassword.length < 6) {
            toast({
                title: 'Password Too Short',
                description: 'Password must be at least 6 characters long.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        console.log('🔑 Profile - Attempting to change password...');

        try {
            // Prepare data for API call
            const passwordChangeData = {
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
                new_password_confirmation: passwordData.confirmPassword
            };

            const result = await changePassword(passwordChangeData);

            if (result.success) {
                console.log('✅ Profile - Password changed successfully:', result);
                toast({
                    title: 'Password Changed',
                    description: result.message || 'Your password has been successfully updated.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Clear form
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } else {
                throw new Error(result.error || 'Failed to change password');
            }
        } catch (error) {
            console.error('❌ Profile - Password change failed:', error);
            toast({
                title: 'Password Change Failed',
                description: error.message || 'Failed to change password. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    // console.log('🔄 Profile data ', profileData);

    const profileCompleteness = 85;

    // Handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast({
                title: 'Invalid File Type',
                description: 'Please select an image file (JPG, PNG, GIF, etc.)',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: 'File Too Large',
                description: 'Please select an image smaller than 5MB',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        await uploadImage(file);
    };

    // Handle camera capture
    const handleCameraCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 }
            });
            setCameraStream(stream);
            onCameraOpen();
        } catch (error) {
            console.error('Camera access error:', error);
            toast({
                title: 'Camera Access Denied',
                description: 'Please allow camera access to capture your photo',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Capture photo from camera
    const capturePhoto = () => {
        const video = document.getElementById('cameraVideo');
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        canvas.toBlob(async (blob) => {
            if (blob) {
                const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
                await uploadImage(file);
                closeCameraModal();
            }
        }, 'image/jpeg', 0.8);
    };

    // Close camera modal and stop stream
    const closeCameraModal = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        setCapturedImage(null);
        onCameraClose();
    };

    // Upload image to server
    const uploadImage = async (file) => {
        try {
            setIsUploadingImage(true);
            console.log('📤 Uploading profile image:', file.name);
            const result = await uploadProfilePicture(file);
            console.log(file);

            if (result.success) {
                console.log('✅ Profile image uploaded successfully:', result);
                toast({
                    title: 'Image Updated',
                    description: 'Your profile image has been updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Reload profile to get updated image
                loadUserProfile();
            } else {
                throw new Error(result.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('❌ Image upload failed:', error);
            toast({
                title: 'Upload Failed',
                description: error.message || 'Failed to upload image. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsUploadingImage(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Cleanup camera stream on unmount
    useEffect(() => {
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraStream]);

    return (
        <Box>
            {/* <HStack justify="space-between" align="center" mb={6}>
                <Heading size="lg">
                    Profile Settings
                </Heading>
                <Button
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        console.log('🔄 Manual API call triggered...'); 
                        loadUserProfile();
                    }}
                    isLoading={isLoading}
                >
                    Refresh Profile
                </Button>
            </HStack> */}

            {/* Loading State */}
            {/* {isLoading && (
                <Center py={8}>
                    <VStack spacing={4}>
                        <Spinner size="xl" color="blue.500" />
                        <Text>Loading profile data...</Text>
                    </VStack>
                </Center>
            )} */}

            {/* Error State */}

            <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={6}>
                {/* Profile Summary */}
                <GridItem>
                    <Card bg={cardBg} border="1px" borderColor={borderColor} mb={6}>
                        <CardBody textAlign="center">
                            <VStack spacing={4}>
                                <Box position="relative">
                                    <Avatar
                                        size="2xl"
                                        name={profile ? `${profile?.USER?.name}`.trim() : 'User'}
                                        src={profile?.USER?.profile_image}
                                        bg="blue.500"
                                        opacity={isUploadingImage ? 0.6 : 1}
                                    />
                                    {isUploadingImage && (
                                        <Box
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            bg="rgba(0,0,0,0.8)"
                                            borderRadius="full"
                                            p={3}
                                        >
                                            <Spinner color="white" size="md" />
                                        </Box>
                                    )}
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            icon={isUploadingImage ? <Spinner size="sm" /> : <FiImage />}
                                            size="sm"
                                            borderRadius="full"
                                            position="absolute"
                                            bottom="0"
                                            right="0"
                                            colorScheme="blue"
                                            aria-label="Change avatar"
                                            isLoading={isUploadingImage}
                                            disabled={isUploadingImage}
                                        />
                                        <MenuList>
                                            <MenuItem
                                                icon={<FiUpload />}
                                                onClick={() => fileInputRef.current?.click()}
                                                isDisabled={isUploadingImage}
                                            >
                                                Upload from Device
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem
                                                icon={<FiCamera />}
                                                onClick={handleCameraCapture}
                                                isDisabled={isUploadingImage}
                                            >
                                                Take Photo with Camera
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>

                                    {/* Hidden file input */}
                                    <Input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                        display="none"
                                    />
                                </Box>

                                <VStack spacing={1}>
                                    <Heading size="md">
                                        {profile ?
                                            `${profile?.USER?.name || 'User'} ${profileData.lastName || ''}`.trim() || 'User'
                                            : 'Loading...'
                                        }
                                    </Heading>
                                    <Text color={textColor}>
                                        {profile ? profile?.USER?.email || 'No email' : 'Loading...'}
                                    </Text>
                                    <HStack spacing={2}>
                                        <Badge colorScheme="green" variant="subtle">
                                            {profile?.verified || profile?.email_verified ? 'Verified' : 'Unverified'}
                                        </Badge>
                                        <Badge colorScheme="purple" variant="subtle">
                                            {profile?.plan || profile?.subscription || 'Basic'}
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
                                            <HStack spacing={2}>
                                                {!isEditing ? (
                                                    <Button
                                                        size="sm"
                                                        leftIcon={<FiEdit2 />}
                                                        onClick={() => { setIsEditing(true); handleSendOtpProfileUpdate(); }}
                                                        variant="outline"
                                                        colorScheme="blue"
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                ) : (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            onClick={handleProfileUpdate}
                                                            colorScheme="blue"
                                                            isLoading={isLoading}
                                                            loadingText="Saving..."
                                                        >
                                                            Save Changes
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={handleCancelEdit}
                                                            variant="outline"
                                                            colorScheme="gray"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                            </HStack>
                                        </HStack>
                                    </CardHeader>
                                    <CardBody pt={0}>
                                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                                            <FormControl>
                                                <FormLabel fontSize="sm">Name</FormLabel>
                                                <Input
                                                    value={profileData?.name}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your first name"
                                                />
                                            </FormControl>

                                            {/* <FormControl>
                                                <FormLabel fontSize="sm">Last Name</FormLabel>
                                                <Input
                                                    value={profileData.lastName}
                                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl> */}

                                            <FormControl>
                                                <FormLabel fontSize="sm">Email</FormLabel>
                                                <Input
                                                    value={profileData.email}
                                                    color={textColor}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your email"
                                                    type="email"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Phone</FormLabel>
                                                <Input
                                                    value={profileData?.mobile || profileData?.phone || ''}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your phone number"
                                                    type="tel"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Date of Birth</FormLabel>
                                                <Input
                                                    type="date"
                                                    value={profileData.dateOfBirth || ''}
                                                    color={textColor}


                                                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Country</FormLabel>
                                                <Select
                                                    value={profileData?.ADDRESS?.country || profileData.country || ''}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
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
                                                    value={profileData.address || ''}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your address"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">City</FormLabel>
                                                <Input
                                                    value={profileData.city}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your city"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">State/Province</FormLabel>
                                                <Input
                                                    value={profileData.state || ''}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your state/province"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Pin Code</FormLabel>
                                                <Input
                                                    value={profileData.pincode || ''}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your Pin code"
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontSize="sm">Otp</FormLabel>
                                                <Input
                                                    value={profileData.otp}
                                                    color={textColor}

                                                    onChange={(e) => setProfileData({ ...profileData, otp: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    placeholder="Enter your email otp code"
                                                />
                                            </FormControl>

                                            <FormControl gridColumn={{ base: '1', md: '1 / -1' }}>
                                                <FormLabel fontSize="sm">Bio</FormLabel>
                                                <Textarea
                                                    value={profileData.bio}
                                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                    isReadOnly={!isEditing}
                                                    bg={isEditing ? 'white' : 'gray.50'}
                                                    rows={3}
                                                    placeholder="Tell us about yourself..."
                                                    resize="vertical"
                                                    color={textColor}
                                                    
                                                />
                                            </FormControl>
                                        </Grid>

                                        {/* {isEditing && (
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
                                        )} */}
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
                                                isLoading={isLoading}
                                                loadingText="Changing Password..."
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

            {/* Camera Modal */}
            <Modal isOpen={isCameraOpen} onClose={closeCameraModal} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Capture Profile Photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            {cameraStream && (
                                <Box position="relative" borderRadius="md" overflow="hidden">
                                    <video
                                        id="cameraVideo"
                                        autoPlay
                                        playsInline
                                        ref={(video) => {
                                            if (video && cameraStream) {
                                                video.srcObject = cameraStream;
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            maxWidth: '400px',
                                            height: 'auto',
                                            transform: 'scaleX(-1)', // Mirror effect
                                        }}
                                    />
                                </Box>
                            )}

                            {!cameraStream && (
                                <Center p={8}>
                                    <VStack>
                                        <Spinner size="xl" />
                                        <Text>Accessing camera...</Text>
                                    </VStack>
                                </Center>
                            )}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={closeCameraModal}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={capturePhoto}
                            disabled={!cameraStream}
                            leftIcon={<FiCamera />}
                        >
                            Capture Photo
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Profile;