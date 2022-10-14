import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/login/LoginScreen';
import OtpScreen from '../screens/login/OtpScreen';
import TermsScreen from '../screens/login/TermsScreen';
import CreateAccount from '../screens/login/CreateAccount';
import OnBoardingScreen from '../screens/login/OnBoardingScreen';
import all_styles from '../styles/all_styles';
const Stack = createNativeStackNavigator();
const defaultScreenOptions = {
  headerShadowVisible: false,
  headerTitleStyle: [all_styles.span_18_m],
  headerTitleAlign: 'center',
};
const HiddenScreenOptions = {
  headerShown: false,
};
export default function Routes(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={'Login'}>
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={HiddenScreenOptions}
        />
        <Stack.Screen
          name="TermsScreen"
          component={TermsScreen}
          options={{title: 'Terms and Conditions'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
