import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import FriendList from "./FriendList";

import { UserContext } from "../contexts/UserProvider";

const Profile = () => {

  const {user, userStatus, userGames, gameStatus} = useContext(UserContext)


  // DISPLAY ALL LIKED GAMES NOT WORKING

  // const [displayGamesLiked, setdisplayGamesLiked] = useState([])
  // const [gameDisplayStatus, setgameDisplayStatus] = useState(false)

  // useEffect(() => {
  //   if (userStatus && gameStatus) {

  //     user.totalGamesLikedId.map((eachGameLiked) => {
  //       fetch("https://store.steampowered.com/api/appdetails?appids=" + `${eachGameLiked}`)
  //       .then((res) => res.json())
  //       .then((games) => setdisplayGamesLiked(() => [...displayGamesLiked, displayGamesLiked.push(games[eachGameLiked].data)]))
  //       .then(() => setgameDisplayStatus(true))
  //       .catch((err) => {
  //         console.log("error!!", err)
  //       })
  //   })
  //   }
  // }, [gameStatus, userStatus, user.totalGamesLikedId])


  // console.log(displayGamesLiked)

  return (
    <Wrapper>
        Profile page! Show user's steam info! 
        {userStatus && gameStatus ? (
          <div>
            <p>
              {"Hello " + user.personaname}
            </p>
            <p>
              {"Total Games Owned: " + userGames.game_count}
            </p>
            <p>
              {"Total Games Liked: " + user.totalGamesLiked}
              </p>
              {/* <div>
                {gameDisplayStatus ? (
                  <div>
                  {displayGamesLiked.map((games) => {
                    return (<span>
                      <span>
                      {console.log(games)}
                      {games.name}
                      <img  src= {games.header_image} alt={"gameImage"}/> 
                        </span>
                    </span>)
                  })}
                </div>
                ) : null}
              </div> */}
            <FriendList />
          </div>
        ): (
          <div>
            <p>
            Please Sign in To Continue
            </p>
          </div>
        )}
    </Wrapper>
  )

}


const Wrapper = styled.div`



`

export default Profile