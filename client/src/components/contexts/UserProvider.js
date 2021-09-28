import React, {createContext, useState, useEffect} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

  const [user, setUser] = useState({})
  const [userStatus, setUserStatus] = useState(false)

  useEffect(() => {
    
    fetch("/api/account")
    .then((res) => res.json())
    .then((res) => setUser(res))
    .then(() => setUserStatus(true))
    .catch((err) => {
      console.log("error!!", err)
    })
  }, [])


  return (
    <UserContext.Provider value={{user, userStatus}}>

    {children}

    </UserContext.Provider>
  );


};
