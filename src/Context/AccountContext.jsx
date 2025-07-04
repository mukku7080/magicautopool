import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import accountService from '../api/accountService';
import { useAuth } from './AuthContext';

// Initial state
const initialState = {
    balance: {
        available: 1000, // Mock data for testing
        total: 1500,     // Mock data for testing
        withdrawn: 500   // Mock data for testing
    },
    withdrawHistory: [],
    accountStats: {
        totalAmount: 1500,
        withdrawAmount: 500,
        fees: 0
    },
    isLoading: false,
    error: null,
    withdrawing: false,
    withdrawSuccess: false,
    withdrawRequestResponse: null,
};

// Action types
const ACCOUNT_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_WITHDRAWING: 'SET_WITHDRAWING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_BALANCE: 'SET_BALANCE',
    UPDATE_BALANCE: 'UPDATE_BALANCE',
    SET_WITHDRAW_HISTORY: 'SET_WITHDRAW_HISTORY',
    ADD_WITHDRAW_REQUEST: 'ADD_WITHDRAW_REQUEST',
    SET_ACCOUNT_STATS: 'SET_ACCOUNT_STATS',
    SET_WITHDRAW_SUCCESS: 'SET_WITHDRAW_SUCCESS',
    CLEAR_WITHDRAW_SUCCESS: 'CLEAR_WITHDRAW_SUCCESS',
    SET_WITHDRAW_REQUEST_RESPONSE: 'SET_WITHDRAW_REQUEST_RESPONSE',
    CLEAR_WITHDRAW_REQUEST_RESPONSE: 'CLEAR_WITHDRAW_REQUEST_RESPONSE',
};

// Reducer function
const accountReducer = (state, action) => {
    switch (action.type) {
        case ACCOUNT_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case ACCOUNT_ACTIONS.SET_WITHDRAWING:
            return {
                ...state,
                withdrawing: action.payload,
            };

        case ACCOUNT_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                withdrawing: false,
            };

        case ACCOUNT_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        case ACCOUNT_ACTIONS.SET_BALANCE:
            return {
                ...state,
                balance: action.payload,
                isLoading: false,
            };

        case ACCOUNT_ACTIONS.UPDATE_BALANCE:
            return {
                ...state,
                balance: { ...state.balance, ...action.payload },
            };

        case ACCOUNT_ACTIONS.SET_WITHDRAW_HISTORY:
            return {
                ...state,
                withdrawHistory: action.payload,
                isLoading: false,
            };

        case ACCOUNT_ACTIONS.ADD_WITHDRAW_REQUEST:
            return {
                ...state,
                withdrawHistory: [
                    action.payload,
                    ...(Array.isArray(state.withdrawHistory) ? state.withdrawHistory : [])
                ],

                withdrawing: false,
            };

        case ACCOUNT_ACTIONS.SET_ACCOUNT_STATS:
            return {
                ...state,
                accountStats: action.payload,
                isLoading: false,
            };

        case ACCOUNT_ACTIONS.SET_WITHDRAW_SUCCESS:
            return {
                ...state,
                withdrawSuccess: action.payload,
                withdrawing: false,
            };

        case ACCOUNT_ACTIONS.CLEAR_WITHDRAW_SUCCESS:
            return {
                ...state,
                withdrawSuccess: false,
            };

        case ACCOUNT_ACTIONS.SET_WITHDRAW_REQUEST_RESPONSE:
            return {
                ...state,
                withdrawRequestResponse: action.payload,
            };

        case ACCOUNT_ACTIONS.CLEAR_WITHDRAW_REQUEST_RESPONSE:
            return {
                ...state,
                withdrawRequestResponse: null,
            };

        default:
            return state;
    }
};

// Create context
const AccountContext = createContext();

