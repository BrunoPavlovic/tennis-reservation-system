import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import UserInformation from "../components/UserInformation";
import UserReservations from "../components/UserReservations";

const Profile: React.FC = () => {
  return (
    <MDBContainer className="py-4">
      <div className="d-none d-lg-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="row w-100">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <UserInformation />
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <UserReservations />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="d-lg-none">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <UserInformation />
          </div>
        </div>
        
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-lg-10 col-xl-8">
            <UserReservations />
          </div>
        </div>
      </div>
    </MDBContainer>
  );
};

export default Profile;
