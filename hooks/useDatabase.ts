import AsyncStorage from '@react-native-async-storage/async-storage';
import IPlace from '../types/interfaces/IPlace';
import {useEffect, useState} from 'react';

/**
 * DB example:
 *
 * {
 *     placesList: [IPlace, IPlace]
 * }
 */

const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<Array<IPlace>>([]);

  useEffect(() => {
    // AsyncStorage.clear();
  }, []);

  useEffect(() => {
    (async () => {
      await getPlaces();
    })();
  }, []);

  const getPlaces = async (): Promise<IPlace[]> => {
    setIsLoading(true);

    try {
      const jsonValue = await AsyncStorage.getItem('@placeSaver_data');
      if (jsonValue) {
        const placesList = JSON.parse(jsonValue).placesList;
        setPlaces(placesList);
        setIsLoading(false);
        return placesList;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
    setIsLoading(false);
    return [];
  };

  const addPlace = async (place: IPlace) => {
    try {
      const existingPlaces = await getPlaces();
      const db = {placesList: [place, ...existingPlaces]};
      const jsonValue = JSON.stringify(db);
      await AsyncStorage.setItem('@placeSaver_data', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return {
    addPlace,
    getPlaces,
    places,
    isLoading,
  };
};

export default useDatabase;
