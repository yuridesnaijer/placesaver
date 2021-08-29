import {GeoPosition} from 'react-native-geolocation-service';
import {Asset} from 'react-native-image-picker';

export default interface IPlace {
  userId?: string;
  id?: string;
  location: GeoPosition;
  placeName: string;
  tags: string[];
  imageData?: Asset;
}
