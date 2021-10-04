import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

import GameDisplay from "./GameDisplay";


const HomePage = () => {
  const { user, userStatus, singleGame } = useContext(UserContext);


  // import circular loading later (material ui)

  return (
    <Wrapper>
      <Content>
        {userStatus ? (
          <div>
          <GameDisplay />
            </div>
        ) : (
          <div>
            <LogInReminder>
            Please log In To Steam
              </LogInReminder>
          </div>
          )}
          {userStatus && singleGame === undefined ? (
            <div>
              <h2>
              LOADING...
              </h2>
              </div>
          ) : null}
      </Content>
    </Wrapper>
  );
};

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
