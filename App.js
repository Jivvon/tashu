import React, { Component, useEffect, useState } from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from 'react-native-nmap';
import Geolocation from "react-native-geolocation-service"
import { Platform } from 'react-native';

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

const App: () => React$Node = () => {

    const [location, setLocation] = useState();
    useEffect(() => {
        
            
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
    }, []);
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.564362, longitude: 126.977011};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    

    return <NaverMapView style={{width: '100%', height: '100%'}}
                         showsMyLocationButton={true}
                         center={{...location, zoom: 16}}
                         onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                         onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={location} onClick={() => console.warn('onClick! p0')}/>
    </NaverMapView>
}

export default App;