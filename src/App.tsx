import React, { Component, useEffect, useState } from 'react';
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, Button, StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Geolocation from "react-native-geolocation-service";
import SplashScreen from "react-native-splash-screen";

import MapViewScreen from "./components/MapViewScreen.js";

async function requestPermission(){
    try{
        if (Platform.OS === "ios"){
            return await Geolocation.requestAuthorization("always");
        }
    } catch(e)
{
    console.log(e);
}
}
 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
 
const CNU_center = { latitude: 36.362178, longitude: 127.344742 }
async function appInit({setLocation}) {
    requestPermission();
    Geolocation.getCurrentPosition(
        pos => {
            const{latitude, longitude} = pos.coords;
            console.log(pos);
            setLocation({
                latitude,
                longitude,
            });
        },
        error => {
            setLocation({ latitude: 36.3505474, longitude: 127.3837673 }) // 대전 시청
            console.log(error);
        }
        );
    };
    
const HomeScreen = () =>
    <Tab.Navigator>
        <Tab.Screen name={"map"} component={MapViewScreen}/>
        <Tab.Screen name={"text"} component={TextScreen}/>
    </Tab.Navigator>
    
const TextScreen = () => {
    return <Text>text</Text>
} 
    
const App = () => {
    const [location, setLocation] = useState();
    useEffect(() => {
        SplashScreen.hide();
        appInit({setLocation});
    }, []);

    return <NavigationContainer>
        <MapViewScreen
            center={location}></MapViewScreen>
        {/* <Stack.Navigator>
            <Stack.Screen name="Tashu" component={HomeScreen}/>
            <Stack.Screen name="stack" component={MapViewScreen}/>
        </Stack.Navigator> */}
    </NavigationContainer>
}
 
const AppProvider = () => {
    return (
        <App />
    )
};

export default AppProvider;