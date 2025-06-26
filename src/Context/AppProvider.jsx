import React from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { ForexProvider } from './ForexContext';
import { AccountProvider } from './AccountContext';

// Combined provider component that wraps all contexts
const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <ForexProvider>
                    <AccountProvider>
                        {children}
                    </AccountProvider>
                </ForexProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default AppProvider;