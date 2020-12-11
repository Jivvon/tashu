<<<<<<< HEAD
import React, { Component, useEffect, useState } from 'react';
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Geolocation from "react-native-geolocation-service"

=======
import React, { useEffect, useState } from 'react';
import { Platform } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from "react-native-geolocation-service";
import SplashScreen from "react-native-splash-screen";
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
import MapViewScreen from "./components/MapViewScreen.js";

async function requestPermission(){
    try{
        if (Platform.OS === "ios"){
            return await Geolocation.requestAuthorization("always");
        }
    } catch(e)
<<<<<<< HEAD
{
    console.log(e);
}
}
 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
 

=======
    {
        console.log(e);
    }
}
 
const DARJEON_CITY = { latitude: 36.3505474, longitude: 127.3837673 };
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
async function appInit({setLocation}) {
    requestPermission();
    Geolocation.getCurrentPosition(
        pos => {
<<<<<<< HEAD
            const{latitude, longitude} = pos.coords;
            console.log(pos);
=======
            const { latitude, longitude } = pos.coords;
            if (latitude < 33 || latitude > 44 || longitude < 124 || longitude > 133) {
                console.log('위치를 가져올 수 없습니다')
                return false;
            }
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
            setLocation({
                latitude,
                longitude,
            });
        },
        error => {
<<<<<<< HEAD
=======
            setLocation(DARJEON_CITY) // 대전 시청
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
            console.log(error);
        }
        );
    };
    
<<<<<<< HEAD
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
=======
const App = () => {
    const [location, setLocation] = useState(DARJEON_CITY);
    useEffect(() => {
        SplashScreen.hide();
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
        appInit({setLocation});
    }, []);

    return <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name="stack" component={MapViewScreen}/>
        </Stack.Navigator>
=======
        <MapViewScreen center={location}></MapViewScreen>
>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c
    </NavigationContainer>
}
 
const AppProvider = () => {
    return (
        <App />
    )
};

export default AppProvider;