import React, {useContext, useState} from 'react' 
import styled from 'styled-components'
import { UserContext } from "../contexts/UserProvider";

const GameList = () => {

  
  const {user, userStatus, userGames, gameStatus} = useContext(UserContext)

  const [displayGamesLiked, setdisplayGamesLiked] = useState([])
  const [gameDisplayStatus, setgameDisplayStatus] = useState(false)




  return (
    <Wrapper>
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