"use client"
//Simple Context Provider example
import {useState, createContext} from 'react';

// Initialise my context
export const MyContext = createContext();

export default function App({children}) {

  // Context to pass on
  // const [userName, setUserName] = useState(null)
  const [userName, setUserName] = useState("Test User 1")
  const updateUserName = (newUserName) => setUserName(newUserName)

  // const [userEmail, setUserEmail] = useState(null)
  const [userEmail, setUserEmail] = useState("1@1")
  const updateEmail = (newUserEmail) => setUserEmail(newUserEmail)

  // const [loggedIn, setLoggedIn] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  const updateLoggedIn = (bool) => setLoggedIn(bool)

  return (
    <MyContext.Provider value={{userName,updateUserName, userEmail, updateEmail, loggedIn, updateLoggedIn}}>
      {children}
    </MyContext.Provider>
  )
}