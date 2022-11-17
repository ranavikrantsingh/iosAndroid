import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/orders/OrdersScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import DrawerNavigator from './DrawerNavigator';
const Tab = createMaterialBottomTabNavigator();

const TabArr = [
  {
    route: 'OrdersScreen',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: OrdersScreen,
    tabBarColor: Colors.primary,
  },
  {
    route: 'AnalyticsScreen',
    label: 'Search',
    type: Icons.Feather,
    icon: 'search',
    component: AnalyticsScreen,
    tabBarColor: Colors.green,
  },
  {
    route: 'DrawerNavigator',
    label: 'Add',
    type: Icons.Feather,
    icon: 'plus-square',
    component: DrawerNavigator,
    tabBarColor: Colors.red,
  },
  {
    route: 'WalletScreen',
    label: 'Like',
    type: Icons.Feather,
    icon: 'heart',
    component: WalletScreen,
    tabBarColor: Colors.yellow,
  }
];

export default function Tab4() {
  return (
    <Tab.Navigator>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.route}
            component={_.component}
            options={{
              tabBarColor: _.tabBarColor,
              tabBarIcon: ({color, size}) => (
                <Icon name={_.icon} type={_.type} size={size} color={color} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
