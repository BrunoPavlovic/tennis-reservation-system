import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/axios';
import UserTransactions from '../components/UserTransactions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Credit: React.FC = () => {
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = () => {
    if (amount < 10) {
      setAmount(prev => prev + 1);
    } else {
      setAmount(prev => prev + 10);
    }
  };

  const handleDecrement = () => {
    if (amount > 10) {
      setAmount(prev => prev - 10);
    } else if (amount <= 10) {
      setAmount(prev => prev - 1);
    }
  };

  const handleManualAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setAmount(value);
    } else {
      setAmount(10);
    }
  }

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/payments/create-checkout-session',
        { amount: amount * 100 }
      );

      const { url } = response.data;
      window.location.href = url;

    } catch (error: any) {
      console.error('Payment error:', error);
      alert('Failed to start payment. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer className="py-4">
      <div className="d-none d-lg-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <MDBRow className="w-100">
          <MDBCol lg="6" className="d-flex align-items-center justify-content-center">
            <MDBCard className="text-black shadow-5" style={{ borderRadius: '25px', width: '100%' }}>
              <MDBCardBody className="text-center p-4">
                <MDBIcon fas icon="money-bill-wave" size="3x" className="text-success mb-3" />
                <h4 className="fw-bold mb-2">Add Balance</h4>
                <p className="text-muted mb-4">Choose how much to add to your account</p>

                <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
                  <MDBBtn onClick={handleDecrement} disabled={amount <= 1} >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>

                  <div className="text-center">
                    <div className="h1 fw-bold text-primary mb-0">
                      <input type="text" value={amount} onChange={handleManualAmountChange}
                        className="h1 fw-bold text-primary text-center border-0 mb-0"
                        style={{
                          width: "80px",
                          outline: "none",
                          background: "transparent",
                        }}
                      />€</div>
                    <small className="text-muted">EUR</small>
                  </div>

                  <MDBBtn onClick={handleIncrement} disabled={amount >= 100}>
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </div>

                <div className="alert alert-info">
                  <MDBIcon fas icon="info-circle" className="me-2" />
                  The Amount will be added to your account after successful payment
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <MDBBtn color="success" onClick={handlePayment} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <MDBIcon fas icon="spinner" spin className="me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <MDBIcon fas icon="credit-card" className="me-2" />
                        Pay {amount}€
                      </>
                    )}
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="6" className="d-flex align-items-center justify-content-center">
            <UserTransactions />
          </MDBCol>
        </MDBRow>
      </div>

      {/* Mobile Layout */}
      <div className="d-lg-none">
        <MDBRow>
          <MDBCol className="mb-4">
            <MDBCard className="text-black shadow-5" style={{ borderRadius: '25px' }}>
              <MDBCardBody className="text-center p-4">
                <MDBIcon fas icon="money-bill-wave" size="3x" className="text-success mb-3" />
                <h4 className="fw-bold mb-2">Add Balance</h4>
                <p className="text-muted mb-4">Choose how much to add to your account</p>

                <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
                  <MDBBtn onClick={handleDecrement} disabled={amount <= 1} >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>

                  <div className="text-center">
                    <div className="h1 fw-bold text-primary mb-0">
                      <input type="text" value={amount} onChange={handleManualAmountChange}
                        className="h1 fw-bold text-primary text-center border-0 mb-0"
                        style={{
                          width: "80px",
                          outline: "none",
                          background: "transparent",
                        }}
                      />€</div>
                    <small className="text-muted">EUR</small>
                  </div>

                  <MDBBtn onClick={handleIncrement} disabled={amount >= 100}>
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                </div>

                <div className="alert alert-info">
                  <MDBIcon fas icon="info-circle" className="me-2" />
                  The Amount will be added to your account after successful payment
                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">
                  <MDBBtn color="success" onClick={handlePayment} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <MDBIcon fas icon="spinner" spin className="me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <MDBIcon fas icon="credit-card" className="me-2" />
                        Pay {amount}€
                      </>
                    )}
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <UserTransactions />
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default Credit;
