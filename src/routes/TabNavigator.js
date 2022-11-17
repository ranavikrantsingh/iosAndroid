// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {scale} from '../utils/scaling';
// import OrdersScreen from '../screens/orders/OrdersScreen';
// import LottieView from 'lottie-react-native';
// import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
// import WalletScreen from '../screens/wallet/WalletScreen';
// import {Platform, StatusBar} from 'react-native';
// import DrawerNavigator from './DrawerNavigator';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import WalletIcon from 'react-native-vector-icons/FontAwesome5';
// const TabNavigator = props => {
//   const Tab = createBottomTabNavigator();

//   return (
//     <>
//       <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
//       <Tab.Navigator
//         screenOptions={{
//           tabBarStyle: {
//             backgroundColor: '#000',
//             borderTopWidth: 0,
//             // position: 'absolute',
//             // borderRadius: scale(200),
//             // left: 20,
//             // right: 20,
//             height: Platform.OS === 'ios' ? scale(80) : scale(60),
//             // bottom: 8,
//           },
//           tabBarLabelStyle: {
//             fontFamily: 'honc-Bold',
//             fontSize: 13,
//             bottom: Platform.OS === 'ios' ? scale(-2):scale(5),
//           },
//           headerShown: false,
//           tabBarActiveTintColor: '#f2f2f2',
//           tabBarInactiveTintColor: '#6d6d6d',
//         }}
//         backBehavior="none"
//         initialRouteName="DrawerNavigator">
//         <Tab.Screen
//           name="OrdersScreen"
//           component={OrdersScreen}
//           options={{
//             title: 'Orders',
//             tabBarIcon: ({color, focused}) =>
//               focused ? (
//                 <LottieView
//                   source={require('../assets/animations/CartActive.json')}
//                   style={{height: scale(40), width: scale(35)}}
//                   autoPlay
//                   loop
//                 />
//               ) : (
//                 <Icon name="opencart" size={20} color="#fff" />
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="DrawerNavigator"
//           component={DrawerNavigator}
//           options={{
//             title: 'Home',
//             tabBarIcon: ({color, focused}) =>
//               focused ? (
//                 <LottieView
//                   source={require('../assets/animations/Home.json')}
//                   style={{height: scale(30), width: scale(35)}}
//                   autoPlay
//                   loop={false}
//                 />
//               ) : (
//                 <Icon name="home" size={20} color="#fff" />
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="Analytics"
//           component={AnalyticsScreen}
//           options={{
//             title: 'Chat',
//             tabBarIcon: ({color, focused}) =>
//               focused ? (
//                 <LottieView
//                   source={require('../assets/animations/Chat.json')}
//                   style={{height: scale(40), width: scale(35)}}
//                   autoPlay
//                   loop={false}
//                 />
//               ) : (
//                 <Icon name="wechat" size={20} color="#fff" />
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="Wallet"
//           component={WalletScreen}
//           options={{
//             title: 'Wallet',
//             tabBarIcon: ({color, focused}) =>
//               focused ? (
//                 <LottieView
//                   source={require('../assets/animations/Wallet.json')}
//                   style={{height: scale(40), width: scale(35)}}
//                   autoPlay
//                   loop
//                 />
//               ) : (
//                 <WalletIcon name="wallet" size={20} color="#fff" />
//               ),
//           }}
//         />
//       </Tab.Navigator>
//     </>
//   );
// };

// export default TabNavigator;
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React, { useEffect, useRef } from 'react'
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import Icon, { Icons } from '../components/Icons';
// import Colors from '../constants/Colors';
// import ColorScreen from '../screens/home/HomeScreen';
// import * as Animatable from 'react-native-animatable';
// import {scale} from '../utils/scaling';
// import OrdersScreen from '../screens/orders/OrdersScreen';
// import LottieView from 'lottie-react-native';
// import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
// import WalletScreen from '../screens/wallet/WalletScreen';
// import {Platform, StatusBar} from 'react-native';
// import DrawerNavigator from './DrawerNavigator';
// import WalletIcon from 'react-native-vector-icons/FontAwesome5';


// const Tab = createBottomTabNavigator();
// const TabArr = [
//   { route: 'OrdersScreen', label: 'Home', type: Icons.Feather, icon: 'home', component: OrdersScreen },
//   { route: 'AnalyticsScreen', label: 'Search', type: Icons.Feather, icon: 'search', component: AnalyticsScreen },
//   { route: 'WalletScreen', label: 'Add', type: Icons.Feather, icon: 'plus-square', component: WalletScreen },
  
// ];
// const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
// const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

// const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
// const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

// const TabButton = (props) => {
//   const { item, onPress, accessibilityState } = props;
//   const focused = accessibilityState.selected;
//   const viewRef = useRef(null);
//   const circleRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     if (focused) {
//       viewRef.current.animate(animate1);
//       circleRef.current.animate(circle1);
//       textRef.current.transitionTo({ scale: 1 });
//     } else {
//       viewRef.current.animate(animate2);
//       circleRef.current.animate(circle2);
//       textRef.current.transitionTo({ scale: 0 });
//     }
//   }, [focused])

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={1}
//       style={styles.container}>
//       <Animatable.View
//         ref={viewRef}
//         duration={1000}
//         style={styles.container}>
//         <View style={styles.btn}>
//           <Animatable.View
//             ref={circleRef}
//             style={styles.circle} />
//           <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.primary} />
//         </View>
//         <Animatable.Text
//           ref={textRef}
//           style={styles.text}>
//           {item.label}
//         </Animatable.Text>
//       </Animatable.View>
//     </TouchableOpacity>
//   )
// }

// export default function AnimTab1() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBar,
//       }}
//     >
//       {TabArr.map((item, index) => {
//         return (
//           <Tab.Screen key={index} name={item.route} component={item.component}
//             options={{
//               tabBarShowLabel: false,
//               tabBarButton: (props) => <TabButton {...props} item={item} />
//             }}
//           />
//         )
//       })}
//     </Tab.Navigator>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabBar: {
//     height: 70,
//     position: 'absolute',
//     bottom: 16,
//     right: 16,
//     left: 16,
//     borderRadius: 16,
//   },
//   btn: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 4,
//     borderColor: Colors.white,
//     backgroundColor: Colors.white,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   circle: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.primary,
//     borderRadius: 25,
//   },
//   text: {
//     fontSize: 10,
//     textAlign: 'center',
//     color: Colors.primary,
//   }
// })
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';
import OrdersScreen from '../screens/orders/OrdersScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import DrawerNavigator from './DrawerNavigator';


const TabArr = [
  { route: 'OrdersScreen', label: 'Home', type: Icons.Feather, icon: 'home', component: OrdersScreen },
  { route: 'AnalyticsScreen', label: 'Search', type: Icons.Feather, icon: 'search', component: AnalyticsScreen },
  { route: 'WalletScreen', label: 'Add', type: Icons.Feather, icon: 'plus-square', component: WalletScreen },
  { route: 'DrawerNavigator', label: 'Like', type: Icons.Feather, icon: 'heart', component: DrawerNavigator },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.secondary : Colors.primary} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primary,
  }
})