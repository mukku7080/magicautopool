import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Create context
const NavigationLoadingContext = createContext();

// Navigation loading provider
export const NavigationLoadingProvider = ({ children }) => {
    const [isNavigationLoading, setIsNavigationLoading] = useState(false);
    const [currentRoute, setCurrentRoute] = useState('');
    const location = useLocation();
    const [change,setChange]=useState(true);

    // Handle route changes
    useEffect(() => {
        // Start loading when route changes
        setIsNavigationLoading(true);
        
        // Set current route
        // const routeName = getRouteDisplayName(location.pathname);     
        
        // setCurrentRoute(routeName);

        // Configurable loading delay
        const LOADING_DELAY = 600; // 600ms loading delay
        
        const timer = setTimeout(() => {
            setIsNavigationLoading(false);
        }, LOADING_DELAY);

        return () => clearTimeout(timer);
    }, [location.pathname,change]);

    // Helper function to get display name from route
    const getRouteDisplayName = (pathname) => {
        const routeMap = {
            '/user/dashboard': 'Dashboard',
            '/user/profile': 'Profile',
            '/user/wallet': 'Wallet',
            '/user/packages': 'Packages',
            '/user/deposit': 'Deposit',
            '/user/withdraw': 'Withdraw',
            '/user/withdraw-history': 'Withdraw History',
            '/user/team': 'My Team',
            '/user/tree': 'Tree',
            '/user/referrals': 'Referrals',
            '/user/transactions': 'Transactions',
            '/user/analytics': 'Analytics',
            '/user/settings': 'Settings',
            '/user/support': 'Support',
        };

        // Handle dynamic routes
        if (pathname.includes('/deposit/')) {
            return 'Deposit';
        }

        return routeMap[pathname] || 'Loading...';
    };

    const value = {
        isNavigationLoading,
        currentRoute,
        setIsNavigationLoading,
        setCurrentRoute,
        setChange,
        change
    };

    return (
        <NavigationLoadingContext.Provider value={value}>
            {children}
        </NavigationLoadingContext.Provider>
    );
};

// Custom hook to use navigation loading context
export const useNavigationLoading = () => {
    const context = useContext(NavigationLoadingContext);
    if (!context) {
        throw new Error('useNavigationLoading must be used within a NavigationLoadingProvider');
    }
    return context;
};