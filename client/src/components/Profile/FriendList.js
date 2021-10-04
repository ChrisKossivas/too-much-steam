import React, {useContext, useEffect} from 'react' 
import styled from 'styled-components'
import { useHistory } from "react-router";
import { UserContext } from "../contexts/UserProvider";

const FriendList = () => {


  const { allUsers, allUsersStatus, user, userStatus, friends, friendStatus } = useContext(UserContext);

  let history = useHistory()

  const clickToChat = () => {
    history.push("/chat")
  }

  console.log(friends)

  if (friendStatus) {
    // const {personaname, avatarmedium} = friends.data
    
    return (
      <Wrapper>
                <h2>
          Friend List
          </h2>
          <FriendInfo>
            {friends.map((friend) => {
              const {personaname, avatarmedium, _id} = friend.data
              // console.log(avatarmedium)

              return (
              <span key={_id}>
              <FriendImg src={avatarmedium} alt={"friendImg"} />
                <p>
                  {personaname}
                </p>
                <div>
                <ChatBtn onClick={clickToChat}>
                  Chat!
                </ChatBtn>
                </div>
              </span>
              )
            })}
        {/* <FriendImg src={avatarmedium} alt={"friendImg"}/>
      <p>
        {personaname}
      </p> */}
      {/* <ChatBtn onClick={clickToChat}>
        Chat!
      </ChatBtn> */}
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
margin-bottom: 10px ;
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

margin-top: 20vh;


`


export default FriendList