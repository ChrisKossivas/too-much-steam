import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { UserContext } from "./contexts/UserProvider";

const FindFriends = () => {

  const { allUsers, allUsersStatus, user, userStatus } = useContext(UserContext);

  // console.log(user.totalGamesLikedId)

  if (allUsersStatus && userStatus) {
    
    // console.log("logged in User!", user.totalGamesLikedId)
    allUsers.map((eachUser) => {
      // console.log("other users!", eachUser.totalGamesLikedId)

      let newArray = user.totalGamesLikedId.filter(function(item) {
        return eachUser.totalGamesLikedId.includes(item)
      })

      console.log(newArray.length)
    })
    // let array1 = user.totalGamesLikedId.filter(function(item) {
    //   return !allUsers.totalGamesLikedId.includes(item)
    // })
    // console.log(array1)
  }

  return (
    <Wrapper>
      {allUsersStatus && userStatus ? (
        allUsers.map((eachUser) => {
          if (user._id !== eachUser._id) {
            const {personaname, _id, avatarmedium, totalGamesLikedId} = eachUser
            return (
              <div key={_id}>
  
              <p>
                {personaname}
              </p>
              <img src={avatarmedium} alt={"profileImg"} />
              <p>
                { user.totalGamesLikedId.filter(function(item) {
                  let total = totalGamesLikedId.includes(item)
        return (
          total
          )
      })}
                </p>
              <div>
                


              </div>
              <button>
                Add Friend
                </button>
              </div>
            )
          }
        })
      ): null}
    </Wrapper>
  )

}

const Wrapper = styled.div`


`

export default FindFriends