import React, { Component, useEffect, useState } from 'react';
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Geolocation from "react-native-geolocation-service"

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
            console.log(error);
        }
    );
};

const App = () => {
    const [location, setLocation] = useState();
    useEffect(() => {
        appInit({setLocation});
    }, []);

    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name="stack" component={MapViewScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
}
 
const HomeScreen = () =>
    <Tab.Navigator>
        <Tab.Screen name={"map"} component={MapViewScreen}/>
        <Tab.Screen name={"text"} component={TextScreen}/>
    </Tab.Navigator>
 
const TextScreen = () => {
    return <Text>text</Text>
} 
 
const AppProvider = () => {
    return (
        <App />
    )
};

export default AppProvider;