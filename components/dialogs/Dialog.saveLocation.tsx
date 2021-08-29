import React, {useState} from 'react';
import {Button, Chip, Dialog, Paragraph, TextInput} from 'react-native-paper';
import {Asset, launchCamera} from 'react-native-image-picker';
import {Image, PermissionsAndroid, View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {requestGeoLocationPermission} from '../buttons/Button.saveLocation';
import useDatabase from '../../hooks/useDatabase';

interface Props {
  isDialogOpen: boolean;
  onDismiss: () => void;
}

const tags = ['RESTAURANT', 'NATURE', 'LEISURE'];

export const tagIcons = {
  RESTAURANT: 'food-fork-drink',
  NATURE: 'nature',
  LEISURE: 'airballoon',
};

const DialogSaveLocation: React.FC<Props> = props => {
  const {isDialogOpen, onDismiss} = props;

  const {addPlace} = useDatabase();
  const [placeName, setPlaceName] = useState<string>('');
  const [placePhoto, setPlacePhoto] = useState<Asset>();
  const [enabledTags, setEnabledTags] = useState<string[]>([]);

  const toggleTag = (value: string) => {
    let newTags: string[] = [...enabledTags];
    const existingTagIndex = newTags.findIndex(tag => tag === value);

    if (existingTagIndex > -1) {
      newTags.splice(existingTagIndex, 1);
    } else {
      newTags.push(value);
    }

    setEnabledTags(newTags);
  };

  const saveCurrentLocation = () => {
    requestGeoLocationPermission().then(result => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          location => {
            addPlace({
              location,
              placeName,
              tags: enabledTags,
              imageData: placePhoto,
            });
            onDismiss();
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );

        // Clear the input
        setPlaceName('');
        setPlacePhoto(undefined);
      }
    });
  };

  return (
    <Dialog visible={isDialogOpen} onDismiss={onDismiss}>
      <Dialog.Title>Save this place!</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Enter a name:</Paragraph>
        <TextInput
          label="Place name"
          value={placeName}
          onChangeText={text => setPlaceName(text)}
        />

        {!placePhoto && (
          <Button
            onPress={() =>
              launchCamera(
                {
                  cameraType: 'front',
                  mediaType: 'photo',
                },
                response => {
                  if (response.assets) {
                    setPlacePhoto(response.assets[0]);
                  }
                },
              )
            }>
            Add Photo
          </Button>
        )}
        {placePhoto && (
          <Image style={styles.image} source={{uri: placePhoto.uri}} />
        )}
        <Paragraph>Tags:</Paragraph>
        <View>
          {tags.map(tag => {
            return (
              <Chip
                key={tag.toLowerCase()}
                selected={enabledTags.includes(tag)}
                // @ts-ignore
                icon={tagIcons[tag]}
                onPress={() => toggleTag(tag)}>
                {tag.toLowerCase()}
              </Chip>
            );
          })}
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={saveCurrentLocation}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginTop: 8,
  },
});

export default DialogSaveLocation;
