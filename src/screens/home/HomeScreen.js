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

      <Header
        noArrow={false}
        text={moment().format('MMM DD, YYYY')}
        onBellPress={() => props.navigation.navigate('Notifications')}
        onPress={() => props.navigation.toggleDrawer()}
      />
      <ScrollView>
        <View style={styles.insideContainer}>
          <Text
            style={
              mode == 'dark' ? styles.darkmodeWelcomeText : styles.welcomeText
            }
            numberOfLines={1}>
            Welcome, {user}!
          </Text>
          <PremiumBlock title={user} subTitle={user} />
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
