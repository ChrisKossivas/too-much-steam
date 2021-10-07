import React, { useContext } from "react";
import styled from "styled-components";

import FriendList from "./FriendList";
import ProfileInfo from "./ProfileInfo";
import Loading from "../Loading";

import { UserContext } from "../contexts/UserProvider";

const Profile = () => {
  const { userStatus, gameStatus } = useContext(UserContext);

  // render Profile page which includes the Profile information and friend list
  return (
    <Wrapper>
      {userStatus && gameStatus ? (
        <div>
          <ProfileInfo />
          <FriendList />
        </div>
      ) : (
        <div>
          <h2>
            <Loading />
          </h2>
        </div>
      )}
    </Wrapper>
  );
};

// styling
const Wrapper = styled.div``;

export default Profile;
