import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import NaverMapView, { Marker } from 'react-native-nmap';
import { stations } from 'stations.json';
import ModalView from './MarkerModal';
import { requestLocationPermission } from '../utils'

const MapViewScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => setModalVisible(!modalVisible);
    useEffect(() => {
        requestLocationPermission();
    }, []);

    const CNU_center = {latitude: 36.362178, longitude: 127.344742}

    return <>
        <ModalView modalVisible={modalVisible} toggleModal={toggleModal}></ModalView>
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
                        <Marker key={station.kiosk_no} coordinate={station.location} pinColor="blue"
                            onClick={(e) => {
                                toggleModal()
                            }}></Marker>
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

export default MapViewScreen;