import {getPreciseDistance} from 'geolib';
import useLocation from './useLocation';
import {GeoCoordinates} from 'react-native-geolocation-service';
import {GeolibInputCoordinates} from 'geolib/es/types';
import {useEffect, useState} from 'react';

const useDistance = (destinationCoords: GeoCoordinates) => {
  const {location} = useLocation();

  const [distance, setDistance] = useState<number>();

  useEffect(() => {
    const d = getDistanceFromCurrentLocation(destinationCoords);
    setDistance(d);
  }, [location, destinationCoords]);

  const getDistanceFromCurrentLocation = (
    destinationCoords: GeoCoordinates,
  ) => {
    if (location && destinationCoords) {
      return getPreciseDistance(
        location?.coords as GeolibInputCoordinates,
        destinationCoords,
      );
    }
  };

  return {
    distance,
  };
};

export default useDistance;
