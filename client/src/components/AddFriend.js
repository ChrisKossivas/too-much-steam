import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { UserContext } from "./contexts/UserProvider";

const AddFriend = ({friendId, userId}) => {
  const { allUsers, allUsersStatus, user, userStatus, fetchAllUsers,setAllUsers, setAllUsersStatus } = useContext(UserContext);

  // make a PUT update for the array of friends in user object
  const addFriend = () => {

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
    // fetchAllUsers();
    fetch("/db/user")
    .then((res) => res.json())
    .then((res) => setAllUsers(res.data))
    .then(() => setAllUsersStatus(true))
    .catch((err) => {
      console.log("error!!", err);
    });

  }

  console.log("outta", allUsers)

  const addFriendClick = (ev) => {
    ev.stopPropagation();

    addFriend();
    // fetchAllUsers();
    window.location.reload(false);
    
    console.log("inside func", allUsers)
  }

  
  console.log("outside func", allUsers)

  return (
    <Wrapper>
      <AddFriendBtn onClick={(ev) => addFriendClick(ev)}>
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
margin-bottom: 10px ;
background: var( --color-pink) ;

`

const Wrapper = styled.div`

`

export default AddFriend