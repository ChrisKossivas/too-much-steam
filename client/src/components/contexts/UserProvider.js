import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userStatus, setUserStatus] = useState(false);

  const [userGames, setUserGames] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);

  const [singleGame, setSingleGame] = useState();
  const [singleGameStatus, setSingleGameStatus] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [allUsersStatus, setAllUsersStatus] = useState();

  const [friends, setFriends] = useState([]);
  const [friendStatus, setFriendStatus] = useState(false);

  // fetch user account data
  useEffect(() => {
    if (!userStatus) {
      fetch("/api/account")
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
        })
        .then(() => setUserStatus(true))
        .catch((err) => {
          console.log("error!!", err);
        });
    }
  }, [userStatus]);

  // Fetch all games from steam library depending on steam id
  useEffect(() => {
    if (userStatus) {
      fetch(" /api/game/" + `${user._id}`)
        .then((res) => res.json())
        .then((res) => setUserGames(res.data))
        .then(() => setGameStatus(true))
        .catch((err) => {
          console.log("error!!", err);
        });
    }
  }, [userStatus, user._id]);

  // Fetch specific game depending on which game appid is sent. It is set to randomize the appid of all games in the user's steam library
  const fetchGame = () => {
    const randomAppId =
      userGames.games[Math.floor(Math.random() * (userGames.games.length - 0))]
        .appid;

    fetch("/api/game/specific/" + `${randomAppId}`)
      .then((res) => res.json())
      .then((res) => setSingleGame(res.game))
      .then(() => setSingleGameStatus(true))
      .catch((err) => {
        console.log("error!!", err);
      });
  };

  // fetch all users

  const fetchAllUsers = () => {
    fetch("/db/user")
      .then((res) => res.json())
      .then((allUsers) => setAllUsers(allUsers.data))
      .then(() => setAllUsersStatus(true))
      .catch((err) => {
        console.log("error!!", err);
      });
  };

  // fetch user by id for friends list in profile
  useEffect(() => {
    if (userStatus) {
      user.friendList.map((eachFriendId) => {
        fetch("/db/user/" + `${eachFriendId}`)
          .then((res) => res.json())
          .then((data) => setFriends((friends) => [...friends, data]))
          .then(() => setFriendStatus(true));
      });
    }
  }, [user.friendList, userStatus]);

  // return context to be used across the app
  return (
    <UserContext.Provider
      value={{
        user,
        userStatus,
        userGames,
        gameStatus,
        singleGame,
        singleGameStatus,
        allUsers,
        allUsersStatus,
        fetchGame,
        setSingleGame,
        setSingleGameStatus,
        friends,
        friendStatus,
        fetchAllUsers,
        setAllUsersStatus,
        setAllUsers,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
