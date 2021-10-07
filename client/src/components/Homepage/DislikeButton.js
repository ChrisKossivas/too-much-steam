import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

import { FiXCircle } from 'react-icons/fi'

const DislikeButton = () => {

  const {
    singleGame,
    user,
    fetchGame,
  } = useContext(UserContext);

  // Function for dislike button. Will make a PUT request to the server to increase dislikes + 1
  const putDislike = () => {
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
    fetchGame()
  }

  // Function for disliking a game
  const dislikeClick = (ev) => {

    ev.stopPropagation();

    putDislike();


  }
  // render button with dislike X icon
  return (
    <Wrapper>
      <DislikeBtn
      onClick={(ev) => {
        dislikeClick(ev);
      }}
      >
      </DislikeBtn>
    </Wrapper>
  )

}

// styling
const Wrapper = styled.div`

`

const DislikeBtn = styled(FiXCircle)`
color: red;
cursor: pointer;
font-size: 50px;



`

export default DislikeButton