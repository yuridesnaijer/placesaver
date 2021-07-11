import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import PlacesList from '../placesList/PlacesList';
import MapContainer from '../../containers/MapContainer';

const MapRoute = () => <MapContainer />;

const PlacesRoute = () => <PlacesList />;

const BottomNavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'map', title: 'Map', icon: 'explore'},
    {key: 'places', title: 'Places', icon: 'explore'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    map: MapRoute,
    places: PlacesRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavBar;
