import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../App";
import profileImg from "../../images/profile.png";
const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <Container>
        <div className="form-style">
          <div>
            <img src={profileImg} height={100} width={100} alt="profile" />
          </div>
          <p className="text-start">
            <b>Name:</b> {user?.name}
          </p>
          <p className="text-start">
            <b>Email:</b> {user?.email}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
