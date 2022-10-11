import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import all_styles from '../styles/all_styles';
import LoginScreen from '../screens/login/LoginScreen'

import {Image, View} from 'react-native';
const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
  // headerShown: true,
  headerShadowVisible: false,
//   headerTitleStyle: [all_styles.span_20_m],
  headerTitleAlign: 'center',
};
const HiddenScreenOptions = {
  headerShown: false,
};
export default function Routes() {
  return (
    <NavigationContainer
      fallback={
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        </View>
      }>
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={LoginScreen}>
       
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={HiddenScreenOptions}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}