import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AppForm from "../components/AppForm";
import ImageUpload from "../components/ImageUpload";
import UserProfile from "../components/UserProfile";
import HomePage from "../components/HomePage";
import DrawerNavigation from "./DrawerNavigation";
import { useLogin } from "../context/LoginProvider";

const Stack = createStackNavigator();

const StackNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen component={AppForm} name="AppForm"/>
      <Stack.Screen component={ImageUpload} name="ImageUpload"/>
      <Stack.Screen component={UserProfile} name="UserProfile"/>
    </Stack.Navigator>
  )
}

const MainNavigation = () =>{
    const {isLoggedIn} = useLogin()
  return(
      isLoggedIn ?  <DrawerNavigation /> :<StackNavigator /> 
  )
}

export default MainNavigation;