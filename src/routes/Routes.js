import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import all_styles from '../styles/all_styles';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
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
        initialRouteName={DrawerNavigator}>
        <Stack.Screen
          name="HomeScreen"
          component={DrawerNavigator}
          options={HiddenScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
