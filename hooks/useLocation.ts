import {useEffect, useState} from 'react';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {requestGeoLocationPermission} from '../components/buttons/Button.saveLocation';
import {PermissionsAndroid} from 'react-native';

const useLocation = () => {
  const [location, setLocation] = useState<GeoPosition>();

  useEffect(() => {
    let watchId: number;
    requestGeoLocationPermission().then(result => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        watchId = Geolocation.watchPosition(
          success => {
            setLocation(success);
          },
          error => console.error(error),
          {
            interval: 1000,
          },
        );
      }
    });

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return {
    location,
  };
};

export default useLocation;
