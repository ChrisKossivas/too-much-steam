import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Loading from "../Loading";

const TopGames = () => {
  const [top10, setTop10] = useState([]);
  const [top10Status, setTop10Status] = useState(false);

  // fetches top 10 games
  const getTop10 = async () => {
    try {
      await fetch("/db/game/top10")
        .then((res) => res.json())
        .then((topGames) => {

          topGames.data.map(async (eachTop) => {

            const { appid } = eachTop;
            await fetch("/api/game/specific/" + `${appid}`)
              .then((res) => res.json())
              .then((GameData) => {
                setTop10((top10) => [
                  ...top10,
                  { games: GameData.game, totalLikes: eachTop.totalLikes },
                ]);
                return;
              })
              .then(() => setTop10Status(true));
          });
        });
    } 
    catch (err) {
      console.log("error!", err);
    }
  };

  // call function on mount to display top 10 games
  useEffect(() => {

    getTop10();

  }, []);

  // render top 10 games
  return (
    <Wrapper>
      <div>
        {top10Status ? (
          top10.map((topGames) => {

            const { name, header_image, steam_appid } = topGames.games.data;
            
            return (
              <div key={steam_appid}>
                <GameName>{name}</GameName>
                <LikeCounter>
                  {"Total Likes: " + topGames.totalLikes}
                </LikeCounter>
                <GameImg src={header_image} alt={"Top 10 Games"} />
              </div>
            );
          })
        ) : (
          <div>
            <h2>
              <Loading />
            </h2>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

// styling
const GameName = styled.p`
  color: var(--color-orange);
`;

const LikeCounter = styled.p`
  color: hotpink;
`;

const Wrapper = styled.div`
  text-align: center;
  margin: 10px;
`;

const GameImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  object-fit: contain;
  height: 250px;
`;

export default TopGames;
