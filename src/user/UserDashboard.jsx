import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import { NavigationLoadingProvider } from '../Context/NavigationLoadingContext';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Packages from './pages/Packages';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Referrals from './pages/Referrals';
import DepositForm from './pages/DepositForm';
import WithdrawScreen from './pages/WithdrawScreen';
import WithdrawHistory from './pages/WithdrawHistory';
import Tree from './pages/Tree';
import BinaryTreeNew from './pages/tree/BinaryTreeNew';
import BinaryTree from './pages/tree/BinaryTree';
import NewTree from './pages/tree/NewTree';
import SupportTicket from '../Pages/SupportTicket';

const UserDashboard = () => {
    return (
        <NavigationLoadingProvider>
            <UserLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/deposit" element={<DepositForm />} />
                    <Route path="/deposit/:txn_id" element={<DepositForm />} />
                    <Route path="/withdraw" element={<WithdrawScreen />} />
                    <Route path="/withdraw-history" element={<WithdrawHistory />} />
                    <Route path="/tree" element={<NewTree />} />
                    <Route path="/referrals" element={<Referrals />} />
                    <Route path="/btree" element={<NewTree />} />
                    {/* Add more routes as needed */}
                    <Route path="/transactions" element={<div>Transactions Page - Coming Soon</div>} />
                    <Route path="/analytics" element={<div>Analytics Page - Coming Soon</div>} />
                    <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
                    <Route path="/support" element={<SupportTicket />} />
                </Routes>
            </UserLayout>
        </NavigationLoadingProvider>
    );
};

export default UserDashboard;