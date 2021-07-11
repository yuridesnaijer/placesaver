import firestore from '@react-native-firebase/firestore';
import IPlace from '../types/interfaces/IPlace';

const useDatabase = () => {
  const placesCollection = firestore().collection('places');

  const addPlace = async (location: IPlace) => {
    return placesCollection.add(location);
  };

  return {
    addPlace,
    placesCollection,
  };
};

export default useDatabase;
