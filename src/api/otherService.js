import axiosInstance from './axiosInstance';

class OtherService {
    // Get all support tickets
    async getSupportTickets() {
        try {
            const response = await axiosInstance.post('/support-tickets');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get specific support ticket by ID
    async getSupportTicket(ticketId) {
        try {
            const response = await axiosInstance.post(`/support-tickets`, { ticketId });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Create new support ticket
    async createSupportTicket(ticketData) {
        try {
            const formData = new FormData();
            formData.append('subject', ticketData.subject);
            formData.append('message', ticketData.message);

            // Add attachment if provided
            if (ticketData.attachment) {
                formData.append('attachment', ticketData.attachment);
            }

            const response = await axiosInstance.post('/support-tickets/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Update support ticket status (if needed)
    async updateSupportTicket(ticketId, updateData) {
        try {
            const response = await axiosInstance.put(`/support-tickets/${ticketId}`, updateData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Delete support ticket (if needed)
    async deleteSupportTicket(ticketId) {
        try {
            const response = await axiosInstance.delete(`/support-tickets/${ticketId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get team statistics
    // async getTeamStats() {
    //     try {
    //         const response = await axiosInstance.get('/team/stats');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // Get team members list
    // async getTeamMembers() {
    //     try {
    //         const response = await axiosInstance.get('/my-team');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // Get direct referrals
    async getDirectReferrals() {
        try {
            const response = await axiosInstance.get('/my-team');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get countries with dialing codes
    async getDialingCodes() {
        try {
            const response = await fetch('https://api.onnbit.com/api/countries/dialing-code');
            const result = await response.json();

            if (result.status && result.data) {
                return {
                    status: true,
                    data: result.data
                };
            } else {
                throw new Error(result.message || 'Failed to fetch countries');
            }
        } catch (error) {
            throw this.handleError(error);
        }
    }


    async myTeamLevelView(data) {
        try {
            const response = await axiosInstance.post('/my-team-level-view', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // // Get team history
    // async getTeamHistory() {
    //     try {
    //         const response = await axiosInstance.get('/team/history');
    //         return response.data;
    //     } catch (error) {
    //         throw this.handleError(error);
    //     }
    // }

    // Handle API errors
    handleError(error) {
        if (error.response) {
            // Server responded with error status
            const message = error.response.data?.message || error.response.data?.error || 'An error occurred';
            throw new Error(message);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Network error. Please check your connection.');
        } else {
            // Something else happened
            throw new Error(error.message || 'An unexpected error occurred');
        }
    }
}

export default new OtherService();