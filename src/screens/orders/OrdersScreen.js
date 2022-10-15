import {StyleSheet, Text, SafeAreaView,StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { scale } from '../../utils/scaling';
import { useIsFocused } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import all_styles from '../../styles/all_styles';
const OrdersScreen = () => {
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
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
    <SafeAreaView
      style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
      <FocusAwareStatusBar
        backgroundColor={mode == 'dark' ? '#121212' : '#fff'}
        barStyle={mode == 'dark' ? 'light-content' : 'dark-content'}
      />
      </SafeAreaView>
  );
};

export default OrdersScreen;

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
    fontSize: scale(20),
    fontFamily: 'honc-Bold',
    color: '#000',
    paddingVertical: scale(20),
  },
  darkmodeWelcomeText: {
    fontSize: scale(20),
    fontFamily: 'honc-Bold',
    color: '#fff',
    paddingVertical: scale(20),
  },
});
