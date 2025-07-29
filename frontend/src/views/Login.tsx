import React from 'react';
import { useLogin } from '../hooks/useLogin';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import logo from '../assets/match_point_logo.png';

const Login: React.FC = () => {
  const { form, error, handleChange, handleSubmit } = useLogin();

  return (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mt-4">Login</p>

              <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-4">
                <div className="d-flex flex-row align-items-center">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Email' id='email' type='email' value={form.email} onChange={handleChange} required />
                </div>

                <div className="d-flex flex-row align-items-center">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='password' type='password' value={form.password} onChange={handleChange} required />
                </div>

                {error && <div className="text-danger">{error}</div>}
                <MDBBtn className='mb-4' size='lg' type='submit'>Login</MDBBtn>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='5' className='order-1 order-lg-1 d-flex align-items-center'>
              <img src={logo} alt="Match Point" style={{ width: '100%' }} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
