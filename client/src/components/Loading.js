import React from "react";
import styled, { keyframes } from "styled-components";

import {BiLoaderCircle} from 'react-icons/bi';

const Loading = () => {

  // render loading icon with rotating animation
  return (
    <Wrapper>
      <LoadIcon />
    </Wrapper>
  )

}

const Wrapper = styled.div`


`

const animation = keyframes`
  from {
    transform: rotate(0deg) scale(2);
  }
  to {
    transform: rotate(360deg) scale(2);
  }

`

const LoadIcon = styled(BiLoaderCircle)`

margin-top: 15px;

color: hotpink;

animation: ${animation} 2s linear infinite;


`

export default Loading