import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import UserInformation from "../components/UserInformation";

const Profile: React.FC = () => {
  return (
    <MDBContainer className="py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <UserInformation />
        </div>
      </div>
    </MDBContainer>
  );
};

export default Profile;
