import React, {useContext, useEffect} from 'react' 
import styled from 'styled-components'

import { UserContext } from "../contexts/UserProvider";

const FriendList = () => {


  const { allUsers, allUsersStatus, user, userStatus, friends, friendStatus } = useContext(UserContext);


  
  if (friendStatus) {
    const {personaname, avatarmedium} = friends.data
    
    return (
      <Wrapper>
                <h2>
          Friend List
          </h2>
          <FriendInfo>
        <FriendImg src={avatarmedium} alt={"friendImg"}/>
      <p>
        {personaname}
      </p>
      <ChatBtn>
        Chat!
      </ChatBtn>
      </FriendInfo>
  
      </Wrapper>
    )
  }
  else {
    return (
      <div>
        <p>
          No Friends
        </p>
      </div>
    )
  }

}

const ChatBtn = styled.button`

font-size: 17px;
width: 100px;

color: white;
border-radius: 50px;

background: var( --color-pink) ;

`

const FriendImg = styled.img`


`

const FriendInfo = styled.div`
margin-top: 30px;

display: block;
text-align: center;
`

const Wrapper = styled.div`

margin-top: 30vh;


`


export default FriendList