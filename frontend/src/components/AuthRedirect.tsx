import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MDBSpinner, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [redirectNow, setRedirectNow] = useState(false);

  useEffect(() => {
    if (token) {
      setRedirecting(true);
      const timeout = setTimeout(() => setRedirectNow(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [token]);

  useEffect(() => {
    if (redirectNow) {
      navigate('/home');
    }
  }, [redirectNow, navigate]);

  if (redirecting) {
    return (
          <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody className='d-flex flex-column align-items-center justify-content-center'>
                  <MDBSpinner grow style={{ width: '3rem', height: '3rem' }} color="primary" role="status" />
                   <p className="mt-3">You are already logged in. Redirecting...</p>
                </MDBCardBody>
            </MDBCard>
          </MDBContainer>    
    );
  }

  return children;
};

export default AuthRedirect;
