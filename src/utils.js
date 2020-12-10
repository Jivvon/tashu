import {Linking} from "react-native";
import DeepLinking from 'react-native-deep-linking';
import { PermissionsAndroid, Platform } from "react-native";

export function openNaverMapApp(url) {
    const appStoreURL = "http://itunes.apple.com/app/id311867728?mt=8";
    DeepLinking.addScheme('nmap://');    
    
    Linking.canOpenURL(url).then((supported) => {
        if (supported) {
            DeepLinking.evaluateUrl(url);
        } else {
            Linking.openURL(appStoreURL);                
        }
    }, () => {
            console.error(`rejected Linking.canOpenURL(${url})`)
    });
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}



export async function requestLocationPermission() {
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