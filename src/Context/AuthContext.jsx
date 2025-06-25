import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../api';

// Initial state
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

// Action types
const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    LOGOUT: 'LOGOUT',
    LOAD_USER: 'LOAD_USER',
    UPDATE_USER: 'UPDATE_USER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_LOADING: 'SET_LOADING',
};

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
        case AUTH_ACTIONS.REGISTER_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
        case AUTH_ACTIONS.REGISTER_SUCCESS:

            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case AUTH_ACTIONS.LOGIN_FAILURE:
        case AUTH_ACTIONS.REGISTER_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };

        case AUTH_ACTIONS.LOGOUT:
            return {
                ...initialState,
                isLoading: false,
            };

        case AUTH_ACTIONS.LOAD_USER:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: !!action.payload.token,
                isLoading: false,
            };

        case AUTH_ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };

        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        case AUTH_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user on app start
    useEffect(() => {
        const loadUser = () => {
            try {
                // Initialize and clean localStorage first
                authService.initializeStorage();

                const token = authService.getStoredToken();
                const user = authService.getStoredUser();


                dispatch({
                    type: AUTH_ACTIONS.LOAD_USER,
                    payload: { user, token },
                });
            } catch (error) {
                console.error('Error loading user:', error);
                dispatch({
                    type: AUTH_ACTIONS.LOAD_USER,
                    payload: { user: null, token: null },
                });
            }
        };

        loadUser();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            dispatch({ type: AUTH_ACTIONS.LOGIN_START });

            const response = await authService.login(credentials);

            // Check if login failed
            if (response?.status === false) {
                dispatch({
                    type: AUTH_ACTIONS.LOGIN_FAILURE,
                    payload: response.message || 'Login failed',
                });
                localStorage.removeItem('authToken');
                return response; // Return early to prevent further execution
            }

            const { user, token } = response;

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: { user, token },
            });

            return response;
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: error.message,
            });

            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            console.log('📤 Registering user with data:', userData);
            dispatch({ type: AUTH_ACTIONS.REGISTER_START });

            const response = await authService.register(userData);
            const credentials = {
                email: userData.email,
                password: userData.password,
            }
            const loginResponse = await authService.login(credentials);
            const { user, token } = loginResponse;
            dispatch({
                type: AUTH_ACTIONS.REGISTER_SUCCESS,
                payload: { user, token },
            });

            console.log('🔄 Dispatched REGISTER_SUCCESS, auth state should be updated');
            return response;
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAILURE,
                payload: error.message,
            });

            return { success: false, error: error.message };
        }
    };
    //  const register = async (userData) => {
    //     try {
    //         dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    //         const { user, token } = await authService.register(userData);

    //         dispatch({
    //             type: AUTH_ACTIONS.REGISTER_SUCCESS,
    //             payload: { user, token },
    //         });

    //         return { success: true, user, token };
    //     } catch (error) {
    //         dispatch({
    //             type: AUTH_ACTIONS.REGISTER_FAILURE,
    //             payload: error.message,
    //         });

    //         return { success: false, error: error.message };
    //     }
    // };

    // Logout function
    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
    };

    // Update user function
    const updateUser = (userData) => {
        dispatch({
            type: AUTH_ACTIONS.UPDATE_USER,
            payload: userData,
        });

        // Update stored user data
        const updatedUser = { ...state.user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    // Clear error function
    const clearError = () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    };

    // Refresh user data
    const refreshUser = async () => {
        try {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
            const user = await authService.getCurrentUser();

            dispatch({
                type: AUTH_ACTIONS.UPDATE_USER,
                payload: user,
            });
        } catch (error) {
            console.error('Failed to refresh user:', error);
        } finally {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            const result = await authService.forgotPassword(email);
            return { success: true, message: result.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Reset password
    const resetPassword = async (token, password) => {
        try {
            const result = await authService.resetPassword(token, password);
            return { success: true, message: result.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Verify email with OTP
    const verifyEmailOTP = async (email, otp) => {
        try {
            const response = await authService.verifyEmailOTP(email, otp);

            // If verification successful and returns user data, update auth state
            if (response.status === true && response.user && response.token) {
                dispatch({
                    type: AUTH_ACTIONS.LOGIN_SUCCESS,
                    payload: { user: response.user, token: response.token },
                });
            }

            return { success: response.status === true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Resend OTP
    const resendOTP = async (email) => {
        try {
            const result = await authService.resendOTP(email);
            return { success: true, message: result.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Context value
    const value = {
        // State
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,

        // Actions
        login,
        register,
        logout,
        updateUser,
        clearError,
        refreshUser,
        forgotPassword,
        resetPassword,
        verifyEmailOTP,
        resendOTP,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;