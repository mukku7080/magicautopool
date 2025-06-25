import React, { useState } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    useToast,
    Alert,
    AlertIcon,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useUser } from '../Context/UserContext';

const ChangePasswordDemo = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { changePassword, isLoading, error } = useUser();
    const toast = useToast();

    const handlePasswordChange = async () => {
        // Validation
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast({
                title: 'All Fields Required',
                description: 'Please fill in all password fields.',
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

        console.log('🔑 ChangePasswordDemo - Attempting to change password...');

        try {
            const passwordChangeData = {
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
                new_password_confirmation: passwordData.confirmPassword
            };

            const result = await changePassword(passwordChangeData);

            if (result.success) {
                console.log('✅ ChangePasswordDemo - Password changed successfully:', result);
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
            }
        } catch (error) {
            console.error('❌ ChangePasswordDemo - Password change failed:', error);
        }
    };

    return (
        <Card maxW="md" mx="auto">
            <CardHeader>
                <Heading size="md" textAlign="center">
                    Change Password Demo
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack spacing={4}>
                    {error && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

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
                        width="full"
                        onClick={handlePasswordChange}
                        isLoading={isLoading}
                        loadingText="Changing Password..."
                        isDisabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                        Change Password
                    </Button>

                    <Box p={3} bg="gray.50" borderRadius="md" w="full">
                        <Heading size="xs" mb={2}>API Endpoint:</Heading>
                        <Box fontSize="xs" fontFamily="mono">
                            PUT https://api.magicautopool.com/api/profile/update-password
                        </Box>
                        <Box fontSize="xs" mt={2}>
                            <strong>Payload:</strong> current_password, new_password, new_password_confirmation
                        </Box>
                    </Box>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default ChangePasswordDemo;