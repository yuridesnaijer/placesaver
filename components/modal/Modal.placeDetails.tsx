import IPlace from '../../types/interfaces/IPlace';
import {Button, Modal, Text, Title} from 'react-native-paper';
import * as React from 'react';
import {Linking} from 'react-native';
import {GeoCoordinates} from 'react-native-geolocation-service';

interface Props {
  place: IPlace;
  isVisible: boolean;
  onDismiss: () => void;
}

const containerStyle = {backgroundColor: 'white', padding: 20};

const ModalPlaceDetails: React.FC<Props> = props => {
  const {isVisible, onDismiss, place} = props;

  const startNavigation = (coords: GeoCoordinates) => {
    const url = `google.navigation:q=${coords.latitude},${coords.longitude}`;

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    });
  };

  return (
    <Modal
      visible={isVisible}
      onDismiss={onDismiss}
      contentContainerStyle={containerStyle}>
      <Title>{place.placeName}</Title>
      <Text>{`lat: ${place.location.coords.latitude} lon: ${place.location.coords.longitude}`}</Text>
      <Button
        icon="navigation"
        mode="contained"
        onPress={() => startNavigation(place.location.coords)}>
        Let's go!
      </Button>
    </Modal>
  );
};

export default ModalPlaceDetails;
