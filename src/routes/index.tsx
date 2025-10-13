import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Layout } from '../components/layout/Layout';

// Pages
import { Login } from '../pages/login/Login';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { CreateBooking } from '../pages/bookings/Create';
import { EditBooking } from '../pages/bookings/Edit';
import { BookingsList } from '../pages/bookings/List';
import { BookingDetailsPage } from '../pages/bookings/Details';
import { CreateBag } from '../pages/bags/Create';
import { AddBagItem } from '../pages/bags/AddItem';
import { CloseBag } from '../pages/bags/Close';
import { ReceiveBag } from '../pages/bags/Receive';
import { ReceivedBagsList } from '../pages/bags/ReceivedList';
import { BranchMapping } from '../pages/admin/BranchMapping';
import { Operators } from '../pages/admin/Operators';

// Profile Pages
import { Profile } from '../pages/profile/Profile';
import { AccountSettings } from '../pages/profile/AccountSettings';
import { Notifications } from '../pages/profile/Notifications';
import { Privacy } from '../pages/profile/Privacy';
import { HelpSupport } from '../pages/profile/HelpSupport';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Private Routes */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <Navigate to="/dashboard" replace />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      } />

      {/* Bookings Routes */}
      <Route path="/bookings" element={
        <PrivateRoute>
          <Layout>
            <BookingsList />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bookings/create" element={
        <PrivateRoute>
          <Layout>
            <CreateBooking />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bookings/:id" element={
        <PrivateRoute>
          <Layout>
            <BookingDetailsPage />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bookings/:id/edit" element={
        <PrivateRoute>
          <Layout>
            <EditBooking />
          </Layout>
        </PrivateRoute>
      } />

      {/* Bags Routes */}
      <Route path="/bags/create" element={
        <PrivateRoute>
          <Layout>
            <CreateBag />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bags/:bagId/items/add" element={
        <PrivateRoute>
          <Layout>
            <AddBagItem />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bags/:bagId/close" element={
        <PrivateRoute>
          <Layout>
            <CloseBag />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bags/receive" element={
        <PrivateRoute>
          <Layout>
            <ReceiveBag />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/bags/received" element={
        <PrivateRoute>
          <Layout>
            <ReceivedBagsList />
          </Layout>
        </PrivateRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/branch-mapping" element={
        <PrivateRoute>
          <Layout>
            <BranchMapping />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/admin/operators" element={
        <PrivateRoute>
          <Layout>
            <Operators />
          </Layout>
        </PrivateRoute>
      } />

      {/* Profile Routes */}
      <Route path="/profile" element={
        <PrivateRoute>
          <Layout>
            <Profile />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/profile/settings" element={
        <PrivateRoute>
          <Layout>
            <AccountSettings />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/profile/notifications" element={
        <PrivateRoute>
          <Layout>
            <Notifications />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/profile/privacy" element={
        <PrivateRoute>
          <Layout>
            <Privacy />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/profile/help" element={
        <PrivateRoute>
          <Layout>
            <HelpSupport />
          </Layout>
        </PrivateRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}