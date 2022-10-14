import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const HiddenScreenOptions = {
        headerShown: false,
      };
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Home" component={HomeScreen} options={HiddenScreenOptions} />
    </Drawer.Navigator>
  );
}
