import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

const TopGames = () => {

  const [top10, setTop10] = useState([])
  const [top10Status, setTop10Status] = useState(false)

  // fetches top 10 games

  
  const getTop10 = async () => {
    try {
      
      await fetch("/db/game/top10")
      .then((res) => res.json())
      .then((topGames) => { 
        topGames.data.map(async (eachTop) => {
          // console.log(eachTop.totalLikes)
          const {appid, } = eachTop
          await fetch(
            "https://store.steampowered.com/api/appdetails?appids=" + `${appid}`
            )
            .then((res) => res.json())
            .then((GameData) => {
              setTop10(top10 => [...top10, {games: GameData[appid].data, totalLikes: eachTop.totalLikes}])
              return
            })
            .then(() => setTop10Status(true))
          })
        })
      }
      catch (err){
        console.log("error!", err)
      }
    }
    
    
    useEffect(() => {
    
    getTop10()
    
  }, [])

  return (
  <Wrapper>
      <div>
      {top10Status ? (top10.map((topGames) => {
        const {name, header_image, steam_appid} = topGames.games
        return (
          <div key={steam_appid}>
          <GameName>
          {name}
          </GameName>
          <LikeCounter>
            {"Total Likes: " + topGames.totalLikes}
            </LikeCounter>
          <GameImg src={header_image} alt={"Top 10 Games"}/>
          </div>
        )
      })) : null}
      </div>
    </Wrapper>
  )
  
}

const GameName = styled.p`

color: var(--color-orange);

`

const LikeCounter = styled.p`

color: hotpink;

`

const Wrapper = styled.div`

text-align: center;
margin: 10px;

`

const GameImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  object-fit: contain;
  height: 250px;
`;

export default TopGames