import React, { createContext, useContext, useReducer, useState } from 'react';
import { authService, otherService } from '../api';

// Initial state
const initialState = {
    supportTickets: [],
    currentTicket: null,
    teamStats: null,
    teamMembers: [],
    directReferrals: [],
    teamHistory: [],
    isLoading: false,
    error: null,
    isSubmitting: false,
};

// Action types
const OTHER_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_SUBMITTING: 'SET_SUBMITTING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_SUPPORT_TICKETS: 'SET_SUPPORT_TICKETS',
    SET_CURRENT_TICKET: 'SET_CURRENT_TICKET',
    ADD_SUPPORT_TICKET: 'ADD_SUPPORT_TICKET',
    UPDATE_SUPPORT_TICKET: 'UPDATE_SUPPORT_TICKET',
    DELETE_SUPPORT_TICKET: 'DELETE_SUPPORT_TICKET',
    SET_TEAM_STATS: 'SET_TEAM_STATS',
    SET_TEAM_MEMBERS: 'SET_TEAM_MEMBERS',
    SET_DIRECT_REFERRALS: 'SET_DIRECT_REFERRALS',
    SET_TEAM_HISTORY: 'SET_TEAM_HISTORY',
    RESET_STATE: 'RESET_STATE',
};

// Reducer function
const otherReducer = (state, action) => {
    switch (action.type) {
        case OTHER_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case OTHER_ACTIONS.SET_SUBMITTING:
            return {
                ...state,
                isSubmitting: action.payload,
            };

        case OTHER_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isSubmitting: false,
            };

        case OTHER_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        case OTHER_ACTIONS.SET_SUPPORT_TICKETS:
            return {
                ...state,
                supportTickets: action.payload,
                isLoading: false,
                error: null,
            };

        case OTHER_ACTIONS.SET_CURRENT_TICKET:
            return {
                ...state,
                currentTicket: action.payload,
                isLoading: false,
                error: null,
            };

        case OTHER_ACTIONS.ADD_SUPPORT_TICKET:
            return {
                ...state,
                supportTickets: [action.payload, ...state.supportTickets],
                isSubmitting: false,
                error: null,
            };

        case OTHER_ACTIONS.UPDATE_SUPPORT_TICKET:
            return {
                ...state,
                supportTickets: state.supportTickets.map(ticket =>
                    ticket.id === action.payload.id ? action.payload : ticket
                ),
                currentTicket: state.currentTicket?.id === action.payload.id ? action.payload : state.currentTicket,
                isSubmitting: false,
                error: null,
            };

        case OTHER_ACTIONS.DELETE_SUPPORT_TICKET:
            return {
                ...state,
                supportTickets: state.supportTickets.filter(ticket => ticket.id !== action.payload),
                currentTicket: state.currentTicket?.id === action.payload ? null : state.currentTicket,
                isSubmitting: false,
                error: null,
            };

        case OTHER_ACTIONS.SET_TEAM_STATS:
            return {
                ...state,
                teamStats: action.payload,
                isLoading: false,
                error: null,
            };

        case OTHER_ACTIONS.SET_TEAM_MEMBERS:
            return {
                ...state,
                teamMembers: action.payload,
                isLoading: false,
                error: null,
            };

        case OTHER_ACTIONS.SET_DIRECT_REFERRALS:
            return {
                ...state,
                directReferrals: action.payload,
                isLoading: false,
                error: null,
            };

        case OTHER_ACTIONS.SET_TEAM_HISTORY:
            return {
                ...state,
                teamHistory: action.payload,
                isLoading: false,
                error: null,
            };

        case OTHER_ACTIONS.RESET_STATE:
            return initialState;

        default:
            return state;
    }
};

// Create context
const OtherContext = createContext();

