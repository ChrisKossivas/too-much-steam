import React, {useContext, useEffect, useState} from 'react' 
import styled from 'styled-components'
import { UserContext } from "../contexts/UserProvider";

const GameList = () => {

  
  const {user, userStatus, userGames, gameStatus} = useContext(UserContext)

  const [displayGamesLiked, setdisplayGamesLiked] = useState([])
  const [gameDisplayStatus, setgameDisplayStatus] = useState(false)

  console.log(user.totalGamesLikedId)
  useEffect(() => {

    user.totalGamesLikedId.map((games) => {
      
      // keeps fetching the data if I set state to it 

      // fetch("https://store.steampowered.com/api/appdetails?appids=" + `${games}`)
      // .then((res) => res.json())
      // .then((res) => {console.log(res[games].data)})
  
    })
  
  }, [displayGamesLiked,  user.totalGamesLikedId])
  
  return (
    <Wrapper>
      return list of liked games here
    </Wrapper>
  )

}


const Wrapper = styled.div`

margin-top: 15px;
display: flex;
justify-content: center;
align-items: center;


`

export default GameList