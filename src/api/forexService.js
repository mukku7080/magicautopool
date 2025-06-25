import axiosInstance from './axiosInstance';

class ForexService {
    // Get currency pairs
    async getCurrencyPairs() {
        try {
            const response = await axiosInstance.get('/forex/currency-pairs');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get live rates
    async getLiveRates(pairs = []) {
        try {
            const params = pairs.length > 0 ? { pairs: pairs.join(',') } : {};
            const response = await axiosInstance.get('/forex/live-rates', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get historical rates
    async getHistoricalRates(pair, timeframe = '1D', limit = 100) {
        try {
            const response = await axiosInstance.get(`/forex/historical-rates/${pair}`, {
                params: { timeframe, limit }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Place a trade order
    async placeOrder(orderData) {
        try {
            const response = await axiosInstance.post('/forex/orders', orderData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user orders
    async getOrders(params = {}) {
        try {
            const response = await axiosInstance.get('/forex/orders', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get order by ID
    async getOrderById(orderId) {
        try {
            const response = await axiosInstance.get(`/forex/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Update order
    async updateOrder(orderId, updateData) {
        try {
            const response = await axiosInstance.put(`/forex/orders/${orderId}`, updateData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Cancel order
    async cancelOrder(orderId) {
        try {
            const response = await axiosInstance.delete(`/forex/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get user positions
    async getPositions() {
        try {
            const response = await axiosInstance.get('/forex/positions');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Close position
    async closePosition(positionId) {
        try {
            const response = await axiosInstance.post(`/forex/positions/${positionId}/close`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get trading history
    async getTradingHistory(params = {}) {
        try {
            const response = await axiosInstance.get('/forex/trading-history', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get market analysis
    async getMarketAnalysis(pair) {
        try {
            const response = await axiosInstance.get(`/forex/market-analysis/${pair}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get economic calendar
    async getEconomicCalendar(params = {}) {
        try {
            const response = await axiosInstance.get('/forex/economic-calendar', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Get trading signals
    async getTradingSignals(params = {}) {
        try {
            const response = await axiosInstance.get('/forex/trading-signals', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Subscribe to trading signals
    async subscribeToSignals(planId) {
        try {
            const response = await axiosInstance.post('/forex/subscribe-signals', { planId });
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

export default new ForexService();