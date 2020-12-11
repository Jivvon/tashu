import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { Text, TouchableOpacity, TouchableHighlight, StyleSheet, View, Linking } from "react-native";
import NaverMapView, { Marker } from 'react-native-nmap';
import { stations as stationsJson } from 'stations.json'; // 서버 연결 안 되었을 경우 로컬 데이터 사용
import ModalView from './MarkerModal';
import { setNaverMapLink ,useBeforeFirstRender ,openNaverMapApp, requestLocationPermission } from '../utils'

const MapViewScreen = ({ center }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProps, setModalProps] = useState();
    const [start, setStart] = useState(); // FIXME: start랑 destination 합치는 게 더 나을듯
    const [destination, setDestination] = useState();
    const toggleModal = async (station = undefined) => {
        if (station) await setModalProps(station);
        await setModalVisible(!modalVisible);
    }
    const [stations, setStations] = useState(stationsJson);
    const [showMarkers, setShowMarkers] = useState(false);
    const [text, setText] = useState('');
    const [visibleFindRouteBtn, setVisibleFindRouteBtn] = useState(false);
    
    function getStationData() {
        const TASHU_STATION_URL = "http://localhost:8080/station";
        
        fetch(TASHU_STATION_URL)
            .then(res => res.json())
            .then(data => {
                setStations(data);
            }).catch(()=>{
                console.error("서버를 찾을 수 없습니다. 기존 데이터로 대체합니다.")
                setStations(stationsJson);
            }).finally(() => {
                setShowMarkers(true);
            })
    }

    useBeforeFirstRender(() => {
        getStationData();
        setNaverMapLink();
    })
    
    useEffect(() => {
        requestLocationPermission();
    }, []);
    
    useEffect(() => {
        if (start && destination) setText(`출발: ${start.name}\n도착: ${destination.name}`)
        else {
            if (start) setText(`출발: ${start.name}`)
            if (destination) setText(`도착: ${destination.name}`)
        }
        if (destination) setVisibleFindRouteBtn(true)
    }, [start, destination])
    
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
        <View flexDirection="column" style={{ ...styles.topView }}>
            <View>
                <Text style={{ ...styles.textStyle, color:"black" }}>{text ? text : "출발지와 도착지를 설정해주세요"}</Text>
            </View>
            <View flexDirection="row" style={{ ...styles.topViewBtn}}>
                <TouchableHighlight
                    style={{ ...styles.openButton}}
                    onPress={() => {
                        Linking.openURL("https://www.tashu.or.kr/m/rentAction.do?process=dailyStep4")
                    }}
                >
                    <Text style={styles.textStyle}>일일권 구매</Text>    
                </TouchableHighlight>
                <TouchableHighlight
                    style={{ ...styles.openButton}}
                    onPress={() => {
                        Linking.openURL("https://www.tashu.or.kr/m/rentAction.do?process=reuseStep2")
                    }}
                >
                    <Text style={styles.textStyle}>일일 재대여</Text>    
                </TouchableHighlight>
                {visibleFindRouteBtn && <TouchableHighlight
                    style={{ ...styles.openButton, width:"100%" }}
                    onPress={() => {
                        setVisibleFindRouteBtn(false);
                        const uri = {
                            slat: start?.location.latitude,
                            slng: start?.location.longitude,
                            sname: start?.name,
                            dlat: destination.location.latitude,
                            dlng: destination.location.longitude,
                            dname: destination.name,
                            appname: "SE_term"
                        };
                                    
                        openNaverMapApp(uri);
                    }}
                >
                    <Text style={styles.textStyle}>길찾기</Text>
                </TouchableHighlight>}
            </View>
        </View>
        <ModalView modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalProps={modalProps}
            setStart={setStart}
            setDestination={setDestination}
            toggleModal={toggleModal}
            ></ModalView>
        <NaverMapView style={{width: '100%', height: '100%'}}
                      showsMyLocationButton={true}
                      center={{...center, zoom: 16}}
                      useTextureView>
            {showMarkers && stationMarkers}
        </NaverMapView>
    </>
};


const styles = StyleSheet.create({
    topView: {
        marginTop: 40,
        marginLeft: 5,
        minHeight: "5%",
        // maxHeight: "10%",
    },
    topViewBtn: {
        width: "54%"
    },
    absolute: {
        marginTop: 50,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    findRouteButton: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        padding: 8,
        margin: 2,
        width: 60,
        elevation: 2
    },
    openButton: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        padding: 8,
        margin: 2,
        // height: "100%",
        elevation: 2
      },
})

>>>>>>> 7b1468e42699c0e65c0aedbc21f3667ac464435c

export default MapViewScreen;