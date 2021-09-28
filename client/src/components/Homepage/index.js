import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

const HomePage = () => {
  const { user, userStatus } = useContext(UserContext);
  console.log(user);
  console.log(userStatus)

  return (
    <Wrapper>
      <p>
        <a href="http://localhost:8000/api/auth/steam">Sign in</a>
        Homepage! Where swiping will happen!
      </p>
      <Content>
        {userStatus ? (
          <p>
            {user.displayName}
          </p>
        ) : (
          <div>
            <p>
            Please log In To Continue
              </p>
          </div>
          )}
      </Content>
    </Wrapper>
  );
};



const Content = styled.div`

display: flex;
justify-content: center;

`;

const Wrapper = styled.div`
  color: var(--color-orange);
`;

export default HomePage;
