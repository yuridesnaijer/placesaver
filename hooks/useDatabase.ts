import firestore from '@react-native-firebase/firestore';
import IPlace from '../types/interfaces/IPlace';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const useDatabase = () => {
  const {activeUser} = useContext(AuthContext);
  const placesCollection = firestore().collection('places');

  const addPlace = async (place: IPlace) => {
    if (activeUser) {
      return placesCollection.add({place, userId: activeUser.uid});
    }
  };

  return {
    addPlace,
    placesCollection,
  };
};

export default useDatabase;
