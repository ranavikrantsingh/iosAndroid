import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';
import Colors from '../constants/Colors';
import all_styles from '../styles/all_styles';
import CustomDrawerComponent from './components/CustomDrawerComponent';
import {Dimensions} from 'react-native';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const HiddenScreenOptions = {
    headerShown: false,
  };
 
  return (
    <>
     
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerComponent {...props} />}
        screenOptions={{
          headerTitleStyle: [all_styles.span_18],
          headerShadowVisible: false,
          headerShown: false,
          drawerLabelStyle: {
            fontFamily: 'honc-Medium',
          },
          drawerStyle: {
            backgroundColor: '#2A2E39',
            shadowOpacity: 0,
            opacity: 0.9,
          },
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: Colors.accent,
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={HiddenScreenOptions}
        />
      </Drawer.Navigator>
    </>
  );
}
