import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import all_styles from '../../styles/all_styles';
import {scale} from '../../utils/scaling';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import PremiumBlock from './components/PremiumBlock';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import SwipeUnlock from '../../components/SliderButton';
import MonthlyCalendarComponent from '../../components/MonthlyCalendarComponent';
// import MyHeader from '../../components/MyHeader'
const HomeScreen = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  const date = new Date();
  const currentTime = date.getHours();

  let greeting;

  if (currentTime >= 0 && currentTime <= 12) {
    greeting = 'Good Morning';
  } else if (currentTime > 12 && currentTime <= 17) {
    greeting = 'Good Afternoon';
  } else if (currentTime >= 18 && currentTime <= 20) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Good Night';
  }
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <SafeAreaView
      style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
      <FocusAwareStatusBar
        backgroundColor={mode == 'dark' ? '#121212' : '#fff'}
        barStyle={mode == 'dark' ? 'light-content' : 'dark-content'}
      />
{/* <MyHeader
        back
        onPressBack={() => props.navigation.toggleDrawer()}
        title={moment().format('MMM DD, YYYY')}
        right="more-vertical"
        onRightPress={() => props.navigation.navigate('OrdersScreen')}
      /> */}
      <Header
        noArrow={false}
        text={moment().format('MMM DD, YYYY')}
        cartPress={() => props.navigation.navigate('OrdersScreen')}
        onPress={() => props.navigation.toggleDrawer()}
      />
      <ScrollView>
        <View style={styles.insideContainer}>
          <Text
            style={
              mode == 'dark' ? styles.darkmodeWelcomeText : styles.welcomeText
            }
            numberOfLines={1}>
            {`${greeting}, ${user[0]}!`}
          </Text>
          <PremiumBlock title={user[0]} subTitle={user[1]} onPress={()=>props?.navigation?.navigate('FABScreen')} />
          <SwipeUnlock/>
          <MonthlyCalendarComponent
            service_dates={props?.service_dates}
            selectedDate={props?.selectedDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkModeContainer: {
    flex: 1,
    backgroundColor: Colors.darkMode,
  },
  insideContainer: {
    marginHorizontal: scale(23),
  },
  welcomeText: {
    fontSize: scale(25),
    fontFamily: 'honc-Bold',
    color: '#000',
    paddingVertical: scale(20),
  },
  darkmodeWelcomeText: {
    fontSize: scale(25),
    fontFamily: 'honc-Bold',
    color: '#fff',
    paddingVertical: scale(20),
  },
});
