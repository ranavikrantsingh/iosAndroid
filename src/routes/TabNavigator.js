import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale} from '../utils/scaling';
import OrdersScreen from '../screens/orders/OrdersScreen';
import LottieView from 'lottie-react-native';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import {Platform, StatusBar} from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import WalletIcon from 'react-native-vector-icons/FontAwesome5';
const TabNavigator = props => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopWidth: 0,

            height: Platform.OS === 'ios' ? scale(80) : scale(60),
          },
          tabBarLabelStyle: {
            fontFamily: 'honc-Bold',
            fontSize: 13,
            bottom: Platform.OS === 'ios' ? scale(-2) : scale(5),
          },
          headerShown: false,
          tabBarActiveTintColor: '#f2f2f2',
          tabBarInactiveTintColor: '#6d6d6d',
        }}
        backBehavior="none"
        initialRouteName="DrawerNavigator">
        <Tab.Screen
          name="OrdersScreen"
          component={OrdersScreen}
          options={{
            title: 'Orders',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <LottieView
                  source={require('../assets/animations/CartActive.json')}
                  style={{height: scale(40), width: scale(35)}}
                  autoPlay
                  loop
                />
              ) : (
                <Icon name="opencart" size={20} color="#fff" />
              ),
          }}
        />
        <Tab.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{
            title: 'Home',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <LottieView
                  source={require('../assets/animations/Home.json')}
                  style={{height: scale(30), width: scale(35)}}
                  autoPlay
                  loop={false}
                />
              ) : (
                <Icon name="home" size={20} color="#fff" />
              ),
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            title: 'Chat',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <LottieView
                  source={require('../assets/animations/Chat.json')}
                  style={{height: scale(40), width: scale(35)}}
                  autoPlay
                  loop={false}
                />
              ) : (
                <Icon name="wechat" size={20} color="#fff" />
              ),
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            title: 'Wallet',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <LottieView
                  source={require('../assets/animations/Wallet.json')}
                  style={{height: scale(40), width: scale(35)}}
                  autoPlay
                  loop
                />
              ) : (
                <WalletIcon name="wallet" size={20} color="#fff" />
              ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
