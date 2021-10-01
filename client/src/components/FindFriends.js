import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { UserContext } from "./contexts/UserProvider";
import AddFriend from "./AddFriend";

const FindFriends = () => {

  const { allUsers, allUsersStatus, user, userStatus } = useContext(UserContext);

  // if (allUsersStatus && userStatus) {
    
  //   allUsers.map((eachUser) => {

  //     let newArray = user.totalGamesLikedId.filter(function(item) {
  //       return eachUser.totalGamesLikedId.includes(item)
  //     })

  //     console.log(newArray.length)
  //   })
  // }

  
  return (
    <Wrapper>
      {allUsersStatus && userStatus ? (
        allUsers.map((eachUser) => {
          const alreadyFriends = user.friendList.filter((friends) => 
            friends.includes(eachUser._id)
          )
          // console.log(alreadyFriends[0])
          if (user._id !== eachUser._id && alreadyFriends[0] !== eachUser._id) {
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
              <AddFriend friendId={_id} userId={user._id}/>
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