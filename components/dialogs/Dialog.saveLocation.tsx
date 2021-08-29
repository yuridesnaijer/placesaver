import {Button, Chip, Dialog, Paragraph, TextInput} from 'react-native-paper';
import React, {useState, useReducer, useEffect} from 'react';
import {PermissionsAndroid, View} from 'react-native';
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
  const [placeName, setPlaceName] = useState('');
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
            addPlace({location, placeName, tags: enabledTags});
            onDismiss();
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
    <Dialog visible={isDialogOpen} onDismiss={onDismiss}>
      <Dialog.Title>Save this place!</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Enter a name:</Paragraph>
        <TextInput
          label="Place name"
          value={placeName}
          onChangeText={text => setPlaceName(text)}
        />
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

export default DialogSaveLocation;
