import {GeoPosition} from 'react-native-geolocation-service';

export default interface IPlace {
  id?: string; //Optional because mongo will take care of this and we dont specify it when adding records
  location: GeoPosition;
  placeName: string;
}