// Account provider component
export const AccountProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const { isAuthenticated } = useAuth();
    const [startDepositData, setStartDepositData] = React.useState(null);
    const [withdrawRequestDetail, setWithdrawRequestDetail] = useState(null);
    const [deposits,setDeposits]=useState();

    // Load account data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadWithdrawHistory();
        }
    }, [isAuthenticated]);

    // Placeholder functions for commented out services
    const loadAccountBalance = async () => {
        console.log('Load account balance - function disabled');
    };



    // Load account balance
    // const loadAccountBalance = async () => {
    //     try {
    //         dispatch({ type: ACCOUNT_ACTIONS.SET_LOADING, payload: true });
    //         const result = await accountService.getAccountBalance();

    //         console.log('🔄 AccountContext - Processing balance result:', result);

    //         if (result.success) {
    //             console.log('✅ AccountContext - Setting balance data:', result.data);
    //             dispatch({ type: ACCOUNT_ACTIONS.SET_BALANCE, payload: result.data });
    //         } else {
    //             throw new Error(result.message || 'Failed to load balance');
    //         }
    //     } catch (error) {
    //         console.error('❌ Load account balance error:', error);
    //         dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to load account balance' });
    //     }
    // };

    // Load withdraw history
    const loadWithdrawHistory = async (params = {}) => {
        try {
            dispatch({ type: ACCOUNT_ACTIONS.SET_LOADING, payload: true });
            const result = await accountService.getWithdrawHistory(params);


            if (result.success) {
                dispatch({ type: ACCOUNT_ACTIONS.SET_WITHDRAW_HISTORY, payload: result.data });
            } else {
                throw new Error(result.message || 'Failed to load withdraw history');
            }
        } catch (error) {
            console.error('❌ Load withdraw history error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to load withdraw history' });
        }
    };
    const startDeposit = async (request) => {
        try {
            const result = await accountService.startDeposit(request);
            setStartDepositData(result);
            return result;
        }
        catch (error) {
            console.error('❌ Start deposit error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to start deposit' });
        }
    }
    const updateWithdraw = async (request) => {
        try {
            const result = await accountService.updateWithdraw(request);
            return result;
        }
        catch (error) {
            console.error('❌ update withdraw error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to update withdraw' });
        }
    }

    // Load account statistics
    // const loadAccountStats = async () => {
    //     try {
    //         dispatch({ type: ACCOUNT_ACTIONS.SET_LOADING, payload: true });
    //         const result = await accountService.getAccountStats();

    //         console.log('🔄 AccountContext - Processing account stats result:', result);

    //         if (result.success) {
    //             console.log('✅ AccountContext - Setting account stats data:', result.data);
    //             dispatch({ type: ACCOUNT_ACTIONS.SET_ACCOUNT_STATS, payload: result.data });
    //         } else {
    //             throw new Error(result.message || 'Failed to load account statistics');
    //         }
    //     } catch (error) {
    //         console.error('❌ Load account stats error:', error);
    //         dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to load account statistics' });
    //     }
    // };

    // Request withdraw
    const requestWithdraw = async (amount) => {
        try {
            dispatch({ type: ACCOUNT_ACTIONS.SET_WITHDRAWING, payload: true });
            dispatch({ type: ACCOUNT_ACTIONS.CLEAR_ERROR });

            console.log('💰 AccountContext - Requesting withdraw:', { amount });

            const result = await accountService.requestWithdraw(amount);

            console.log('✅ AccountContext - Withdraw request result:', result);

            if (result?.data.status === true) {

                // Store the complete response in the state
                dispatch({ type: ACCOUNT_ACTIONS.SET_WITHDRAW_REQUEST_RESPONSE, payload: result.data });

                // Add the new withdraw request to history
                dispatch({ type: ACCOUNT_ACTIONS.ADD_WITHDRAW_REQUEST, payload: result.data });

                // Update balance (reduce available amount)
                // const currentBalance = state.balance || { available: 1000, total: 1500, withdrawn: 500 };
                // const newBalance = {
                //     ...currentBalance,
                //     available: (currentBalance.available || 1000) - parseFloat(amount),
                //     withdrawn: (currentBalance.withdrawn || 500) + parseFloat(amount)
                // };
                // dispatch({ type: ACCOUNT_ACTIONS.UPDATE_BALANCE, payload: newBalance });

                // Set success state
                setWithdrawRequestDetail(result?.data);
                dispatch({ type: ACCOUNT_ACTIONS.SET_WITHDRAW_SUCCESS, payload: true });

                return {
                    success: true,
                    message: result.message || 'Withdraw request submitted successfully',
                    data: result.data
                };
            } else {
                // Store the failed response as well
                dispatch({ type: ACCOUNT_ACTIONS.SET_WITHDRAW_REQUEST_RESPONSE, payload: result });

                return {
                    success: false,
                    message: result?.data?.message || 'Failed to submit withdraw request',
                };
            }
        } catch (error) {
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to submit withdraw request' });
            return {
                success: false,
                error: error.message || 'Failed to submit withdraw request'
            };
        }
    };

    // Validate withdraw amount
    const validateWithdrawAmount = async (amount) => {
        try {
            // Since the service method is commented out, do basic validation
            if (parseFloat(amount) <= 0) {
                return {
                    success: false,
                    error: 'Amount must be greater than 0'
                };
            }
            if (parseFloat(amount) > getAvailableBalance()) {
                return {
                    success: false,
                    error: 'Amount exceeds available balance'
                };
            }
            return {
                success: true,
                message: 'Amount validation successful'
            };
        } catch (error) {
            console.error('❌ AccountContext - Validate withdraw amount error:', error);
            return {
                success: false,
                error: error.message || 'Failed to validate withdraw amount'
            };
        }
    };
    const depositViaGateway = async (request) => {
        try {
            const result = await accountService.DepositeAssetViaGateWay(request);
            return result;
        }
        catch (error) {
            console.error('❌ Deposit via gateway error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to deposit via gateway' });
        }
    }
    const getDepositViaGateway = async (request) => {
        try {

            const result = await accountService.GetDepositeAssetViaGateWay(request);
            return result;
        }
        catch (error) {
            console.error('❌ Get deposit via gateway error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to get deposit via gateway' });
        }

    }

    const updateDepositViaGateway = async (request) => {
        try {

            const result = await accountService.UpdateDepositeAssetViaGateWay(request);
            return result;
        }
        catch (error) {
            console.error('❌ update deposit via gateway error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to update deposit via gateway' });
        }

    }
    const handleGetDeposit = async () => {
        try {

            const result = await accountService.getDeposit();
            console.log("getdeposit", result?.data?.deposits);
            setDeposits(result?.data?.deposits);
            return result?.data?.deposits;

        }
        catch (error) {
            console.error('❌ get deposit  error:', error);
            dispatch({ type: ACCOUNT_ACTIONS.SET_ERROR, payload: error.message || 'Failed to get deposit error' });
        }

    }

    // Clear error
    const clearError = () => {
        dispatch({ type: ACCOUNT_ACTIONS.CLEAR_ERROR });
    };

    // Clear withdraw success
    const clearWithdrawSuccess = () => {
        dispatch({ type: ACCOUNT_ACTIONS.CLEAR_WITHDRAW_SUCCESS });
    };

    // Clear withdraw request response
    const clearWithdrawRequestResponse = () => {
        dispatch({ type: ACCOUNT_ACTIONS.CLEAR_WITHDRAW_REQUEST_RESPONSE });
    };

    // Refresh account data
    const refreshAccountData = async () => {
        await Promise.all([
            loadAccountBalance(),
            // loadWithdrawHistory(),
            // loadAccountStats()
        ]);
    };

    // Helper functions
    const getAvailableBalance = () => {
        return state.balance?.available || 1000; // Mock data for testing
    };

    const getTotalBalance = () => {
        return state.balance?.total || 1500; // Mock data for testing
    };

    const getTotalWithdrawn = () => {
        return state.balance?.withdrawn || 500; // Mock data for testing
    };

    const getWithdrawHistoryCount = () => {
        return (state.withdrawHistory || []).length;
    };

    const getPendingWithdraws = () => {
        return (state.withdrawHistory || []).filter(item => item.status === 'pending');
    };

    const getSuccessfulWithdraws = () => {
        return (state.withdrawHistory || []).filter(item => item.status === 'success');
    };
    const handleJoinPackage = async (request) => {
        try {
            const result = await accountService.JoinPackage(request);
            return result;
        }
        catch (error) {
            console.error('❌ Join Package error:', error);
        }
    }

    const value = {
        // State
        ...state,

        // Actions
        loadAccountBalance,
        loadWithdrawHistory,
        // loadAccountStats,
        requestWithdraw,
        validateWithdrawAmount,
        clearError,
        clearWithdrawSuccess,
        clearWithdrawRequestResponse,
        refreshAccountData,
        handleGetDeposit,
        deposits,

        // Helper functions
        getAvailableBalance,
        getTotalBalance,
        getTotalWithdrawn,
        getWithdrawHistoryCount,
        getPendingWithdraws,
        getSuccessfulWithdraws,
        startDeposit,
        startDepositData,
        depositViaGateway,
        getDepositViaGateway,
        updateDepositViaGateway,
        updateWithdraw,
        withdrawRequestDetail,
        handleJoinPackage
    };

    // Debug log to check if withdrawRequestResponse is in the context
    console.log('AccountContext - withdrawRequestResponse in state:', state.withdrawRequestResponse);

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
};

// Custom hook to use account context
export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};

export default AccountContext;