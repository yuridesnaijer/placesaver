import * as React from 'react';
import {
  List,
  ActivityIndicator,
  Colors,
  Portal,
  Modal,
  Text,
  Provider,
} from 'react-native-paper';
import {useContext, useEffect, useState} from 'react';
import useDatabase from '../../hooks/useDatabase';
import IPlace from '../../types/interfaces/IPlace';
import {ScrollView} from 'react-native';
import PlacesListItem from './PlacesListItem';
import ModalPlaceDetails from '../modal/Modal.placeDetails';

const PlacesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {placesCollection} = useDatabase();
  const [places, setPlaces] = useState<Array<IPlace>>();
  const [placeDetails, setPlaceDetails] = useState<IPlace>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    placesCollection.onSnapshot(querySnapshot => {
      const list: Array<IPlace> = [];

      querySnapshot.forEach(doc => {
        const {location, placeName} = doc.data();

        list.push({
          id: doc.id,
          location,
          placeName,
        });
      });

      setPlaces(list);

      if (isLoading) {
        setIsLoading(false);
      }
    });
  }, []);

  const showModal = (place: IPlace) => {
    setPlaceDetails(place);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  if (isLoading) {
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  } else if (places?.length) {
    return (
      <Provider>
        <Portal>
          {placeDetails && (
            <ModalPlaceDetails
              place={placeDetails}
              isVisible={visible}
              onDismiss={hideModal}
            />
          )}
        </Portal>
        <ScrollView>
          {places.map(place => (
            <PlacesListItem
              onClick={() => showModal(place)}
              key={place.id}
              place={place}
            />
          ))}
        </ScrollView>
      </Provider>
    );
  } else {
    console.error('no results');
    return null; //TODO: return some text
  }
};

export default PlacesList;
