import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { UserContext } from "./contexts/UserProvider";
import AddFriend from "./AddFriend";

const FindFriends = () => {

  const { allUsers, allUsersStatus, user, userStatus } = useContext(UserContext);

  let similarLikes = []

  if (allUsersStatus && userStatus) {
    
    allUsers.map((eachUser) => {

      let newArray = user.totalGamesLikedId.filter(function(item) {
        return eachUser.totalGamesLikedId.includes(item)
      })

      similarLikes.push(newArray.length)

      // console.log(newArray.length)
    })
  }

  console.log(similarLikes[1])
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
                {"Liked Games in Common: " + similarLikes[1]}
                {/* { user.totalGamesLikedId.filter(function(item) {
                  let result = totalGamesLikedId.includes(item)
                  if (result) {
                    return (
                      similarLikes[1]
                      )
                  }
                })} */}
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
margin-top: 10px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`

export default FindFriends