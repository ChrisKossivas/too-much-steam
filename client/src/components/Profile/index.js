import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import FriendList from "./FriendList";

import { UserContext } from "../contexts/UserProvider";

const Profile = () => {

  const {user, userStatus, userGames, gameStatus} = useContext(UserContext)

  // possibly make a new component for friends

  console.log(user.id)
  if (gameStatus) {

    console.log(userGames.response.game_count)
  }


  return (
    <Wrapper>
        Profile page! Show user's steam info! 
        {userStatus && gameStatus ? (
          <div>
            <p>
              {"Hello " + user.displayName}
            </p>
            <p>
              {"Total Games Owned: " + userGames.response.game_count}
            </p>
            <FriendList />
          </div>
        ): (
          <div>
            <p>
            Please Sign in To Continue
            </p>
          </div>
        )}
    </Wrapper>
  )

}


const Wrapper = styled.div`



`

export default Profile