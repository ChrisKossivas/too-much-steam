import React, {useContext, useEffect} from 'react' 
import styled from 'styled-components'

import { UserContext } from "../contexts/UserProvider";

const FriendList = () => {


  const { allUsers, allUsersStatus, user, userStatus, friends, friendStatus } = useContext(UserContext);



  console.log(friends)


  // try to incorporate mongodb to save friends made from app
  if (friendStatus) {
    const {personaname, avatarmedium} = friends.data
    
    return (
      <Wrapper>
          <div>
      <p>
        <img src={avatarmedium} alt={"friendImg"}/>
        {personaname}
      </p>
      <button>
        Chat!
      </button>
      </div>
  
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


const Wrapper = styled.div`

display: flex;
justify-content: center;

margin-top: 35vh;


`


export default FriendList