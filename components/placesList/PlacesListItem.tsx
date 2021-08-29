import {Chip, Card, Avatar, FAB} from 'react-native-paper';
import * as React from 'react';
import IPlace from '../../types/interfaces/IPlace';
import {tagIcons} from '../dialogs/Dialog.saveLocation';
import useDistance from '../../hooks/useDistance';

interface Props {
  place: IPlace;
  onClick: (...args: any) => void;
}

const LeftContent = props => <Avatar.Icon {...props} icon="pin" />;

const PlacesListItem: React.FC<Props> = props => {
  const {place, onClick} = props;

  const {distance} = useDistance(place.location.coords);

  const tags = place.tags?.map(tag => (
    // @ts-ignore
    <Chip key={tag} icon={tagIcons[tag]} />
  ));

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={place.placeName}
        subtitle={`${distance && distance / 1000}km`}
        left={LeftContent}
      />
      <Card.Cover source={{uri: place.imageData?.uri}} />
      <Card.Content style={styles.tagContainer}>{tags}</Card.Content>
      <Card.Actions>
        <FAB icon="navigation" onPress={onClick} />
      </Card.Actions>
    </Card>
  );
};

const styles = {
  card: {
    margin: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
};

export default PlacesListItem;
