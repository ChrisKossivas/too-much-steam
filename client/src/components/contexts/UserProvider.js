import React, {createContext, useState, useEffect} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

  const [user, setUser] = useState({})
  const [userStatus, setUserStatus] = useState(false)
  const [userGames, setUserGames] = useState([])
  const [gameStatus, setGameStatus] = useState(false)


  useEffect(() => {
    
    fetch("/api/account")
    .then((res) => res.json())
    .then((res) => setUser(res))
    .then(() => setUserStatus(true))
    .catch((err) => {
      console.log("error!!", err)
    })
  }, [])

  useEffect(() => {

    if (userStatus) {
      fetch(" http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=93B0F23949E72BE7ACA2A771320DB80F&steamid=76561197999966312&format=json")
      .then((res) => res.json())
      .then((res) => setUserGames(res))
      .then(() => setGameStatus(true))
      .catch((err) => {
        console.log("error!!", err)
      })
    }

  }, [userStatus])

  if (gameStatus) {

    console.log(userGames.response.games[58])
  }


  return (
    <UserContext.Provider value={{user, userStatus, userGames, gameStatus}}>

    {children}

    </UserContext.Provider>
  );


};
