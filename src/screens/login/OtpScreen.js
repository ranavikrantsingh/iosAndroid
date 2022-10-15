import {StyleSheet, View, Text, SafeAreaView,StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import DynamicButton from '../../components/DynamicButton';
import {connect, useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {scale} from '../../utils/scaling';
import {useIsFocused} from '@react-navigation/native';

const OtpScreen = props => {
  const dispatch = useDispatch();
  var contact = useSelector(state => state.appReducer.mobileNumber);

  var replaced = contact.replace(/^(.{2}).*(.{3}).*(.{4})$/, `$1****$3`);
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  // Update the app Incase the theme mode changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  const handleOnLogin = () => {
    props.navigation.navigate('CreateAccount');
  };
  return (
    <SafeAreaView
      style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
         <FocusAwareStatusBar
        backgroundColor={mode == 'dark' ? '#121212' : '#fff'}
        barStyle={mode == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.insideContainer}>
        <Text
          style={
            mode == 'dark' ? styles.darkmodeWelcomeText : styles.welcomeText
          }>
          Welcome
        </Text>
        <Text
          style={mode == 'dark' ? styles.darkModebelowText : styles.belowText}>
          Please enter the otp sent to {replaced}
        </Text>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <DynamicButton onPress={() => handleOnLogin()}>Login</DynamicButton>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

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
    marginTop: '20%',
    flex: 1,
  },
  welcomeText: {
    fontSize: scale(30),
    fontFamily: 'honc-Bold',
    color: '#000',
    paddingVertical: scale(20),
  },
  darkmodeWelcomeText: {
    fontSize: scale(30),
    fontFamily: 'honc-Bold',
    color: '#fff',
    paddingVertical: scale(20),
  },
  darkModebelowText: {
    fontSize: scale(16),
    fontFamily: 'honc-Medium',
    color: '#fff',
    paddingBottom: scale(13),
  },
  belowText: {
    fontSize: scale(16),
    fontFamily: 'honc-Medium',
    color: '#000',
    paddingBottom: scale(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darktermsText: {
    fontFamily: 'honc-Medium',
    fontSize: 14,
    color: '#fff',
  },
  termsText: {
    fontFamily: 'honc-Medium',
    fontSize: 14,
    color: '#000',
  },
  darkModeTextInput: {
    height: scale(50),
    marginTop: scale(-5),
    backgroundColor: 'transparent',
  },

  textInputStyle: {
    height: scale(50),
    marginTop: scale(-5),
    backgroundColor: Colors.secondary,
  },
});
