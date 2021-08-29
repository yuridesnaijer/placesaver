import * as React from 'react';
import {ActivityIndicator, Colors, Portal, Provider} from 'react-native-paper';
import {useState} from 'react';
import useDatabase from '../../hooks/useDatabase';
import IPlace from '../../types/interfaces/IPlace';
import {ScrollView} from 'react-native';
import PlacesListItem from './PlacesListItem';
import ModalPlaceDetails from '../modal/Modal.placeDetails';

const PlacesList = () => {
  const {places, isLoading} = useDatabase();
  const [placeDetails, setPlaceDetails] = useState<IPlace>();
  const [visible, setVisible] = useState(false);

  console.log('places', places);

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
