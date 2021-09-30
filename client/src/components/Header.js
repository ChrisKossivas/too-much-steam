import React, { useContext } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserProvider";

const Header = () => {
  const { user, userStatus } = useContext(UserContext);
  return (
    <Wrapper>
      <Title>TooMuchSteam!</Title>
      <div>
        {userStatus ? (
          <UserWrapper>
            <Navigation>
            <EachLink to="/">Home</EachLink>
              <EachLink to="/top10">Top 10</EachLink>
              <EachLink to="/profile">Profile</EachLink>
              <EachLink to="/findfriends">FindFriends</EachLink>
            </Navigation>

            <UserInfo>
              <div>
                <img src={user.avatarmedium} alt="avatarImg" />
              </div>
              <p>{user.displayName}</p>
            </UserInfo>
            <SignInLink href="http://localhost:8000/logout">
            log out
          </SignInLink>
          </UserWrapper>
        ) : (
          <SignInLink href="http://localhost:8000/api/auth/steam">
            Sign in
          </SignInLink>
        )}
      </div>
    </Wrapper>
  );
};

const EachLink = styled(Link)`

display: flex;
justify-content: center;
margin-right: 10px;
margin-top: 10px;

`;

const Navigation = styled.div`
  /* margin-left: 50px; */
  /* display: inline-flex; */
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;


`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-pink);
  width: 100%;
  padding-bottom: 10px;
`;
const Title = styled.h1`
  margin-left: 15px;
  color: var(--color-lightYellow);
`;

const SignInLink = styled.a``;

const UserInfo = styled.div`
  margin-right: 15px;
`;

export default Header;
