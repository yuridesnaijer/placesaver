import * as React from 'react';
import {List, ActivityIndicator, Colors} from 'react-native-paper';
import {useEffect, useState} from 'react';
import useDatabase from '../../hooks/useDatabase';
import IPlace from '../../types/interfaces/IPlace';
import {ScrollView} from 'react-native';

const PlacesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<Array<IPlace>>();
  const {placesCollection} = useDatabase();

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

  if (isLoading) {
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  } else if (places?.length) {
    return (
      <ScrollView>
        {places.map(place => (
          <List.Item
            key={place.id}
            title={place.placeName}
            description={`lat: ${place.location.coords.latitude} lon: ${place.location.coords.longitude}`}
            left={props => <List.Icon {...props} icon="folder" />}
          />
        ))}
      </ScrollView>
    );
  } else {
    console.error('no results');
    return null; //TODO: return some text
  }
};

export default PlacesList;
