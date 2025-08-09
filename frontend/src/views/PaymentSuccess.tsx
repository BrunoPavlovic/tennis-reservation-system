import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';
import api from '../services/axios';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setError('No session id is found in URL.');
          setIsProcessing(false);
          return;
        }

        const response = await api.post('/payments/verify-payment', {
            sessionId
        });

        if (response.status !== 200) {
          throw new Error('Payment verification failed');
        }

        const { newCredit, amountFromStripe } = await response.data;
        setAmount(amountFromStripe);
        localStorage.setItem('userCredit', newCredit.toString());
        
        setIsSuccess(true);
      } catch (error) {
        console.error('Verification error:', error);
        setError('Failed to process payment.');
      } finally {
        setIsProcessing(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const handleContinue = () => {
    navigate('/home');
    window.location.reload();
  };

  if (isProcessing) {
    return (
      <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <MDBCard className="shadow-5" style={{ borderRadius: "15px", maxWidth: "500px", width: "100%" }}>
          <MDBCardBody className="p-5 text-center">
            <MDBSpinner grow size="lg" color="primary" className="mb-4" />
            <MDBCardTitle className="fw-bold h4">Processing Payment...</MDBCardTitle>
            <MDBCardText className="text-muted">
              Please wait while we verify your payment and update your credit.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }

  if (error) {
    return (
      <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <MDBCard className="shadow-5" style={{ borderRadius: "15px", maxWidth: "500px", width: "100%" }}>
          <MDBCardBody className="p-5 text-center">
            <MDBIcon fas icon="exclamation-triangle" size="3x" className="text-danger mb-4" />
            <MDBCardTitle className="fw-bold h4 text-danger">Payment Error</MDBCardTitle>
            <MDBCardText className="text-muted mb-4">
              {error}
            </MDBCardText>
            <MDBBtn color="primary" onClick={handleContinue}>
              Return to Home
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <MDBCard className="shadow-5" style={{ borderRadius: "15px", maxWidth: "500px", width: "100%" }}>
        <MDBCardBody className="p-5 text-center">
          <MDBIcon fas icon="check-circle" size="3x" className="text-success mb-4" />
          <MDBCardTitle className="fw-bold h4 text-success">Payment Successful!</MDBCardTitle>
          <MDBCardText className="text-muted mb-4">
            Your payment of <strong>{amount}€</strong> has been processed successfully.<br />
            Your credit has been updated and is ready to use.
          </MDBCardText>
          <MDBBtn color="success" size="lg" onClick={handleContinue}>
            <MDBIcon fas icon="home" className="me-2" />
            Continue to Home
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default PaymentSuccess;
