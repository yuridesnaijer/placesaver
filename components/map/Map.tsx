import MapView from 'react-native-maps';
import React from 'react';
import {StyleSheet} from 'react-native';
import useLocation from '../../hooks/useLocation';

const Map = () => {
  const {location} = useLocation();

  if (!location) {
    return null; //TODO: show loading spinner
  }

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Map;
