import { axiosInstance } from '../api';
// import { API_BASE_URL } from '../config';

class IncomeService {
    // constructor() {
    //     this.baseURL = API_BASE_URL;
    // }

    // Get deposit bonus history (Direct Income)
    async getDepositBonus() {
        try {

            const response = await axiosInstance.get('/deposit-bonus');
            return {
                success: true,
                data: response?.data?.data || [],
                // message: data.message || 'Success'
            };
        } catch (error) {
            console.error('Error fetching deposit bonus:', error);
            return {
                success: false,
                data: [],
                message: error.message || 'Failed to fetch deposit bonus'
            };
        }
    }

    // Get level income history
    async getLevelIncome() {
        try {
            const response = await axiosInstance.get('/level-income');
            console.log("sevice", response?.data || []);

            return {
                success: true,
                data: response?.data || [],
                // message: data.message || 'Success'
            };
        } catch (error) {
            console.error('Error fetching level income:', error);
            return {
                success: false,
                data: [],
                message: error.message || 'Failed to fetch level income'
            };
        }
    }

    // Get mining details (Monthly ROI)
    async getMiningDetails() {
        try {
            const response = await axiosInstance.get('/mining-details');
            console.log(response);
            return {
                success: true,
                data: response?.data || [],
                // message: data.message || 'Success'       
            };
        } catch (error) {
            console.error('Error fetching mining details:', error);
            return {
                success: false,
                data: [],
                message: error.message || 'Failed to fetch mining details'
            };
        }
    }
}

export const incomeService = new IncomeService();