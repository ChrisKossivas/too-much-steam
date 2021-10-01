import React, {createContext, useState, useEffect} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

  const [user, setUser] = useState({})
  const [userStatus, setUserStatus] = useState(false)
  const [userGames, setUserGames] = useState([])
  const [gameStatus, setGameStatus] = useState(false)

  const [singleGame, setSingleGame] = useState()
  const [singleGameStatus, setSingleGameStatus] = useState(false)

  const [allUsers, setAllUsers] = useState([])
  const [allUsersStatus, setAllUsersStatus] = useState(false)

  // fetch user account data
  useEffect(() => {
    
    fetch("/api/account")
    .then((res) => res.json())
    .then((res) => setUser(res))
    .then(() => setUserStatus(true))
    .catch((err) => {
      console.log("error!!", err)
    })
  }, [])
  // fetch all game ids in steam library based on account id
  useEffect(() => {

    if (userStatus) {
      fetch(" http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=93B0F23949E72BE7ACA2A771320DB80F&steamid=" + `${user._id}` + "&format=json")
      .then((res) => res.json())
      .then((res) => setUserGames(res.response))
      .then(() => setGameStatus(true))
      .catch((err) => {
        console.log("error!!", err)
      })
    }

  }, [userStatus, user._id])

  // fetch specific game data
  const fetchGame = () => {

    // useEffect(() => {
      // if (gameStatus && userStatus) {
  
        const randomAppId = userGames.games[Math.floor(Math.random() * (userGames.games.length - 0))].appid
  
        fetch("https://store.steampowered.com/api/appdetails?appids=" + `${ randomAppId}`)
        .then((res) => res.json())
        .then((res) => setSingleGame(res[randomAppId]))
        .then(() => setSingleGameStatus(true))
        .catch((err) => {
          console.log("error!!", err)
        })
      // }
    // }, [gameStatus, userGames.games, userStatus])
  }

  // fetch all users
  useEffect(() => {
    fetch("/db/user")
    .then((res) => res.json())
    .then((allUsers) => setAllUsers(allUsers.data))
    .then(() => setAllUsersStatus(true))
    .catch((err) => {
      console.log("error!!", err)
    })
  }, [])

  return (
    <UserContext.Provider value={{user, userStatus, userGames, gameStatus, singleGame, singleGameStatus, allUsers, allUsersStatus, fetchGame, setSingleGame, setSingleGameStatus}}>

    {children}

    </UserContext.Provider>
  );


};
