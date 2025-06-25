import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { forexService } from '../api';

// Initial state
const initialState = {
    currencyPairs: [],
    liveRates: {},
    orders: [],
    positions: [],
    tradingHistory: [],
    marketAnalysis: {},
    economicCalendar: [],
    tradingSignals: [],
    isLoading: false,
    error: null,
};

// Action types
const FOREX_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_CURRENCY_PAIRS: 'SET_CURRENCY_PAIRS',
    SET_LIVE_RATES: 'SET_LIVE_RATES',
    UPDATE_LIVE_RATE: 'UPDATE_LIVE_RATE',
    SET_ORDERS: 'SET_ORDERS',
    ADD_ORDER: 'ADD_ORDER',
    UPDATE_ORDER: 'UPDATE_ORDER',
    REMOVE_ORDER: 'REMOVE_ORDER',
    SET_POSITIONS: 'SET_POSITIONS',
    ADD_POSITION: 'ADD_POSITION',
    UPDATE_POSITION: 'UPDATE_POSITION',
    REMOVE_POSITION: 'REMOVE_POSITION',
    SET_TRADING_HISTORY: 'SET_TRADING_HISTORY',
    SET_MARKET_ANALYSIS: 'SET_MARKET_ANALYSIS',
    SET_ECONOMIC_CALENDAR: 'SET_ECONOMIC_CALENDAR',
    SET_TRADING_SIGNALS: 'SET_TRADING_SIGNALS',
};

// Reducer function
const forexReducer = (state, action) => {
    switch (action.type) {
        case FOREX_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case FOREX_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        case FOREX_ACTIONS.SET_CURRENCY_PAIRS:
            return {
                ...state,
                currencyPairs: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.SET_LIVE_RATES:
            return {
                ...state,
                liveRates: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.UPDATE_LIVE_RATE:
            return {
                ...state,
                liveRates: {
                    ...state.liveRates,
                    [action.payload.pair]: action.payload.rate,
                },
            };

        case FOREX_ACTIONS.SET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.payload],
            };

        case FOREX_ACTIONS.UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? { ...order, ...action.payload } : order
                ),
            };

        case FOREX_ACTIONS.REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload),
            };

        case FOREX_ACTIONS.SET_POSITIONS:
            return {
                ...state,
                positions: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.ADD_POSITION:
            return {
                ...state,
                positions: [...state.positions, action.payload],
            };

        case FOREX_ACTIONS.UPDATE_POSITION:
            return {
                ...state,
                positions: state.positions.map(position =>
                    position.id === action.payload.id ? { ...position, ...action.payload } : position
                ),
            };

        case FOREX_ACTIONS.REMOVE_POSITION:
            return {
                ...state,
                positions: state.positions.filter(position => position.id !== action.payload),
            };

        case FOREX_ACTIONS.SET_TRADING_HISTORY:
            return {
                ...state,
                tradingHistory: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.SET_MARKET_ANALYSIS:
            return {
                ...state,
                marketAnalysis: {
                    ...state.marketAnalysis,
                    [action.payload.pair]: action.payload.analysis,
                },
                isLoading: false,
            };

        case FOREX_ACTIONS.SET_ECONOMIC_CALENDAR:
            return {
                ...state,
                economicCalendar: action.payload,
                isLoading: false,
            };

        case FOREX_ACTIONS.SET_TRADING_SIGNALS:
            return {
                ...state,
                tradingSignals: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

// Create context
const ForexContext = createContext();

// Forex provider component
export const ForexProvider = ({ children }) => {
    const [state, dispatch] = useReducer(forexReducer, initialState);

    // Load initial data
    useEffect(() => {
        loadCurrencyPairs();
        loadLiveRates();
    }, []);

    // Load currency pairs
    const loadCurrencyPairs = async () => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const pairs = await forexService.getCurrencyPairs();
            dispatch({ type: FOREX_ACTIONS.SET_CURRENCY_PAIRS, payload: pairs });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load live rates
    const loadLiveRates = async (pairs = []) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const rates = await forexService.getLiveRates(pairs);
            dispatch({ type: FOREX_ACTIONS.SET_LIVE_RATES, payload: rates });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Update single live rate
    const updateLiveRate = (pair, rate) => {
        dispatch({
            type: FOREX_ACTIONS.UPDATE_LIVE_RATE,
            payload: { pair, rate },
        });
    };

    // Place order
    const placeOrder = async (orderData) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const order = await forexService.placeOrder(orderData);
            dispatch({ type: FOREX_ACTIONS.ADD_ORDER, payload: order });
            return { success: true, order };
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Load orders
    const loadOrders = async (params = {}) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const orders = await forexService.getOrders(params);
            dispatch({ type: FOREX_ACTIONS.SET_ORDERS, payload: orders });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Cancel order
    const cancelOrder = async (orderId) => {
        try {
            await forexService.cancelOrder(orderId);
            dispatch({ type: FOREX_ACTIONS.REMOVE_ORDER, payload: orderId });
            return { success: true };
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Load positions
    const loadPositions = async () => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const positions = await forexService.getPositions();
            dispatch({ type: FOREX_ACTIONS.SET_POSITIONS, payload: positions });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Close position
    const closePosition = async (positionId) => {
        try {
            await forexService.closePosition(positionId);
            dispatch({ type: FOREX_ACTIONS.REMOVE_POSITION, payload: positionId });
            return { success: true };
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Load trading history
    const loadTradingHistory = async (params = {}) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const history = await forexService.getTradingHistory(params);
            dispatch({ type: FOREX_ACTIONS.SET_TRADING_HISTORY, payload: history });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load market analysis
    const loadMarketAnalysis = async (pair) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const analysis = await forexService.getMarketAnalysis(pair);
            dispatch({
                type: FOREX_ACTIONS.SET_MARKET_ANALYSIS,
                payload: { pair, analysis },
            });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load economic calendar
    const loadEconomicCalendar = async (params = {}) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const calendar = await forexService.getEconomicCalendar(params);
            dispatch({ type: FOREX_ACTIONS.SET_ECONOMIC_CALENDAR, payload: calendar });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load trading signals
    const loadTradingSignals = async (params = {}) => {
        try {
            dispatch({ type: FOREX_ACTIONS.SET_LOADING, payload: true });
            const signals = await forexService.getTradingSignals(params);
            dispatch({ type: FOREX_ACTIONS.SET_TRADING_SIGNALS, payload: signals });
        } catch (error) {
            dispatch({ type: FOREX_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: FOREX_ACTIONS.CLEAR_ERROR });
    };

    // Context value
    const value = {
        // State
        currencyPairs: state.currencyPairs,
        liveRates: state.liveRates,
        orders: state.orders,
        positions: state.positions,
        tradingHistory: state.tradingHistory,
        marketAnalysis: state.marketAnalysis,
        economicCalendar: state.economicCalendar,
        tradingSignals: state.tradingSignals,
        isLoading: state.isLoading,
        error: state.error,

        // Actions
        loadCurrencyPairs,
        loadLiveRates,
        updateLiveRate,
        placeOrder,
        loadOrders,
        cancelOrder,
        loadPositions,
        closePosition,
        loadTradingHistory,
        loadMarketAnalysis,
        loadEconomicCalendar,
        loadTradingSignals,
        clearError,
    };

    return (
        <ForexContext.Provider value={value}>
            {children}
        </ForexContext.Provider>
    );
};

// Custom hook to use forex context
export const useForex = () => {
    const context = useContext(ForexContext);
    if (!context) {
        throw new Error('useForex must be used within a ForexProvider');
    }
    return context;
};

export default ForexContext;