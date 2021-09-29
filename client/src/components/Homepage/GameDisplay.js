import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

const GameDisplay = () => {

  const { singleGame, singleGameStatus, gameStatus, userGames} = useContext(UserContext);

  console.log(userGames)

  return (
    <Wrapper>
      {singleGameStatus && singleGame.success === true ? (
        <div>
          <GameImg src={singleGame.data.header_image} alt={"Specific Game"} />
          <GameName>
            {singleGame.data.name}
          </GameName>
          {userGames.games.map((playTime) => {
            // console.log(singleGame)
            if (playTime.appid === singleGame.data.steam_appid) {
              return (
                <HoursPlayed key={playTime.appid}>
                <p>
                  {"Total Playtime " + Math.round(playTime.playtime_forever / 60) + " Hours!"}
                </p>
                </HoursPlayed>
              )

            }
          })}
        </div>
      ) : null}
      {singleGameStatus && singleGame.success === false ? (
        <div>
          No Game Data to view
        </div>
      ) : null}
    </Wrapper>
  )

}

const HoursPlayed = styled.div`

text-align: center;

`

const GameName = styled.p`

font-size: 30px;
font-weight: bold;
display: flex;
justify-content: center;

`

const GameImg = styled.img`
width: 350px;
/* height: 180px; */
object-fit: contain;
height: 200px;

`

const Wrapper = styled.div`
/* margin-left: 45px ; */
display: flex;
justify-content: center;
align-items: center;

`

export default GameDisplay