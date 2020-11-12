import React, { useState, useEffect } from 'react';
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View} from "react-native";
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from 'react-native-nmap';
import { stations } from 'stations.json';

const MapViewScreen = ({navigation}) => {
    useEffect(() => {
        requestLocationPermission();
    }, []);
    const P0 = { latitude: 37.564362, longitude: 126.977011 };
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    const P4 = { latitude: 37.564834, longitude: 126.977218 };
    const CNU_center = {latitude: 36.362178, longitude: 127.344742}
 

    return <>
        <NaverMapView style={{width: '100%', height: '100%'}}
                      showsMyLocationButton={true}
                      center={{...CNU_center, zoom: 16}}
                      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
            {stations.map(function (station, index) {
                const location = station.location.map(x => +x)
                const location_coor = {
                    latitude: location[0],
                    longitude: location[1]
                };

                return <Marker key={index} coordinate={location_coor} pinColor="blue" onClick={() => console.warn(`click index ${index}`)}></Marker>;
            })}
            
            <Marker coordinate={CNU_center} pinColor="red" onClick={() => console.warn('CNU center')}/>
        </NaverMapView>
        <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
            <View style={{backgroundColor: 'gray', padding: 4}}>
                <Text style={{color: 'white'}}>open stack</Text>
            </View>
        </TouchableOpacity>
    </>
};

async function requestLocationPermission() {
    if (Platform.OS !== 'android') return;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'show my location need Location permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

export default MapViewScreen;