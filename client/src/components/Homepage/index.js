import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

import GameDisplay from "./GameDisplay";

const HomePage = () => {
  const { userStatus, singleGame } = useContext(UserContext);

  // render homepage which includes The specific game.
  // if the user is not signed it, it will ask to sign into steam
  return (
    <Wrapper>
      <Content>
        {userStatus ? (
          <div>
          <GameDisplay />
            </div>
        ) : (
          <>
          </>
          )}
          {!userStatus && singleGame === undefined ? (
            <div>
              <LogInReminder>
            <SignInLink href="http://localhost:8000/api/auth/steam">
            Please Sign Into Steam Here
          </SignInLink>
              </LogInReminder>
              </div>
          ) : null}
      </Content>
    </Wrapper>
  );
};

const SignInLink = styled.a`
color:  var(--color-orange);
display: block;
`;

const LogInReminder = styled.h1`

color: hotpink;


`

const Content = styled.div`

display: flex;
justify-content: center;

`;

const Wrapper = styled.div`
  color: var(--color-orange);
`;

export default HomePage;
