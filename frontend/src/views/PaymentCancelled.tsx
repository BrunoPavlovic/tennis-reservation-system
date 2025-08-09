import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBSpinner } from 'mdb-react-ui-kit';

const PaymentCancelled: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/credit');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody className='d-flex flex-column align-items-center justify-content-center'>
                    <MDBSpinner grow style={{ width: '3rem', height: '3rem' }} color="primary" role="status" />
                    <MDBCardTitle className="fw-bold text-danger">Canceling payment...</MDBCardTitle>
                    <p className="mt-3" >You will be redirected shortly...</p>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default PaymentCancelled;