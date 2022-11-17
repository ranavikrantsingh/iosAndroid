import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import all_styles from '../styles/all_styles';
import TabNavigator from './TabNavigator';
import TabNavigator_1 from './TabNavigator_1';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AnimatedBottomTab from './AnimatedBottomTab';
import AnimatedBottomTab_1 from './AnimatedBottomTab_1';
import AnimatedBottomTab_2 from './AnimatedBottomTab_2';
import OrdersScreen from '../screens/orders/OrdersScreen';
import AnimatedOnboarding from '../screens/onboardingscreen/AnimatedOnboarding';
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
        initialRouteName={AnimatedBottomTab_1}>
        <Stack.Screen
          name="TabNavigator"
          component={AnimatedBottomTab_2}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="AnimatedOnBoarding"
          component={AnimatedOnboarding}
          options={HiddenScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
