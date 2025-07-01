import axiosInstance from './axiosInstance';

class UserService {
    // Get user profile
    async getProfile() {
        try {
            // Using the specific API URL provided
            const response = await axiosInstance.get('/profile');

            console.log('🔍 Raw API Response:', response);
            console.log('📊 Response Data:', response.data);

            // Extract user data from response.data.user structure
            const userData = response.data?.user || response.data;

            console.log('👤 Extracted User Data:', userData);

            return {
                success: true,
                data: userData,
                message: 'Profile loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get profile error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load profile',
                error: error
            };
        }
    }

    // Update user profile
    async updateProfile(profileData) {
        try {
            console.log('📝 Updating profile with data:', profileData);

            const response = await axiosInstance.post('/profile/update', profileData);

            console.log('✅ Update profile response:', response);
            console.log('📊 Updated profile data:', response.data);

            return {
                success: true,
                data: response.data?.user || response.data,
                message: response.data?.message || 'Profile updated successfully'
            };
        } catch (error) {
            console.error('❌ Update profile error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update profile',
                error: error
            };
        }
    }

    async sendUpdateProfileOtp() {
        try {
            const response = await axiosInstance.post('/mail/otpUpdateProfile');
            console.log('✅ otp send response:', response);
            console.log('📊 otp send data:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ otp error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to send otp',
                error: error
            };
        }
    }
    async updateProfile(profileData) {
        try {
            console.log('📝 Updating profile with data:', profileData);

            const response = await axiosInstance.post('/profile/update', profileData);

            console.log('✅ Update profile response:', response);
            console.log('📊 Updated profile data:', response.data);

            return {
                success: true,
                data: response.data?.user || response.data,
                message: response.data?.message || 'Profile updated successfully'
            };
        } catch (error) {
            console.error('❌ Update profile error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update profile',
                error: error
            };
        }
    }

    async SendOtp() {
        try {
            const response = await axiosInstance.post('/mail/otpSent');
            console.log('✅ otp send response:', response);
            console.log('📊 otp send data:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ otp error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to send otp',
                error: error
            };
        }
    }

    async updateWalletAddress(walletDetails) {
        try {
            console.log('📝 Updating profile with data:', walletDetails);

            const response = await axiosInstance.post('/update-wallet-address', walletDetails);

            console.log('✅ Update profile response:', response);
            console.log('📊 Updated profile data:', response.data);

            return {
                success: true,
                data: response.data?.user || response.data,
                message: response.data?.message || 'Profile updated successfully'
            };
        } catch (error) {
            console.error('❌ Update profile error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update profile',
                error: error
            };
        }
    }

    // // Upload profile picture
    // async uploadProfilePicture(file) {
    //     try {
    //         const formData = new FormData();
    //         formData.append('avatar', file);

    //         const response = await axiosInstance.post('/user/upload-avatar', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // Change password
    async changePassword(passwordData) {
        try {
            console.log('🔑 Changing password with data:', {
                ...passwordData,
                currentPassword: '***',
                newPassword: '***'
            });

            const response = await axiosInstance.post('/profile/update-password', passwordData);

            console.log('✅ Change password response:', response);

            return {
                success: true,
                data: response.data,
                message: response.data?.message || 'Password changed successfully'
            };
        } catch (error) {
            console.error('❌ Change password error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to change password',
                error: error
            };
        }
    }

    // Get user dashboard data
    // async getDashboardData() {
    //     try {
    //         const response = await axiosInstance.get('/user/dashboard');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Get user balance
    // async getBalance() {
    //     try {
    //         const response = await axiosInstance.get('/user/balance');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Get transaction history
    // async getTransactions(params = {}) {
    //     try {
    //         const response = await axiosInstance.get('/user/transactions', { params });
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Get user notifications
    // async getNotifications(params = {}) {
    //     try {
    //         const response = await axiosInstance.get('/user/notifications', { params });
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Mark notification as read
    // async markNotificationAsRead(notificationId) {
    //     try {
    //         const response = await axiosInstance.put(`/user/notifications/${notificationId}/read`);
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Mark all notifications as read
    // async markAllNotificationsAsRead() {
    //     try {
    //         const response = await axiosInstance.put('/user/notifications/mark-all-read');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Get user settings
    // async getSettings() {
    //     try {
    //         const response = await axiosInstance.get('/user/settings');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Update user settings
    // async updateSettings(settings) {
    //     try {
    //         const response = await axiosInstance.put('/user/settings', settings);
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Delete user account
    // async deleteAccount(password) {
    //     try {
    //         const response = await axiosInstance.delete('/user/account', {
    //             data: { password }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // // Handle API errors
    // handleError(error) {
    //     if (error.response?.data?.message) {
    //         return new Error(error.response.data.message);
    //     } else if (error.message) {
    //         return new Error(error.message);
    //     } else {
    //         return new Error('An unexpected error occurred');
    //     }
    // }
}

export default new UserService();