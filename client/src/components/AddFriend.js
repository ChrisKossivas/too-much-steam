import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { UserContext } from "./contexts/UserProvider";

const AddFriend = ({friendId, userId}) => {

  
  // make a PUT update for the array of friends in user object
  const addFriendClick = () => {

    console.log(friendId)
    console.log(userId)


    const requestAddFriend = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
  };

    fetch("/db/user/addfriend/" + `${userId}/` + `${friendId}` , requestAddFriend)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => {
      console.log("error!!", err)
    })

  }


  return (
    <Wrapper>
      <AddFriendBtn onClick={addFriendClick}>
        Add As Friend
      </AddFriendBtn>
    </Wrapper>
  )

}

const AddFriendBtn = styled.button`

font-size: 17px;
width: 150px;

color: white;
border-radius: 50px;

background: var( --color-pink) ;

`

const Wrapper = styled.div`

`

export default AddFriend