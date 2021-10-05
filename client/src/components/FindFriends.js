import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { UserContext } from "./contexts/UserProvider";
import AddFriend from "./AddFriend";

const FindFriends = () => {

  const { allUsers, allUsersStatus, user, userStatus, fetchAllUsers, setAllUsers, setAllUsersStatus,  } = useContext(UserContext);

  const [alreadyWeFriend, setAlreadyWeFriend] = useState()

  useEffect(() => {

    fetchAllUsers()
  }, [])


  console.log(allUsers)

  return (
    <Wrapper>
      {allUsersStatus && userStatus ? (
        allUsers.map((eachUser) => {
          const alreadyFriends = user.friendList.filter((friends) => friends.includes(eachUser._id))
          const commonGames =  user.totalGamesLikedId.filter((games) => eachUser.totalGamesLikedId.includes(games))

          // console.log("alreadyfriends",alreadyFriends)
          // console.log("without const", user.friendList.filter((friends) => friends.includes(eachUser._id)))

          if (user._id !== eachUser._id && alreadyFriends[0] !== eachUser._id) {
            const {personaname, _id, avatarmedium, totalGamesLikedId} = eachUser
            return (
              <div key={_id}>
  
              <p>
                {personaname}
              </p>
              <img src={avatarmedium} alt={"profileImg"} />

              <p>
                {"Liked Games in Common: " + commonGames.length}
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
flex-direction: column;
text-align: center;
`

export default FindFriends