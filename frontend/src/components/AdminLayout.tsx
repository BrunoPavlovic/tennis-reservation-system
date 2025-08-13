import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <AdminNavbar />
      <div className="container-fluid px-4 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
