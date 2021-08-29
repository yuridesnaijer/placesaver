import {PermissionsAndroid, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FAB} from 'react-native-paper';
import DialogSaveLocation from '../dialogs/Dialog.saveLocation';

export const requestGeoLocationPermission = async () => {
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <FAB
        style={styles.fab}
        small
        icon="map-marker-plus"
        onPress={() => toggleDialog()}
      />
      <DialogSaveLocation
        isDialogOpen={isDialogOpen}
        onDismiss={toggleDialog}
      />
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
