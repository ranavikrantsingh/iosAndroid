import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {scale} from '../../utils/scaling';
import {useSelector, useDispatch} from 'react-redux';
import all_styles from '../../styles/all_styles';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../../constants/Colors';
const ProfileScreen = props => {
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  const dispatch = useDispatch();
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={Colors.teal}
        barStyle={'light-content'}
      />
      <View style={styles.tealBackground}></View>
      <View style={mode == 'dark' ? styles.darkModeBackground:styles.whiteBackground}>
        <Text style={mode == 'dark' ? styles.darkmodeWelcomeText:styles.welcomeText}>Hi {user[0]}</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  tealBackground: {
    flex: 1,
    backgroundColor: Colors.teal,
  },
  whiteBackground: {
    flex: 2,
    borderTopLeftRadius: scale(20),
    position: 'absolute',
    bottom: scale(0),
    elevation: 4,
    height: '50%',
    paddingHorizontal: scale(23),
    width: '100%',
    borderTopRightRadius: scale(20),
    backgroundColor: '#fff',
  },
  darkModeBackground:{
    flex: 2,
    borderTopLeftRadius: scale(20),
    position: 'absolute',
    bottom: scale(0),
    elevation: 4,
    height: '50%',
    paddingHorizontal: scale(23),
    width: '100%',
    borderTopRightRadius: scale(20),
    backgroundColor: Colors.darkMode,
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
