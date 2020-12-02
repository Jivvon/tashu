import React, { useState, useEffect, Component } from 'react';
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, Alert, Modal, TouchableHighlight, StyleSheet, Button, Linking} from "react-native";
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from 'react-native-nmap';
import { stations } from 'stations.json';
import DeepLinking from 'react-native-deep-linking';


const MapViewScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        requestLocationPermission();
    }, []);
    const P0 = { latitude: 37.564362, longitude: 126.977011 };
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    const P4 = { latitude: 37.564834, longitude: 126.977218 };
    const CNU_center = {latitude: 36.362178, longitude: 127.344742}

    return <>
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >   
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>a</Text>
                        <View flexDirection="row">
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                            onPress={()=>{
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>출발</Text>    
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                            onPress={()=>{
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>도착</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                            onPress={()=>{
                                openNaverMapApp("nmap://route/bicycle?slat=37.4640070&slng=126.9522394&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=37.5209436&dlng=127.1230074&dname=%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90&appname=org.reactjs.native.example.SE-term");
                            }}
                        >
                            <Text style={styles.textStyle}>길찾기</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    
        <NaverMapView style={{width: '100%', height: '100%'}}
                      showsMyLocationButton={true}
                      center={{...CNU_center, zoom: 16}}
                      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
            {stations.map((station) => {
                station.location = {
                    latitude: +station.location["latitude"],
                    longitude: +station.location["longitude"]
                };

                return (
                    <TouchableOpacity>
                        <Marker key={station.kiosk_no} coordinate={station.location} pinColor="blue" onClick={() => setModalVisible(true)}></Marker>
                    </TouchableOpacity>
                )
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

function openNaverMapApp(url){

    DeepLinking.addScheme('nmap://');
    Linking.addEventListener(url, handleUrl);
    
    const handleUrl = ({url})=>{
        Linking.canOpenURL(url).then((supported)=>{
            if(supported){
                DeepLinking.evaluateUrl(url);
            }
        });
    };
    var appStoreURL = "http://itunes.apple.com/app/id311867728?mt=8";

    if (Linking.canOpenURL(url)){
        Linking.openURL(url)
    }else {Linking.opelURL(appStoreURL)}
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default MapViewScreen;