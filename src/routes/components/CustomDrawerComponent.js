import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale} from '../../utils/scaling';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';
import {logout, switchMode} from '../../redux/actions';
import DarkModeSwitch from '../../components/DarkModeSwitch';
import {useDispatch, useSelector} from 'react-redux';
import all_styles from '../../styles/all_styles';
const CustomDrawerComponent = props => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  const handleThemeChange = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };

  // Update the app Incase the theme mode changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
console.log('====================================');
console.log(user[2].assets[0].uri);
console.log('====================================');
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}>
        <View>
          <ImageBackground
            blurRadius={5}
            source={{
              uri: 'https://i.picsum.photos/id/180/2400/1600.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8',
            }}
            style={styles.bg}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={{uri: user[2]?.image || user[2]?.assets[0]?.uri}}
                style={styles.profileImage}
              />
              <View style={{marginLeft: scale(1), flex: 1}}>
                <Text style={styles.label} numberOfLines={1}>
                  {user[0]}
                </Text>
                <Text style={styles.label} numberOfLines={1}>
                  {user[1]}
                </Text>
              </View>
              <View>
                <DarkModeSwitch onPress={() => handleThemeChange()} />
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* <DrawerItemList {...props} /> */}
        <View style={{marginTop: scale(10)}}>
          <DrawerItem
            label="My Profile"
            activeTintColor={Colors.accent}
            activeBackgroundColor="white"
            labelStyle={[all_styles.span_16_m, {color: '#fff'}]}
            inactiveTintColor="white"
            inactiveBackgroundColor="#000"
            style={{backgroundColor: 'transparent', marginTop: '0%'}}
            onPress={() => props.navigation.navigate('Profile')}
          />
          <DrawerItem
            label="My Orders"
            activeTintColor={Colors.accent}
            activeBackgroundColor="white"
            labelStyle={[all_styles.span_16_m, {color: '#fff'}]}
            inactiveTintColor="white"
            inactiveBackgroundColor="transparent"
            style={{backgroundColor: 'transparent', marginTop: '0%'}}
            onPress={() => props.navigation.navigate('Orders')}
          />
          {/* <DrawerItem
            label={mode == 'dark' ?"Enable light Mode" :"Enable Dark Mode"}
            activeTintColor={Colors.accent}
            activeBackgroundColor="white"
            labelStyle={[all_styles.span_16_m, {color: '#fff'}]}
            inactiveTintColor="white"
            inactiveBackgroundColor="transparent"
            style={{backgroundColor: 'transparent', marginTop: '0%'}}
            onPress={() => handleThemeChange()}
          /> */}
        </View>
      </DrawerContentScrollView>
      <View>
        <DrawerItem
          label="Logout"
          activeTintColor={Colors.accent}
          activeBackgroundColor="white"
          inactiveTintColor="white"
          labelStyle={[all_styles.span_16_m, {color: '#fff'}]}
          inactiveBackgroundColor="transparent"
          onPress={() =>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    dispatch(logout());
                  },
                },
              ],
              {cancelable: false},
            )
          }
        />
      </View>
    </View>
  );
};

export default CustomDrawerComponent;

const styles = StyleSheet.create({
  profileImage: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(5),
    marginLeft: scale(10),
    marginTop: scale(10),
    marginBottom: scale(10),
    borderColor: '#fFF',
    borderWidth: scale(1),
    borderRadius: scale(100),
    // transform: [{rotate: '90deg'}],
  },
  bg: {
    height: scale(95),
    resizeMode: 'cover',
    top: scale(-5),
  },
  label: {
    fontFamily: 'honc-Medium',
    fontSize: scale(16),
    color: '#fff',
  },
});
