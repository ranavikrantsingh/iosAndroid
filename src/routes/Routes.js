import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import all_styles from '../styles/all_styles';
import HomeScreen from '../screens/home/HomeScreen';
import TabNavigator from './TabNavigator';
import {Image, View} from 'react-native';
const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
  // headerShown: true,
  headerShadowVisible: false,
  headerTitleStyle: [all_styles.span_20_m],
  headerTitleAlign: 'center',
};
const HiddenScreenOptions = {
  headerShown: false,
};
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={TabNavigator}>
        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={HiddenScreenOptions}
        /> */}
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={HiddenScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
