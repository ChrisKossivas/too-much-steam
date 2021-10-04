import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserProvider";

import { FiCheckCircle } from 'react-icons/fi'

const LikeButton = () => {
  const {
    singleGame,
    user,
    fetchGame,
  } = useContext(UserContext);

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
      .then((res) => console.log(res))
      .catch((err) => {
        console.log("error!!", err);
      });
    fetchGame();
  };

  const likeGameClick = (ev) => {
    ev.stopPropagation();

    putLike();
  };

  return (
    <Wrapper>
      <LikeBtn
        onClick={(ev) => {
          likeGameClick(ev);
        }}
      >
        Yes!
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
