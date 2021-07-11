import {PermissionsAndroid, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  Button,
  Dialog,
  FAB,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import useDatabase from '../../hooks/useDatabase';

const requestGeoLocationPermission = async () => {
  try {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Place Saver Location Permission',
        message:
          'Place Saver needs access to your location ' +
          'so you can save them.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  } catch (err) {
    console.warn(err);
  }
};

const ButtonSaveLocation = () => {
  const {addPlace} = useDatabase();
  const [placeName, setPlaceName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const saveCurrentLocation = () => {
    requestGeoLocationPermission().then(result => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          location => {
            addPlace({location, placeName});
            toggleDialog();
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <>
      <FAB
        style={styles.fab}
        small
        icon="add_location_alt"
        onPress={() => toggleDialog()}
      />
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={toggleDialog}>
          <Dialog.Title>Save this place!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
            <TextInput
              label="Place name"
              value={placeName}
              onChangeText={text => setPlaceName(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={saveCurrentLocation}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ButtonSaveLocation;