// Other provider component
export const OtherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(otherReducer, initialState);
    // const [myleveldata, setMyLevelData] = useState();

    // Get all support tickets
    const getSupportTickets = async () => {
        try {
            dispatch({ type: OTHER_ACTIONS.SET_LOADING, payload: true });
            const response = await otherService.getSupportTickets();

            if (response.status === true) {
                dispatch({
                    type: OTHER_ACTIONS.SET_SUPPORT_TICKETS,
                    payload: response.data || [],
                });
            } else {
                throw new Error(response.message || 'Failed to fetch support tickets');
            }
        } catch (error) {
            dispatch({
                type: OTHER_ACTIONS.SET_ERROR,
                payload: error.message,
            });
        }
    };

    // Get specific support ticket
    const getSupportTicket = async (ticketId) => {
        try {
            dispatch({ type: OTHER_ACTIONS.SET_LOADING, payload: true });
            const response = await otherService.getSupportTicket(ticketId);

            if (response.status === true) {
                dispatch({
                    type: OTHER_ACTIONS.SET_CURRENT_TICKET,
                    payload: response.data,
                });
                return { success: true, data: response.data };
            } else {
                throw new Error(response.message || 'Failed to fetch support ticket');
            }
        } catch (error) {
            dispatch({
                type: OTHER_ACTIONS.SET_ERROR,
                payload: error.message,
            });
            return { success: false, error: error.message };
        }
    };

    // Create new support ticket
    const createSupportTicket = async (ticketData) => {
        try {
            dispatch({ type: OTHER_ACTIONS.SET_SUBMITTING, payload: true });
            const response = await otherService.createSupportTicket(ticketData);

            if (response.status === true) {
                dispatch({
                    type: OTHER_ACTIONS.ADD_SUPPORT_TICKET,
                    payload: response.data,
                });
                return { success: true, data: response.data };
            } else {
                throw new Error(response.message || 'Failed to create support ticket');
            }
        } catch (error) {
            dispatch({
                type: OTHER_ACTIONS.SET_ERROR,
                payload: error.message,
            });
            return { success: false, error: error.message };
        }
    };

    // Update support ticket
    const updateSupportTicket = async (ticketId, updateData) => {
        try {
            dispatch({ type: OTHER_ACTIONS.SET_SUBMITTING, payload: true });
            const response = await otherService.updateSupportTicket(ticketId, updateData);

            if (response.status === true) {
                dispatch({
                    type: OTHER_ACTIONS.UPDATE_SUPPORT_TICKET,
                    payload: response.data,
                });
                return { success: true, data: response.data };
            } else {
                throw new Error(response.message || 'Failed to update support ticket');
            }
        } catch (error) {
            dispatch({
                type: OTHER_ACTIONS.SET_ERROR,
                payload: error.message,
            });
            return { success: false, error: error.message };
        }
    };

    // Delete support ticket
    const deleteSupportTicket = async (ticketId) => {
        try {
            dispatch({ type: OTHER_ACTIONS.SET_SUBMITTING, payload: true });
            const response = await otherService.deleteSupportTicket(ticketId);

            if (response.status === true) {
                dispatch({
                    type: OTHER_ACTIONS.DELETE_SUPPORT_TICKET,
                    payload: ticketId,
                });
                return { success: true };
            } else {
                throw new Error(response.message || 'Failed to delete support ticket');
            }
        } catch (error) {
            dispatch({
                type: OTHER_ACTIONS.SET_ERROR,
                payload: error.message,
            });
            return { success: false, error: error.message };
        }
    };

    // Clear error function
    const clearError = () => {
        dispatch({ type: OTHER_ACTIONS.CLEAR_ERROR });
    };

    // Reset state
    const resetState = () => {
        dispatch({ type: OTHER_ACTIONS.RESET_STATE });
    };

    const MyTeamLevelViewData = async (data) => {
        try {

            const response = await otherService.myTeamLevelView(data);
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }

    // Get team statistics
    // const getTeamStats = async () => {
    //     try {
    //         dispatch({ type: OTHER_ACTIONS.SET_LOADING, payload: true });
    //         const response = await otherService.getTeamStats();

    //         if (response.status === true) {
    //             dispatch({
    //                 type: OTHER_ACTIONS.SET_TEAM_STATS,
    //                 payload: response.data,
    //             });
    //             return { success: true, data: response.data };
    //         } else {
    //             throw new Error(response.message || 'Failed to fetch team stats');
    //         }
    //     } catch (error) {
    //         dispatch({
    //             type: OTHER_ACTIONS.SET_ERROR,
    //             payload: error.message,
    //         });
    //         return { success: false, error: error.message };
    //     }
    // };

    // Get team members
    // const getTeamMembers = async () => {
    //     try {
    //         dispatch({ type: OTHER_ACTIONS.SET_LOADING, payload: true });
    //         const response = await otherService.getTeamMembers();

    //         if (response.status === true) {
    //             dispatch({
    //                 type: OTHER_ACTIONS.SET_TEAM_MEMBERS,
    //                 payload: response.data || [],
    //             });
    //             return { success: true, data: response.data };
    //         } else {
    //             throw new Error(response.message || 'Failed to fetch team members');
    //         }
    //     } catch (error) {
    //         dispatch({
    //             type: OTHER_ACTIONS.SET_ERROR,
    //             payload: error.message,
    //         });
    //         return { success: false, error: error.message };
    //     }
    // };

    // Get direct referrals
    const getDirectReferrals = async () => {
        try {
            dispatch({ type: OTHER_ACTIONS.SET_LOADING, payload: true });
            const response = await otherService.getDirectReferrals();
            console.log("Response:", response);

            if (response.status === true) {
                dispatch({
                    type: OTHER_ACTIONS.SET_DIRECT_REFERRALS,
                    payload: response || [],
                });
                return { success: true, data: response.data };
            } else {
                throw new Error(response.message || 'Failed to fetch direct referrals');
            }
        } catch (error) {
            dispatch({
                type: OTHER_ACTIONS.SET_ERROR,
                payload: error.message,
            });
            return { success: false, error: error.message };
        }
    };

    // Get team history
    // const getTeamHistory = async () => {
    //     try {
    //         dispatch({ type: OTHER_ACTIONS.SET_LOADING, payload: true });
    //         const response = await otherService.getTeamHistory();

    //         if (response.status === true) {
    //             dispatch({
    //                 type: OTHER_ACTIONS.SET_TEAM_HISTORY,
    //                 payload: response.data || [],
    //             });
    //             return { success: true, data: response.data };
    //         } else {
    //             throw new Error(response.message || 'Failed to fetch team history');
    //         }
    //     } catch (error) {
    //         dispatch({
    //             type: OTHER_ACTIONS.SET_ERROR,
    //             payload: error.message,
    //         });
    //         return { success: false, error: error.message };
    //     }
    // };

    // Context value
    const value = {
        // State
        supportTickets: state.supportTickets,
        currentTicket: state.currentTicket,
        teamStats: state.teamStats,
        teamMembers: state.teamMembers,
        directReferrals: state.directReferrals,
        teamHistory: state.teamHistory,
        isLoading: state.isLoading,
        isSubmitting: state.isSubmitting,
        error: state.error,

        // Actions
        getSupportTickets,
        getSupportTicket,
        createSupportTicket,
        updateSupportTicket,
        deleteSupportTicket,
        // getTeamStats,
        // getTeamMembers,
        getDirectReferrals,
        // getTeamHistory,
        clearError,
        resetState,
        MyTeamLevelViewData
    };

    return (
        <OtherContext.Provider value={value}>
            {children}
        </OtherContext.Provider>
    );
};

// Custom hook to use other context
export const useOther = () => {
    const context = useContext(OtherContext);
    if (!context) {
        throw new Error('useOther must be used within an OtherProvider');
    }
    return context;
};

export default OtherContext;