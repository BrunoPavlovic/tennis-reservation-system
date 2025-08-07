import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon
} from "mdb-react-ui-kit";

const Reservation: React.FC = () => {
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
      <MDBCard className="shadow-5" style={{ borderRadius: "15px", maxWidth: "600px", width: "100%" }}>
        <MDBCardBody className="p-5">
          <div className="text-center mb-4">
            <MDBIcon fas icon="calendar-check" size="3x" className="text-primary mb-3" />
            <MDBCardTitle className="fw-bold h3">Court Reservations</MDBCardTitle>
            <MDBCardText className="text-muted">
              Book your tennis court reservations here
            </MDBCardText>
          </div>
          
          <div className="text-center">
            <p className="text-muted">
              Reservation functionality coming soon...
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Reservation;
