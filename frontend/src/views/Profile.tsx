import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import UserInformation from "../components/UserInformation";
import UserReservations from "../components/UserReservations";
import UserTransactions from "../components/UserTransactions";

const Profile: React.FC = () => {
  return (
    <MDBContainer className="py-4">
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
      
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-lg-10 col-xl-8">
          <UserTransactions />
        </div>
      </div>
    </MDBContainer>
  );
};

export default Profile;
