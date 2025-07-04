import axios from 'axios';
import axiosInstance from './axiosInstance';

class AccountService {
    // Request withdraw
    async requestWithdraw(amount) {
        try {

            const response = await axiosInstance.post('/request-withdraw', {
                amount: parseFloat(amount)
            });


            return {
                success: true,
                data: response.data,
            };

        } catch (error) {
            console.error('❌ Withdraw request error:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to submit withdraw request',
                error
            };
        }
    }

    // Get withdraw history
    async getWithdrawHistory(params = {}) {
        try {

            const response = await axiosInstance.get('/withdraw-history', {
                params: params
            });


            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || 'Withdraw history loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get withdraw history error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load withdraw history',
                error: error
            };
        }
    }

    async startDeposit(request) {
        try {

            const response = await axiosInstance.post('/start-deposit', request);

            console.log('✅ Withdraw history response:', response);

            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || 'Withdraw history loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get withdraw history error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load withdraw history',
                error: error
            };
        }
    }
    async getDeposit() {
        try {

            const response = await axiosInstance.get('/deposits');

            console.log('✅ get deposit response:', response);

            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || 'deposit history loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get deposit history error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load deposit history',
                error: error
            };
        }
    }


    async updateWithdraw(request) {
        try {

            const response = await axiosInstance.post('/update-withdraw', request);

            console.log('✅update Withdraw response:', response);

            return {
                success: true,
                data: response.data?.data || response.data,
                message: response.data?.message || 'Withdraw updated successfully'
            };
        } catch (error) {
            console.error('❌ update withdraw  error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update withdraw ',
                error: error
            };
        }
    }


    async DepositeAssetViaGateWay(request) {
        try {

            const response = await axios.post('https://api.zipwallet.net/api/deposit-asset', request);


            return {
                success: true,
                data: response?.data || response,
                message: response.data?.message || 'Withdraw history loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get withdraw history error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load withdraw history',
                error: error
            };
        }
    }

    async GetDepositeAssetViaGateWay(request) {
        try {

            const response = await axios.get(`https://api.zipwallet.net/api/deposit-details?access_key=${request.access_key}&client_id=${request.client_id}`);
            return {
                success: true,
                data: response?.data || response,
                message: response.data?.message || 'Withdraw history loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get withdraw history error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load withdraw history',
                error: error
            };
        }
    }

    async UpdateDepositeAssetViaGateWay(request) {
        try {

            const response = await axiosInstance.post('/update-deposit', request);
            return {
                success: true,
                data: response?.data || response,
                message: response.data?.message || 'Withdraw history loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get withdraw history error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load withdraw history',
                error: error
            };
        }
    }

    // Get account balance
    async getAccountBalance() {
        try {
            console.log('💰 Getting account balance');

            const response = await axiosInstance.get('/account-balance');

            console.log('✅ Account balance response:', response);

            return {
                success: true,
                data: response.data,
                message: response.data?.message || 'Account balance loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get account balance error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load account balance',
                error: error
            };
        }
    }

    // Get account statistics
    async getAccountStats() {
        try {
            console.log('📊 Getting account statistics');

            const response = await axiosInstance.get('/account-stats');

            console.log('✅ Account stats response:', response);

            return {
                success: true,
                data: response.data,
                message: response.data?.message || 'Account statistics loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get account stats error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load account statistics',
                error: error
            };
        }
    }

    // // Validate withdraw amount
    async validateWithdrawAmount(amount) {
        try {
            console.log('🔍 Validating withdraw amount:', amount);

            const response = await axiosInstance.post('/validate-withdraw', {
                amount: parseFloat(amount)
            });

            console.log('✅ Validation response:', response);

            return {
                success: true,
                data: response.data,
                message: response.data?.message || 'Amount validation successful'
            };
        } catch (error) {
            console.error('❌ Validate withdraw amount error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to validate withdraw amount',
                error: error
            };
        }
    }

    async JoinPackage(request) {
        try {

            const response = await axiosInstance.post('/stake-amount', request);

            console.log('✅ join package response:', response);

            return {
                success: true,
                data: response.data,
                message: response?.data?.message || 'Account statistics loaded successfully'
            };
        } catch (error) {
            console.error('❌ Get account stats error:', error);
            throw {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to load account statistics',
                error: error
            };
        }
    }
}

export default new AccountService();