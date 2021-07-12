import {GeoPosition} from 'react-native-geolocation-service';

export default interface IPlace {
  id?: string;
  location: GeoPosition;
  placeName: string;
}
