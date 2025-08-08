import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SharedLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
