
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

const ProfileInfo = () => {

  const {user, userStatus, userGames, gameStatus} = useContext(UserContext)
  return (
    <Wrapper>

        {userStatus && gameStatus ? (
          <Content>
            <ProfileImg src={user.avatarmedium} alt={"Profile"}/>
            <StatsWrapper>
            <Stats>
              {user.personaname}
            </Stats>
            <Stats>
              {"Total Games Owned: " + userGames.game_count}
            </Stats>
            <Stats>
              {"Total Games Liked: " + user.totalGamesLiked}
              </Stats>
              </StatsWrapper>
            </Content>
        ) : (
          <div>
            please sign in
            </div>
        )}

    </Wrapper>
  )

}


const Stats = styled.li`

margin-bottom: 10px;

`

const ProfileImg = styled.img`

height: 75px;
border-radius: 50px;


`

const StatsWrapper = styled.ul`

margin-left: 10px;
text-align: center;

`

const Wrapper = styled.div`

margin-top: 10px;

`
const Content = styled.div`

display: flex;
justify-content: center;
align-items: center;

`

export default ProfileInfo