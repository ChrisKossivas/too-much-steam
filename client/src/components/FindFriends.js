import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "./contexts/UserProvider";
import AddFriend from "./AddFriend";
import Loading from "./Loading";

const FindFriends = () => {
  const { allUsers, allUsersStatus, user, userStatus, fetchAllUsers } =
    useContext(UserContext);

  // fetch all users from mongodb
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // render users that are not already friends with the logged in user
  return (
    <Wrapper>
      {allUsersStatus && userStatus ? (
        allUsers.map((eachUser) => {
          
          // filter the results depending on if the user is already friends with someone and their total common liked games
          const alreadyFriends = user.friendList.filter((friends) =>
            friends.includes(eachUser._id)
          );
          const commonGames = user.totalGamesLikedId.filter((games) =>
            eachUser.totalGamesLikedId.includes(games)
          );

          if (user._id !== eachUser._id && alreadyFriends[0] !== eachUser._id) {
            const { personaname, _id, avatarmedium } = eachUser;
            return (
              <div key={_id}>
                <p>{personaname}</p>
                <img src={avatarmedium} alt={"profileImg"} />

                <p>{"Liked Games in Common: " + commonGames.length}</p>
                <div></div>
                <AddFriend friendId={_id} userId={user._id} />
              </div>
            );
          }
        })
      ) : (
        <div>
          <h2>
            <Loading />
          </h2>
        </div>
      )}
    </Wrapper>
  );
};

// styling
const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export default FindFriends;
