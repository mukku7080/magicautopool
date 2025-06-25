import axiosInstance from './axiosInstance';

class UserService {
    // Get user profile
    async getProfile() {
        try {
            const response = await axiosInstance.get('/user/profile');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Update user profile
    async updateProfile(profileData) {
        try {
            const response = await axiosInstance.put('/user/profile', profileData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Upload profile picture
    async uploadProfilePicture(file) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await axiosInstance.post('/user/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Change password
    async changePassword(passwordData) {
        try {
            const response = await axiosInstance.put('/user/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user dashboard data
    async getDashboardData() {
        try {
            const response = await axiosInstance.get('/user/dashboard');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user balance
    async getBalance() {
        try {
            const response = await axiosInstance.get('/user/balance');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get transaction history
    async getTransactions(params = {}) {
        try {
            const response = await axiosInstance.get('/user/transactions', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user notifications
    async getNotifications(params = {}) {
        try {
            const response = await axiosInstance.get('/user/notifications', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Mark notification as read
    async markNotificationAsRead(notificationId) {
        try {
            const response = await axiosInstance.put(`/user/notifications/${notificationId}/read`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Mark all notifications as read
    async markAllNotificationsAsRead() {
        try {
            const response = await axiosInstance.put('/user/notifications/mark-all-read');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user settings
    async getSettings() {
        try {
            const response = await axiosInstance.get('/user/settings');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Update user settings
    async updateSettings(settings) {
        try {
            const response = await axiosInstance.put('/user/settings', settings);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Delete user account
    async deleteAccount(password) {
        try {
            const response = await axiosInstance.delete('/user/account', {
                data: { password }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Handle API errors
    handleError(error) {
        if (error.response?.data?.message) {
            return new Error(error.response.data.message);
        } else if (error.message) {
            return new Error(error.message);
        } else {
            return new Error('An unexpected error occurred');
        }
    }
}

export default new UserService();