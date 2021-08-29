import {GeoPosition} from 'react-native-geolocation-service';

export default interface IPlace {
  userId?: string;
  id?: string;
  location: GeoPosition;
  placeName: string;
  tags: string[];
}
