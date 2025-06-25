import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Packages from './pages/Packages';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Referrals from './pages/Referrals';

const UserDashboard = () => {
    return (
        <UserLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/referrals" element={<Referrals />} />
                {/* Add more routes as needed */}
                <Route path="/transactions" element={<div>Transactions Page - Coming Soon</div>} />
                <Route path="/analytics" element={<div>Analytics Page - Coming Soon</div>} />
                <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
                <Route path="/support" element={<div>Support Page - Coming Soon</div>} />
            </Routes>
        </UserLayout>
    );
};

export default UserDashboard;