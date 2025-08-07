import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon
} from "mdb-react-ui-kit";

const Profile: React.FC = () => {
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
      <MDBCard className="shadow-5" style={{ borderRadius: "15px", maxWidth: "600px", width: "100%" }}>
        <MDBCardBody className="p-5">
          <div className="text-center mb-4">
            <MDBIcon fas icon="user-circle" size="3x" className="text-primary mb-3" />
            <MDBCardTitle className="fw-bold h3">User Profile</MDBCardTitle>
            <MDBCardText className="text-muted">
              Manage your account settings and preferences
            </MDBCardText>
          </div>
          
          <div className="text-center">
            <p className="text-muted">
              Profile functionality coming soon...
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Profile;
