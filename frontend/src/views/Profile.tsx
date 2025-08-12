import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import UserInformation from "../components/UserInformation";
import UserReservations from "../components/UserReservations";
import UserTransactions from "../components/UserTransactions";

const Profile: React.FC = () => {
  return (
    <MDBContainer className="py-4">
      {/* Desktop Layout */}
      <div className="row justify-content-center d-none d-lg-flex">
        <div className="col-lg-4">
          <UserInformation />
        </div>
        <div className="col-lg-8">
          <UserReservations />
          <div className="mt-4">
            <UserTransactions />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="row justify-content-center d-lg-none">
        <div className="col-12 col-lg-8 col-xl-6">
          <UserInformation />
        </div>
      </div>
      
      <div className="row justify-content-center mt-4 d-lg-none">
        <div className="col-12 col-lg-10 col-xl-8">
          <UserReservations />
        </div>
      </div>
      
      <div className="row justify-content-center mt-4 d-lg-none">
        <div className="col-12 col-lg-10 col-xl-8">
          <UserTransactions />
        </div>
      </div>
    </MDBContainer>
  );
};

export default Profile;
