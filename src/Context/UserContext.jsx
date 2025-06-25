import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { userService } from '../api';
import { useAuth } from './AuthContext';

// Initial state
const initialState = {
    profile: null,
    balance: 0,
    transactions: [],
    notifications: [],
    settings: {},
    dashboardData: {},
    isLoading: false,
    error: null,
};

// Action types
const USER_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_PROFILE: 'SET_PROFILE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    SET_BALANCE: 'SET_BALANCE',
    UPDATE_BALANCE: 'UPDATE_BALANCE',
    SET_TRANSACTIONS: 'SET_TRANSACTIONS',
    ADD_TRANSACTION: 'ADD_TRANSACTION',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
    MARK_ALL_NOTIFICATIONS_READ: 'MARK_ALL_NOTIFICATIONS_READ',
    SET_SETTINGS: 'SET_SETTINGS',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    SET_DASHBOARD_DATA: 'SET_DASHBOARD_DATA',
};

// Reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case USER_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case USER_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case USER_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        case USER_ACTIONS.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                isLoading: false,
            };

        case USER_ACTIONS.UPDATE_PROFILE:
            return {
                ...state,
                profile: { ...state.profile, ...action.payload },
            };

        case USER_ACTIONS.SET_BALANCE:
            return {
                ...state,
                balance: action.payload,
                isLoading: false,
            };

        case USER_ACTIONS.UPDATE_BALANCE:
            return {
                ...state,
                balance: action.payload,
            };

        case USER_ACTIONS.SET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
                isLoading: false,
            };

        case USER_ACTIONS.ADD_TRANSACTION:
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
            };

        case USER_ACTIONS.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
                isLoading: false,
            };

        case USER_ACTIONS.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications],
            };

        case USER_ACTIONS.MARK_NOTIFICATION_READ:
            return {
                ...state,
                notifications: state.notifications.map(notification =>
                    notification.id === action.payload
                        ? { ...notification, read: true }
                        : notification
                ),
            };

        case USER_ACTIONS.MARK_ALL_NOTIFICATIONS_READ:
            return {
                ...state,
                notifications: state.notifications.map(notification => ({
                    ...notification,
                    read: true,
                })),
            };

        case USER_ACTIONS.SET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                isLoading: false,
            };

        case USER_ACTIONS.UPDATE_SETTINGS:
            return {
                ...state,
                settings: { ...state.settings, ...action.payload },
            };

        case USER_ACTIONS.SET_DASHBOARD_DATA:
            return {
                ...state,
                dashboardData: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

// Create context
const UserContext = createContext();

// User provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { isAuthenticated } = useAuth();

    // Load user data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadUserProfile();
            loadUserBalance();
            loadUserNotifications();
            loadUserSettings();
        }
    }, [isAuthenticated]);

    // Load user profile
    const loadUserProfile = async () => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            const profile = await userService.getProfile();
            dispatch({ type: USER_ACTIONS.SET_PROFILE, payload: profile });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Update user profile
    const updateUserProfile = async (profileData) => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            const updatedProfile = await userService.updateProfile(profileData);
            dispatch({ type: USER_ACTIONS.UPDATE_PROFILE, payload: updatedProfile });
            return { success: true, profile: updatedProfile };
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Upload profile picture
    const uploadProfilePicture = async (file) => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            const result = await userService.uploadProfilePicture(file);
            dispatch({ type: USER_ACTIONS.UPDATE_PROFILE, payload: { avatar: result.avatarUrl } });
            return { success: true, avatarUrl: result.avatarUrl };
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Change password
    const changePassword = async (passwordData) => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            await userService.changePassword(passwordData);
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
            return { success: true };
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Load user balance
    const loadUserBalance = async () => {
        try {
            const balanceData = await userService.getBalance();
            dispatch({ type: USER_ACTIONS.SET_BALANCE, payload: balanceData.balance });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load transactions
    const loadTransactions = async (params = {}) => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            const transactions = await userService.getTransactions(params);
            dispatch({ type: USER_ACTIONS.SET_TRANSACTIONS, payload: transactions });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load notifications
    const loadUserNotifications = async (params = {}) => {
        try {
            const notifications = await userService.getNotifications(params);
            dispatch({ type: USER_ACTIONS.SET_NOTIFICATIONS, payload: notifications });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Mark notification as read
    const markNotificationAsRead = async (notificationId) => {
        try {
            await userService.markNotificationAsRead(notificationId);
            dispatch({ type: USER_ACTIONS.MARK_NOTIFICATION_READ, payload: notificationId });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Mark all notifications as read
    const markAllNotificationsAsRead = async () => {
        try {
            await userService.markAllNotificationsAsRead();
            dispatch({ type: USER_ACTIONS.MARK_ALL_NOTIFICATIONS_READ });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Load user settings
    const loadUserSettings = async () => {
        try {
            const settings = await userService.getSettings();
            dispatch({ type: USER_ACTIONS.SET_SETTINGS, payload: settings });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Update user settings
    const updateUserSettings = async (settingsData) => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            const updatedSettings = await userService.updateSettings(settingsData);
            dispatch({ type: USER_ACTIONS.UPDATE_SETTINGS, payload: updatedSettings });
            return { success: true, settings: updatedSettings };
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Load dashboard data
    const loadDashboardData = async () => {
        try {
            dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
            const dashboardData = await userService.getDashboardData();
            dispatch({ type: USER_ACTIONS.SET_DASHBOARD_DATA, payload: dashboardData });
        } catch (error) {
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
        }
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
    };

    // Context value
    const value = {
        // State
        profile: state.profile,
        balance: state.balance,
        transactions: state.transactions,
        notifications: state.notifications,
        settings: state.settings,
        dashboardData: state.dashboardData,
        isLoading: state.isLoading,
        error: state.error,

        // Actions
        loadUserProfile,
        updateUserProfile,
        uploadProfilePicture,
        changePassword,
        loadUserBalance,
        loadTransactions,
        loadUserNotifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        loadUserSettings,
        updateUserSettings,
        loadDashboardData,
        clearError,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;