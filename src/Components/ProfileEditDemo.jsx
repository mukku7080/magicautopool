import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
    VStack,
    HStack,
    Grid,
    useToast,
    Alert,
    AlertIcon,
    Badge,
    Text,
    useColorModeValue,
    Divider,
} from '@chakra-ui/react';
import { FiEdit2, FiSave, FiX, FiUser } from 'react-icons/fi';
import { useUser } from '../Context/UserContext';

const ProfileEditDemo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        bio: '',
    });
    const [originalProfileData, setOriginalProfileData] = useState({});

    const {
        profile,
        isLoading,
        error,
        loadUserProfile,
        updateUserProfile,
        getUserName,
        getUserEmail,
        isProfileLoaded
    } = useUser();

    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    // Update local state when profile data is loaded from API
    useEffect(() => {
        if (profile) {
            console.log('🔄 ProfileEditDemo - Updating local profile data with API response...');

            // Handle both USER structure and direct profile structure
            const userData = profile.USER || profile;

            const newProfileData = {
                firstName: userData.firstName || userData.first_name || userData.name?.split(' ')[0] || '',
                lastName: userData.lastName || userData.last_name || userData.name?.split(' ').slice(1).join(' ') || '',
                email: userData.email || '',
                phone: userData.phone || userData.mobile || userData.phone_number || '',
                dateOfBirth: userData.dateOfBirth || userData.date_of_birth || userData.dob || '',
                address: userData.address || userData.street_address || '',
                city: userData.city || '',
                state: userData.state || userData.province || '',
                zipCode: userData.zipCode || userData.zip_code || userData.postal_code || '',
                country: userData.country || '',
                bio: userData.bio || userData.description || userData.about || '',
            };

            setProfileData(newProfileData);
            setOriginalProfileData(newProfileData);
        }
    }, [profile]);

    // Handle profile update
    const handleProfileUpdate = async () => {
        console.log('📤 ProfileEditDemo - Updating profile with data:', profileData);

        try {
            const result = await updateUserProfile(profileData);

            if (result.success) {
                console.log('✅ ProfileEditDemo - Profile updated successfully:', result);

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
            console.error('❌ ProfileEditDemo - Profile update failed:', error);
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
        console.log('❌ ProfileEditDemo - Cancelling profile edit, reverting to original data');
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

    // Check if any field has been changed
    const hasChanges = () => {
        return JSON.stringify(profileData) !== JSON.stringify(originalProfileData);
    };

    // Get field change indicator
    const getFieldBorderColor = (fieldName) => {
        if (!isEditing) return borderColor;
        return profileData[fieldName] !== originalProfileData[fieldName] ? 'orange.300' : borderColor;
    };

    return (
        <Card bg={cardBg} border="1px" borderColor={borderColor} maxW="4xl" mx="auto">
            <CardHeader>
                <HStack justify="space-between" align="center">
                    <HStack spacing={3}>
                        <FiUser size={20} />
                        <Heading size="md">Profile Edit Demo</Heading>
                        <Badge colorScheme={isProfileLoaded() ? 'green' : 'gray'}>
                            {isProfileLoaded() ? 'Profile Loaded' : 'No Profile'}
                        </Badge>
                    </HStack>

                    <HStack spacing={2}>
                        {!isEditing ? (
                            <Button
                                size="sm"
                                leftIcon={<FiEdit2 />}
                                onClick={() => setIsEditing(true)}
                                variant="outline"
                                colorScheme="blue"
                                isDisabled={!isProfileLoaded()}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button
                                    size="sm"
                                    leftIcon={<FiSave />}
                                    onClick={handleProfileUpdate}
                                    colorScheme={hasChanges() ? "blue" : "gray"}
                                    isLoading={isLoading}
                                    loadingText="Saving..."
                                    isDisabled={!hasChanges()}
                                >
                                    Save Changes {hasChanges() && '●'}
                                </Button>
                                <Button
                                    size="sm"
                                    leftIcon={<FiX />}
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
                {error && (
                    <Alert status="error" borderRadius="md" mb={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {!isProfileLoaded() && (
                    <Alert status="info" borderRadius="md" mb={4}>
                        <AlertIcon />
                        Load your profile first to test editing functionality
                    </Alert>
                )}

                <VStack spacing={4}>
                    {/* Current User Info Display */}
                    <Box w="full" p={3} bg="blue.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="bold" mb={1}>Current Profile Info:</Text>
                        <Text fontSize="sm">Name: {getUserName()}</Text>
                        <Text fontSize="sm">Email: {getUserEmail() || 'Not set'}</Text>
                    </Box>

                    <Divider />

                    {/* Editable Form */}
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} w="full">
                        <FormControl>
                            <FormLabel fontSize="sm">
                                First Name
                                {isEditing && profileData.firstName !== originalProfileData.firstName && (
                                    <Badge ml={2} colorScheme="orange" size="sm">Changed</Badge>
                                )}
                            </FormLabel>
                            <Input
                                value={profileData.firstName}
                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                isReadOnly={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                                borderColor={getFieldBorderColor('firstName')}
                                placeholder="Enter your first name"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm">Last Name</FormLabel>
                            <Input
                                value={profileData.lastName}
                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                isReadOnly={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                                placeholder="Enter your last name"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm">Email</FormLabel>
                            <Input
                                value={profileData.email}
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
                                value={profileData.phone}
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
                                value={profileData.dateOfBirth}
                                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                                isReadOnly={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm">Country</FormLabel>
                            <Select
                                value={profileData.country}
                                onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                                isDisabled={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                                placeholder="Select your country"
                            >
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Japan">Japan</option>
                                <option value="Other">Other</option>
                            </Select>
                        </FormControl>

                        <FormControl gridColumn={{ base: '1', md: '1 / -1' }}>
                            <FormLabel fontSize="sm">Address</FormLabel>
                            <Input
                                value={profileData.address}
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
                                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                isReadOnly={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                                placeholder="Enter your city"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm">State/Province</FormLabel>
                            <Input
                                value={profileData.state}
                                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                                isReadOnly={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                                placeholder="Enter your state/province"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize="sm">ZIP Code</FormLabel>
                            <Input
                                value={profileData.zipCode}
                                onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                                isReadOnly={!isEditing}
                                bg={isEditing ? 'white' : 'gray.50'}
                                placeholder="Enter your ZIP code"
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
                            />
                        </FormControl>
                    </Grid>

                    {/* Changes Summary */}
                    {isEditing && hasChanges() && (
                        <Box w="full" p={3} bg="orange.50" borderRadius="md" border="1px" borderColor="orange.200">
                            <Heading size="xs" mb={2} color="orange.700">Pending Changes:</Heading>
                            <VStack spacing={1} align="start" fontSize="xs">
                                {Object.keys(profileData).map(key => {
                                    if (profileData[key] !== originalProfileData[key]) {
                                        return (
                                            <Text key={key} color="orange.600">
                                                • {key}: "{originalProfileData[key] || 'empty'}" → "{profileData[key] || 'empty'}"
                                            </Text>
                                        );
                                    }
                                    return null;
                                })}
                            </VStack>
                        </Box>
                    )}

                    {/* Demo Information */}
                    <Box w="full" p={3} bg="gray.50" borderRadius="md" mt={4}>
                        <Heading size="xs" mb={2}>Demo Features:</Heading>
                        <VStack spacing={1} align="start" fontSize="xs">
                            <Text>✅ Click "Edit Profile" to enable editing</Text>
                            <Text>✅ Form fields become editable with white background</Text>
                            <Text>✅ Orange borders show changed fields</Text>
                            <Text>✅ "Changed" badges on modified fields</Text>
                            <Text>✅ "Save Changes" button shows changes indicator</Text>
                            <Text>✅ "Cancel" button reverts all changes</Text>
                            <Text>✅ Loading states during API calls</Text>
                            <Text>✅ Toast notifications for success/error</Text>
                            <Text>✅ Automatic profile reload after successful save</Text>
                            <Text>📊 Changes summary shows before/after values</Text>
                        </VStack>
                    </Box>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default ProfileEditDemo;