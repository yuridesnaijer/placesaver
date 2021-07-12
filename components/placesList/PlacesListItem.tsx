import {List, Modal, Portal, Provider, Text} from 'react-native-paper';
import * as React from 'react';
import IPlace from '../../types/interfaces/IPlace';

interface Props {
  place: IPlace;
  onClick: (...args: any) => void;
}

const PlacesListItem: React.FC<Props> = props => {
  const {place, onClick} = props;

  return (
    <List.Item
      onPress={onClick}
      key={place.id}
      title={place.placeName}
      description={`lat: ${place.location.coords.latitude} lon: ${place.location.coords.longitude}`}
      left={props => <List.Icon {...props} icon="folder" />}
    />
  );
};

export default PlacesListItem;
