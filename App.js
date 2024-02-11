import React from "react";
import 'react-native-gesture-handler'

import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./app/navigation/MainNavigation";
import LoginProvider from "./app/context/LoginProvider";

export default function App(){
  return(
    <LoginProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </LoginProvider>
    
  )
}