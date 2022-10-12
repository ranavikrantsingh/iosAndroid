import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale} from '../utils/scaling';
import HomeScreen from '../screens/home/HomeScreen'
import LottieView from 'lottie-react-native'
import CreateAccount from '../screens/login/CreateAccount'
const TabNavigator = props => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          position: 'absolute',
          borderRadius: 10,
          left: 20,
          right: 20,
          height: scale(60),
          bottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'honc-Bold',
          fontSize: 14,
          bottom: scale(5),
        },
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#dada',
      }}
      backBehavior="none">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <LottieView
                source={require('../assets/animations/Home.json')}
                style={{height: scale(45), width: scale(35)}}
                autoPlay
                loop
              />
            ) : (
              <LottieView
              source={require('../assets/animations/Home.json')}
              style={{height: scale(45), width: scale(35)}}
              loop={false}
            />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CreateAccount}
        options={{
          title: 'Profile',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <LottieView
                source={require('../assets/animations/ProfileIcon.json')}
                style={{height: scale(45), width: scale(35)}}
                autoPlay
                loop
              />
            ) : (
              <LottieView
              source={require('../assets/animations/ProfileIcon.json')}
              style={{height: scale(45), width: scale(35)}}
              loop={false}
            />
            ),
        }}
      />
     
    </Tab.Navigator>
  );
};

export default TabNavigator;