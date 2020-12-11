import React, { useEffect, useState } from 'react';
import { Platform } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
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
 
const DARJEON_CITY = { latitude: 36.3505474, longitude: 127.3837673 };
async function appInit({setLocation}) {
    requestPermission();
    Geolocation.getCurrentPosition(
        pos => {
            const { latitude, longitude } = pos.coords;
            if (latitude < 33 || latitude > 44 || longitude < 124 || longitude > 133) {
                console.log('위치를 가져올 수 없습니다')
                return false;
            }
            setLocation({
                latitude,
                longitude,
            });
        },
        error => {
            setLocation(DARJEON_CITY) // 대전 시청
            console.log(error);
        }
        );
    };
    
const App = () => {
    const [location, setLocation] = useState(DARJEON_CITY);
    useEffect(() => {
        SplashScreen.hide();
        appInit({setLocation});
    }, []);

    return <NavigationContainer>
        <MapViewScreen center={location}></MapViewScreen>
    </NavigationContainer>
}
 
const AppProvider = () => {
    return (
        <App />
    )
};

export default AppProvider;