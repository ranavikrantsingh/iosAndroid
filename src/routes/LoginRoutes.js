import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/login/LoginScreen';
import OtpScreen from '../screens/login/OtpScreen';
// import TermsScreen from '../screens/login/TermsScreen';
// import PrivacyScreen from '../screens/login/PrivacyScreen';
// import Notifications from '../screens/dashboard/Notifications';
// import Profile from '../screens/dashboard/Profile';
// import Myjobs from '../screens/pickajob/dailyCleaning/Myjobs';
// import LocationCheck from '../screens/pickajob/dailyCleaning/LocationCheck';
// import ChooseYourJob from '../screens/pickajob/dailyCleaning/ChooseYourJob';
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
        initialRouteName={'OnBoardingScreen'}>
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={HiddenScreenOptions}
          />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{title: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
