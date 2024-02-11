import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../components/HomePage';
import UserProfile from '../components/UserProfile';
import { useLogin } from '../context/LoginProvider';
import { signOut } from '../../databasemo/controllers/user';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    const {setIsLoggedIn,profile} = useLogin();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', backgroundColor: '#f6f6f6', marginBottom: 20 }}>
                    <View>
                        <Text>{profile.fullname}</Text>
                        <Text>{profile.email}</Text>
                    </View>
                    <Image source={{ uri: profile.avatar || 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc3BsYXNofGVufDB8fDB8fHww' }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity 
            style={{ position: 'absolute',right:0,left:0, bottom: 0, backgroundColor:'#f6f6f6',padding:20 }}
            onPress={async()=>{ 
                const isLoggedOut = await signOut()
                if(isLoggedOut){
                    
                }
                setIsLoggedIn(false)}}
            >
                <Text> Logout </Text>
            </TouchableOpacity>
        </View>

    )
}

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:true,headerStyle:{backgroundColor:'transparent',elevation:0,shadowOpacity:0},
        headerTitle:''}} drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen component={HomePage} name='HomePage' />
            <Drawer.Screen component={UserProfile} name='UserProfile' />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;