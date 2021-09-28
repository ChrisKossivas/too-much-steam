import React from 'react' 
import styled from 'styled-components'

const FriendList = () => {

  // try to incorporate mongodb to save friends made from app
  // or try localstorage??

  return (
    <Wrapper>

    <p>
      Show Friends made from the app here!
    </p>

    </Wrapper>
  )

}


const Wrapper = styled.div`

display: flex;
justify-content: center;

margin-top: 35vh;


`


export default FriendList