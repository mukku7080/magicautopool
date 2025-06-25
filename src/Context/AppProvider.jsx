import React from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { ForexProvider } from './ForexContext';

// Combined provider component that wraps all contexts
const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <ForexProvider>
                    {children}
                </ForexProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default AppProvider;