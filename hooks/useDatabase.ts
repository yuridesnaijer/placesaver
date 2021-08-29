import firestore from '@react-native-firebase/firestore';
import IPlace from '../types/interfaces/IPlace';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';

const useDatabase = () => {
  const {activeUser} = useContext(AuthContext);
  const placesCollection = firestore().collection('places');
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<Array<IPlace>>();

  useEffect(() => {
    setIsLoading(true);
    const list: Array<IPlace> = [];

    placesCollection
      .where('userId', '==', activeUser?.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {location, placeName, userId, tags} = doc.data();

          list.push({
            id: doc.id,
            userId,
            location,
            placeName,
            tags,
          });
        });

        setPlaces(list);

        if (isLoading) {
          setIsLoading(false);
        }
      });
  }, []);

  const addPlace = async (place: IPlace) => {
    if (activeUser) {
      return placesCollection.add({...place, userId: activeUser.uid});
    }
  };

  return {
    addPlace,
    places,
    isLoading,
  };
};

export default useDatabase;
