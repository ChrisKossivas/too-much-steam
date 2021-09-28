import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

const HomePage = () => {
  const { user, userStatus } = useContext(UserContext);


  // import circular loading later (material ui)

  return (
    <Wrapper>
        This is homepage
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
