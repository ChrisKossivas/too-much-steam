import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";

const GameDisplay = () => {
  const {
    singleGame,
    singleGameStatus,
    gameStatus,
    userGames,
    user,
    fetchGame,
    userStatus,
    setSingleGame,
    setSingleGameStatus,
  } = useContext(UserContext);

  // fetch specific game data on mount
  useEffect(() => {
    if (gameStatus && userStatus) {
      const randomAppId =
        userGames.games[
          Math.floor(Math.random() * (userGames.games.length - 0))
        ].appid;

      fetch(
        "https://store.steampowered.com/api/appdetails?appids=" +
          `${randomAppId}`
      )
        .then((res) => res.json())
        .then((res) => setSingleGame(res[randomAppId]))
        .then(() => setSingleGameStatus(true))
        .catch((err) => {
          console.log("error!!", err);
        });
    }
  }, [
    gameStatus,
    userGames.games,
    userStatus,
    setSingleGame,
    setSingleGameStatus,
  ]);

  return (
    <Wrapper>
      {singleGameStatus && singleGame.success === true ? (
        <div>
          <GameImg src={singleGame.data.header_image} alt={"Specific Game"} />
          <GameName>{singleGame.data.name}</GameName>
          {userGames.games.map((playTime) => {
            if (playTime.appid === singleGame.data.steam_appid) {
              return (
                <div key={playTime.appid}>
                  <HoursPlayed>
                    <p>
                      {"Total Playtime " +
                        Math.round(playTime.playtime_forever / 60) +
                        " Hours!"}
                    </p>
                  </HoursPlayed>
                  <Btns>
                  <LikeButton />
                  <DislikeButton />
                  </Btns>
                </div>
              );
            }
          })}
        </div>
      ) : null}
      {singleGameStatus && singleGame.success === false ? (
        <div>No Game Data to view</div>
      ) : null}
    </Wrapper>
  );
};

const Btns = styled.div`

display: inline-flex;


`

const HoursPlayed = styled.div`
  text-align: center;
`;

const GameName = styled.p`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const GameImg = styled.img`
  width: 350px;
  object-fit: contain;
  height: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GameDisplay;
