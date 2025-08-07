import React from 'react';
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
  MDBIcon
} from 'mdb-react-ui-kit';
import { useAuth } from '../hooks/useAuth';
import { useCredit } from '../hooks/useCredit';

const Navbar = () => {
  const { username, logout } = useAuth();
  const { credit, isLoading } = useCredit();

  return (
    <MDBNavbar sticky fixed='top' light bgColor='light' className='shadow-3 mx-4 mt-3' style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <MDBContainer fluid className='navbar-grid px-0'>

        <div className="d-flex align-items-center mx-4">
          <MDBNavbarBrand href='/home' className='d-flex align-items-center'>
            <img src='./src/assets/icon.png' alt='logo' width='32' height='32' className='me-2' />
            <span className="fw-bold">Match Point</span>
          </MDBNavbarBrand>
        </div>

        <div className='d-flex justify-content-center'>
          <MDBNavbarNav className='d-flex flex-row gap-4'>
            <MDBNavbarItem>
              <MDBNavbarLink active href='/home' className="fw-semibold">Home</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/reservation' className="fw-semibold">Reservation</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/profile' className="fw-semibold">Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/credit' className="fw-semibold">Credit</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </div>

        <div className='d-flex align-items-center gap-4 mx-4'>
          <span className='text-success fw-bold'>
            <MDBIcon fas icon="money-bill-wave" className='me-2' />
            {isLoading ? '...' : `${credit.toFixed(2)} €`}
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

      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
