import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBNavbarToggler
} from 'mdb-react-ui-kit';
import { useAuth } from '../hooks/useAuth';
import { useCredit } from '../hooks/useCredit';
import icon from '../assets/icon.png';

const AdminNavbar = () => {
  const { username, logout } = useAuth();
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <MDBNavbar sticky fixed='top' light bgColor='light' className='shadow-3 mx-4 mt-3' style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)', zIndex: 1000 }}>
      <MDBContainer fluid className='px-0'>

        <div className="d-none d-lg-flex justify-content-between align-items-center w-100 px-4">
          <div className="d-flex align-items-center">
            <MDBNavbarBrand href='/admin/clubs' className='d-flex align-items-center'>
              <img src={icon} alt='logo' width='32' height='32' className='me-2' />
              <span className="fw-bold">Match Point</span>
            </MDBNavbarBrand>
          </div>

          <div className='d-flex justify-content-center'>
            <MDBNavbarNav className='d-flex flex-row gap-4'>
              <MDBNavbarItem>
                <MDBNavbarLink active={isActive('/admin/clubs')} href='/admin/clubs' className="fw-semibold">
                  <MDBIcon fas icon="building" className="me-2" />
                  Clubs
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active={isActive('/admin/users')} href='/admin/users' className="fw-semibold">
                  <MDBIcon fas icon="users" className="me-2" />
                  Users
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>

          <div className='d-flex align-items-center gap-4'>
            <span className='text-primary fw-bold'>
              <MDBIcon fas icon="shield-alt" className='me-2' />
              Admin
            </span>

            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link text-dark d-flex align-items-center' role='button'>
                <MDBIcon icon="user" className='me-2' />
                {username}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link onClick={logout}>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>

        <div className="d-lg-none d-flex align-items-center justify-content-between w-100 px-4">
          <MDBNavbarBrand href='/admin/clubs' className='d-flex align-items-center'>
            <img src={icon} alt='logo' width='25' height='25' className='me-2' />
            <span className="fw-bold">Match Point</span>
          </MDBNavbarBrand>

          <div className='d-flex align-items-center gap-3'>
            <span className='text-primary fw-bold small d-flex align-items-center'>
              <MDBIcon fas icon="shield-alt" className='me-1' />
              <span className='text-nowrap'>Admin</span>
            </span>

            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link text-dark d-flex align-items-center' role='button'>
                <MDBIcon icon="user" className='me-1' />
                <span className="d-none d-sm-inline">{username}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link onClick={logout}>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>

            <MDBNavbarToggler
              type="button"
              data-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
          </div>
        </div>

        {showNav && (
          <div className="px-4 pb-3">
            <MDBNavbarNav className='d-flex flex-column gap-2'>
              <MDBNavbarItem>
                <MDBNavbarLink active={isActive('/admin/clubs')} href='/admin/clubs' className="fw-semibold">
                  <MDBIcon fas icon="building" className="me-2" />
                  Clubs
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active={isActive('/admin/users')} href='/admin/users' className="fw-semibold">
                  <MDBIcon fas icon="users" className="me-2" />
                  Users
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>
        )}

      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdminNavbar;
