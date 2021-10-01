import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

const DislikeButton = () => {


  const {
    singleGame,
    user,
    fetchGame,
  } = useContext(UserContext);

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


  const dislikeClick = (ev) => {

    ev.stopPropagation();

    putDislike();


  }



  return (
    <Wrapper>
      <button
      onClick={(ev) => {
        dislikeClick(ev);
      }}
      >
        Actual dislike!!
      </button>
    </Wrapper>
  )

}

const Wrapper = styled.div`


`

export default DislikeButton