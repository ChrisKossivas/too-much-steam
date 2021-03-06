import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import Loading from "../Loading";

const GameDisplay = () => {
  const {
    singleGame,
    singleGameStatus,
    gameStatus,
    userGames,
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
        "/api/game/specific/" + `${randomAppId}`
      )
        .then((res) => res.json())
        .then((res) => setSingleGame(res.game))
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

  // render specific game that is fetched to be either liked or disliked
  return (
    <Wrapper>
      {singleGameStatus && singleGame.success === true ? (
        <GameContent>
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
        </GameContent>
      ) : (
        <div>
          <h2>
            <Loading />
          </h2>
        </div>
      )}
      {singleGameStatus && singleGame.success === false ? (
        <div>
        <NoGameData>
          No Game Data to view
          <RefreshBtn onClick = {() => {
            window.location.reload(false);
          }}>Refresh</RefreshBtn>
          </NoGameData>
        </div>
      ) : null}
    </Wrapper>
  );
};

// styling
const RefreshBtn = styled.button`

height: 35px;
width: 90px;
font-size: 15px;
color: white;
background: hotpink;
border-radius: 50px;

`

const NoGameData = styled.h2`
/* display: block; */
top: 30%;
left: 1%;
position: absolute;

`

const Btns = styled.div`

display: flex;
justify-content: center;

`

const GameContent = styled.div`


`

const HoursPlayed = styled.div`
  text-align: center;
  color: hotpink;
`;

const GameName = styled.p`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const GameImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  object-fit: contain;
  height: 250px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GameDisplay;
