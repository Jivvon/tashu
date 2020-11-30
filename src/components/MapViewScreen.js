import React, { useState, useEffect, Component } from 'react';
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, Alert, Modal, TouchableHighlight, StyleSheet} from "react-native";
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from 'react-native-nmap';
import { stations } from 'stations.json';


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
                    <Text style={styles.modalText}>${stations.name}</Text>

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