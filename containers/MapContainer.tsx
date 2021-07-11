import * as React from 'react';
import {List} from 'react-native-paper';
import Map from '../components/map/Map';
import ButtonSaveLocation from '../components/buttons/Button.saveLocation';

const MapContainer = () => (
  <>
    <Map />
    <ButtonSaveLocation />
  </>
);

export default MapContainer;
