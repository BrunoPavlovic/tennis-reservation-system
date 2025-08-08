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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Credit: React.FC = () => {
  const [amount, setAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = () => {
    setAmount(prev => prev + 10);
  };

  const handleDecrement = () => {
    if (amount > 10) {
      setAmount(prev => prev - 10);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: amount * 100 // cents
        })
      });

      if (response.status !== 200) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.data;
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          //will be added later
          return_url: `${window.location.origin}/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <MDBCard className="text-black m-5" style={{ borderRadius: '25px', maxWidth: '600px', width: '100%' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol className="text-center">
              <MDBIcon fas icon="money-bill-wave" size="3x" className="text-success mb-3" />
              <h4 className="fw-bold mb-2">Add Credit</h4>
              <p className="text-muted mb-4">Choose how much credit you want to add</p>

              <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
                <MDBBtn onClick={handleDecrement} disabled={amount <= 10} >
                  <MDBIcon fas icon="minus" />
                </MDBBtn>

                <div className="text-center">
                  <div className="h1 fw-bold text-primary mb-0">{amount}€</div>
                  <small className="text-muted">EUR</small>
                </div>

                <MDBBtn onClick={handleIncrement} disabled={amount >= 100}>
                  <MDBIcon fas icon="plus" />
                </MDBBtn>
              </div>

              <div className="alert alert-info">
                <MDBIcon fas icon="info-circle" className="me-2" />
                Amount will be added to your account after successful payment
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
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Credit;
