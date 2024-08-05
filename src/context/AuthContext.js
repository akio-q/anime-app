import { useState } from "react";
import { auth } from '../config/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";

export const AuthContext = createContext(); 

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => { 
      setCurrentUser(user); 
    });

    return () => {
      unsub();
    } 
  }, [])

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )  
}
