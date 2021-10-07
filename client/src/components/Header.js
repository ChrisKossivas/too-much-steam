import React, { useContext } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { UserContext } from "./contexts/UserProvider";

import HeaderImg from "../assets/Header1.png";

const Header = () => {
  const { user, userStatus } = useContext(UserContext);

  // render header will links to different URLs within the app
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${HeaderImg})`,
      }}
    >
      <Title>Too Much Steam!</Title>
      <div>
        {userStatus ? (
          <UserWrapper>
            <Navigation>
              <div>
                <img src={user.avatarmedium} alt="avatarImg" />
              </div>
              <EachLink to="/">Home</EachLink>
              <EachLink to="/top10">Top 10</EachLink>
              <EachLink to="/profile">Profile</EachLink>
              <EachLink to="/findfriends">Find Friends</EachLink>
            </Navigation>
            <UserInfo></UserInfo>
            <SignInLink href="http://localhost:8000/logout">Log Out</SignInLink>
          </UserWrapper>
        ) : (
          <>
            <EachLink to="/">Home</EachLink>
          </>
        )}
      </div>
    </Wrapper>
  );
};

// styling
const EachLink = styled(Link)`
  @media (min-width: 801px) {
    margin-right: 10px;
    margin-top: 10px;
  }
  color: hotpink;
  @media (max-width: 800px) {
    margin-left: 10px;
  }
`;

const Navigation = styled.ul``;

const UserWrapper = styled.div`
  @media (min-width: 801px) {
    display: flex;
    align-items: center;
  }

  display: inline-flex;
`;

const Wrapper = styled.div`
  height: 117px;
  @media (min-width: 801px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: var(--color-pink);
    width: 100%;
    padding-bottom: 10px;
  }

  @media (max-width: 800px) {
    background: yellow;
  }
`;

const Title = styled.h1`
  color: var(--color-lightYellow);
`;

const SignInLink = styled.a`
  color: hotpink;
`;

const UserInfo = styled.div`
  margin-right: 15px;
`;

export default Header;
