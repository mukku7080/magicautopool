import axiosInstance from './axiosInstance';

class AuthService {
    // Login user
    async login(credentials) {
        try {
            const response = await axiosInstance.post('/login', credentials);
            const { token, user } = response.data;

            // Store token and user data
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            // console.log("response", response);

            return response?.data;

        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Register user
    async register(userData) {
        try {
            const response = await axiosInstance.post('/register', userData);
            // Registration doesn't provide token, only user data
            // Token is obtained only during login

            return response?.data;
        } catch (error) {
            return error;
            // throw this.handleError(error);
            
        }
    }

    // Logout user
    async logout() {
        try {
            await axiosInstance.post('/logout');
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call success
            this.clearStoredData();
        }
    }

    // Refresh token
    async refreshToken() {
        try {
            const response = await axiosInstance.post('/auth/refresh');
            const { token } = response.data;

            localStorage.setItem('authToken', token);
            return token;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Forgot password
    async forgotPassword(email) {
        try {
            const response = await axiosInstance.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Reset password
    async resetPassword(data) {
        try {
            const response = await axiosInstance.post('/password-reset', data

            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Verify email with OTP
    async verifyEmailOTP(email, otp) {
        try {
            const response = await axiosInstance.post('/verify-otp', {
                email,
                otp
            });

            if (response.data.token && response.data.user) {
                // Store token and user data after successful verification
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Resend OTP
    async resendOTP(email) {
        try {
            const response = await axiosInstance.post('/resend-otp', { email });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Send OTP to email for password reset
    async sendOTPToEmail(email) {
        try {
            const response = await axiosInstance.post('/verify-email', { email });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Verify email (legacy method for token-based verification)
    async verifyEmail(token) {
        try {
            const response = await axiosInstance.post('/auth/verify-email', { token });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Reset password with OTP
    async resetPasswordWithOTP(email, otp, newPassword, confirmPassword) {
        try {
            const response = await axiosInstance.post('/reset-password', {
                email,
                otp,
                password: newPassword,
                password_confirmation: confirmPassword
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get current user
    async getCurrentUser() {
        try {
            const response = await axiosInstance.get('/auth/me');
            const user = response.data;

            // Update stored user data
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getStoredToken();
        return !!token;
    }

    // Get stored user data
    getStoredUser() {
        try {
            const userData = localStorage.getItem('user');
            if (!userData || userData === 'undefined' || userData === 'null') {
                return null;
            }
            return JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing stored user data:', error);
            // Clear invalid data
            localStorage.removeItem('user');
            return null;
        }
    }

    // Get stored token
    getStoredToken() {
        const token = localStorage.getItem('authToken');
        if (!token || token === 'undefined' || token === 'null') {
            return null;
        }
        return token;
    }

    // Clear all stored auth data
    clearStoredData() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    // Initialize and clean localStorage
    initializeStorage() {
        try {
            // Check if localStorage is available
            if (typeof Storage === 'undefined') {
                console.warn('localStorage is not available');
                return;
            }

            // Clean any corrupted data
            const token = localStorage.getItem('authToken');
            const user = localStorage.getItem('user');

            if (token === 'undefined' || token === 'null') {
                localStorage.removeItem('authToken');
            }

            if (user === 'undefined' || user === 'null') {
                localStorage.removeItem('user');
            }

            // Try to parse user data to ensure it's valid JSON
            if (user && user !== 'undefined' && user !== 'null') {
                try {
                    JSON.parse(user);
                } catch (error) {
                    console.warn('Corrupted user data found, clearing...');
                    localStorage.removeItem('user');
                }
            }
        } catch (error) {
            console.error('Error initializing storage:', error);
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

export default new AuthService();