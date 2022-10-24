import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import AddToCart from './components/AddToCart';
import Icon from 'react-native-vector-icons/AntDesign';
import SliderScreen from '../tools/SliderScreen';
const isAndroid = Platform.OS === 'android';

export default function ProductPage(props) {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <View style={styles.mainContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('DrawerNavigator')}>
        <View style={styles.backBtn}>
          <Icon name="arrowleft" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <SliderScreen />
      <View style={styles.mainContent}>
        <View style={styles.titleSection}>
          <Text style={[styles.heading]}>
            Levi's Men's Washed Cotton Hooded Military Jacket
          </Text>
        </View>

        <Text style={[styles.heading, styles.price]}>$ 30</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Icon style={styles.review} name="star" size={13} color="#FDCC0D" />
          <Text style={{color: '#fff'}}>(30 Reviews)</Text>
        </View>

        <Text style={styles.description}>
          Jacket with a slightly padded interior. Lapel collar and long sleeves
          with elasticated cuffs. Welt pockets at the hip and inside pocket
          detail.
        </Text>
      </View>
      <AddToCart />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainContent: {flex: 1, padding: 25, marginTop: isAndroid ? 0 : '5%'},
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 350,
    //   backgroundColor: 'red',
  },
  productImage: {
    width: '80%',
    height: '100%',
    resizeMode: 'cover',
  },
  heading: {
    // marginTop: 30,
    // marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  review: {
    marginRight: 5,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
  },
  description: {
    marginTop: isAndroid ? 5 : 10,
    lineHeight: 20,
    color: '#fff',
  },
  price: {color: 'green', marginBottom: isAndroid ? 0 : 5},
  backBtn: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    left: 15,
    top: isAndroid ? 25 : '8%',
  },
});
