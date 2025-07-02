import React from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { ForexProvider } from './ForexContext';
import { AccountProvider } from './AccountContext';
import { Web3Provider } from './Web3Context';
import { OtherProvider } from './OtherContext';

// Combined provider component that wraps all contexts
const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <ForexProvider>
                    <AccountProvider>
                        <Web3Provider>
                            <OtherProvider>
                                {children}
                            </OtherProvider>
                        </Web3Provider>
                    </AccountProvider>
                </ForexProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default AppProvider;