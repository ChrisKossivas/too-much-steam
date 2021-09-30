import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

const GameDisplay = () => {

  const { singleGame, singleGameStatus, gameStatus, userGames, user} = useContext(UserContext);



  
  const likeClick = () => {
    const requestAddLike = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
  };

    fetch("/db/user/like/" + `${user._id}` + "/" + `${singleGame.data.steam_appid}`, requestAddLike)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => {
      console.log("error!!", err)
    })
  }



  const dislikeClick = () => {
    const requestAddLike = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
  };

    fetch("/db/user/dislike/" + `${user._id}` + "/" + `${singleGame.data.steam_appid}`, requestAddLike)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => {
      console.log("error!!", err)
    })
  }


  return (
    <Wrapper>
      {singleGameStatus && singleGame.success === true ? (
        <div>
          <GameImg src={singleGame.data.header_image} alt={"Specific Game"} />
          <GameName>
            {singleGame.data.name}
          </GameName>
          {userGames.games.map((playTime) => {
            if (playTime.appid === singleGame.data.steam_appid) {
              return (
                <div key={playTime.appid}>
                <HoursPlayed>
                <p>
                  {"Total Playtime " + Math.round(playTime.playtime_forever / 60) + " Hours!"}
                </p>
                </HoursPlayed>
                <button onClick = {likeClick}>
                  Like!
                </button>
                <button onClick = {dislikeClick}>
                  dislike!
                </button>
                </div>
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