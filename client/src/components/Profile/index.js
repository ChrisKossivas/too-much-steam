import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import FriendList from "./FriendList";
import ProfileInfo from "./ProfileInfo";
import GameList from "./GameList";

import { UserContext } from "../contexts/UserProvider";

const Profile = () => {

  const {user, userStatus, userGames, gameStatus} = useContext(UserContext)

  console.log('FROM DB', user)
  console.log("ALL GAMES IN USER LIBRARY", userGames)
  return (
    <Wrapper>
        {userStatus && gameStatus ? (
          <div>
              <ProfileInfo />
              <GameList />
              <FriendList />
          </div>
        ): (
          <div>
            <h2>
            Loading Profile...
            </h2>
          </div>
        )}
    </Wrapper>
  )

}


const Wrapper = styled.div`



`

export default Profile