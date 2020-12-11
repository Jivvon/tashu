import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import NaverMapView, { Marker } from 'react-native-nmap';
// import { stationsJson } from 'stations.json';
import ModalView from './MarkerModal';
import { setNaverMapLink ,useBeforeFirstRender ,openNaverMapApp, requestLocationPermission } from '../utils'

const MapViewScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProps, setModalProps] = useState();
    const [start, setStart] = useState(); // FIXME: start랑 destination 합치는 게 더 나을듯
    const [destination, setDestination] = useState();
    const toggleModal = async (station = undefined) => {
        if (station) await setModalProps(station);
        await setModalVisible(!modalVisible);
    }
    const CNU_center = { latitude: 36.362178, longitude: 127.344742 }
    const [stations, setStations] = useState([]);
    const [showMarkers, setShowMarkers] = useState(false);
    
    function getStationData() {
        const TASHU_STATION_URL = "http://localhost:8080/station";
        
        fetch(TASHU_STATION_URL)
            .then(res => res.json())
            .then(data => {
                setStations(data);
            }).then(() => {
                setShowMarkers(true);
            }).catch(()=>{
                console.error("데이터를 불러오는데 오류가 발생하였습니다")
            })
    }

    useBeforeFirstRender(() => {
        getStationData();
        setNaverMapLink();
    })
    
    useEffect(() => {
        requestLocationPermission();
    }, []);
    
    // useEffect(() => {
    //     // TODO: url 출발 도착으로 수정
    //     if (start && destination) {
    //         if (start == destination) {
    //             setDestination();
    //             return;
    //         }
    //         console.log(`출발 : ${start.name}, 도착: ${destination.name}`)
    //         const url = "nmap://route/bicycle?slat=37.4640070&slng=126.9522394&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=37.5209436&dlng=127.1230074&dname=%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90&appname=org.reactjs.native.example.SE-term";
    //         setStart();
    //         setDestination();
    //         openNaverMapApp(url);
    //     }
    // }, [start, destination])
    
    const stationMarkers = stations.map((station, index) => {
            station.location = {
                latitude: +station.location["latitude"],
                longitude: +station.location["longitude"]
            };
    
            return (
                <TouchableOpacity>
                    <Marker key={index} coordinate={station.location} pinColor="blue"
                        onClick={(e) => {
                            toggleModal(station);
                        }}></Marker>
                </TouchableOpacity>
            )
    })

    return <>
        <ModalView modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalProps={modalProps}
            start = {start}
            setStart={setStart}
            destination = {destination}
            setDestination={setDestination}
            toggleModal={toggleModal}
            ></ModalView>
        <NaverMapView style={{width: '100%', height: '100%'}}
                      showsMyLocationButton={true}
                      center={{...CNU_center, zoom: 16}}
                    //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                    //   onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                    //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
            {showMarkers && stationMarkers}
            
            {/* <Marker coordinate={CNU_center} pinColor="red" onClick={() => console.warn('CNU center')}/> */}
        </NaverMapView>
        {/* <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
            <View style={{backgroundColor: 'gray', padding: 4}}>
                <Text style={{color: 'white'}}>open stack</Text>
            </View>
        </TouchableOpacity> */}
    </>
};

export default MapViewScreen;