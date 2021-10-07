import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

import { FiCheckCircle } from 'react-icons/fi'

const LikeButton = () => {
  const {
    singleGame,
    user,
    fetchGame,
    setUser,
  } = useContext(UserContext);

  // Function for like button. Will make a PUT request to the server to increase likes + 1 and total game like + 1 for the specific game.
  // That is to keep track of top 10
  const putLike = () => {
    const requestAddLike = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      "/db/user/like/" + `${user._id}` + "/" + `${singleGame.data.steam_appid}`,
      requestAddLike
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setUser({...user, totalGamesLiked: res.data.totalGamesLiked})
      })
      .catch((err) => {
        console.log("error!!", err);
      });
    fetchGame();
  };
  
  // Function for disliking a game
  const likeGameClick = (ev) => {
    ev.stopPropagation();
    
    putLike();

  };

  // render Button with checkmark icon
  return (
    <Wrapper>
      <LikeBtn
        onClick={(ev) => {
          likeGameClick(ev);
          
        }}
      >
      </LikeBtn>
    </Wrapper>
  );
};

const LikeBtn = styled(FiCheckCircle)`

color: green;
cursor: pointer;
font-size: 50px;

`

const Wrapper = styled.div`


`

export default LikeButton;
