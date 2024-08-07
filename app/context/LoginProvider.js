import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const LoginContext = createContext()

const LoginProvider = ({children})=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile,setProfile] = useState({});
    const [loginPending,setLoginPending] = useState(false);

    const fetchUser = async ()=>{
      //  setLoginPending(true)
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
             await client.get('/profile',{
                headers:{
                    Authorization:`JWT ${token}`
                }
             })

             if(res.data.success){
                setProfile(res.data.profile);
                setIsLoggedIn(true)
             }
       //      setLoginPending(false);
        }else{
            setProfile({})
            setIsLoggedIn(false)
        //    setLoginPending(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn,profile,setProfile}}>
        {children}
    </LoginContext.Provider>
}

export const useLogin = () =>useContext(LoginContext)

export default LoginProvider;