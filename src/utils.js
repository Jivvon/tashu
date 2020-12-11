import {Linking} from "react-native";
import DeepLinking from 'react-native-deep-linking';
import { PermissionsAndroid, Platform } from "react-native";
import { useState, useEffect } from 'react';


export function useBeforeFirstRender(f) {
  const [hasRendered, setHasRendered] = useState(false)
  useEffect(() => setHasRendered(true), [hasRendered])
    if (!hasRendered) {
        setTimeout(() => {
            f()
      }, 0)
  }
}

handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      } else {
        const appStoreURL = "http://itunes.apple.com/app/id311867728?mt=8";
        Linking.openURL(appStoreURL); 
      }
    }, () => {
        console.error(`rejected Linking.canOpenURL(${url})`)
    });
  }

export function setNaverMapLink() {
    // nmap://actionPath?parameter=value&appname={YOUR_APP_NAME}
    DeepLinking.addScheme('nmap://');
    Linking.addEventListener('url', this.handleUrl);
 
    DeepLinking.addRoute('/route/bicycle', (response) => {
      // example://test
      this.setState({ response });
    });
 
    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
}

addQueryParam = (url, { id, value }) => {
    if (!id || !value) return '';
    if (url.includes('?'))
        return `$?${id}=${value}`
    else return `$&${id}=${value}`
}


export function openNaverMapApp(idValueObj) {
    let url = "nmap://route/bicycle";

    for (const key in idValueObj) {
        const id = `${key}`
        const value = idValueObj[key]
        url += this.addQueryParam(url, { id, value })
    }
    console.log('open', url)
    return Linking.openURL(url);
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