import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import {toastr} from '../../utils/toast';
import all_styles from '../../styles/all_styles';
import Colors from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import DynamicButton from '../../components/DynamicButton';
import CheckBoxSquare from '../../components/CheckBoxSquare';
import {setMobileNumber, switchMode} from '../../redux/actions';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  const handleThemeChange = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };

  // Update the app Incase the theme mode changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  const [mobile, setMobile] = useState('');
  const [hasMobileErrors, setMobileErrors] = useState(false);
  const [error, seterror] = useState('');
  const handleValidationforLogin = data => {
    let validation = {
      isValid: true,
    };

    if (!data.friend_phone || data.friend_phone == '') {
      validation.isValid = false;
      setMobileErrors(true);
      return validation;
    }

    return validation;
  };

  const handleLogin = () => {
    let data = {};
    data.friend_phone = mobile;
    let validation = handleValidationforLogin(data);
    if (validation.isValid) {
      dispatch(setMobileNumber(mobile));
      toastr.showToast('Success');
      props.navigation.navigate({
        name: 'OtpScreen',
        params: {
          contact: mobile,
        },
      });
    } else {
      seterror('*this field is required');
    }
  };
  return (
    <SafeAreaView
      style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
      <StatusBar backgroundColor={'#fff'} barStyle={'#fff'} animated={true} />
      <View style={styles.insideContainer}>
        <Text
          style={
            mode == 'dark' ? styles.darkmodeWelcomeText : styles.welcomeText
          }>
          Welcome
        </Text>
        <Text
          style={mode == 'dark' ? styles.darkModebelowText : styles.belowText}>
          Please enter your mobile number to proceed
        </Text>

        <TextInput
          mode="flat"
          label="Mobile Number"
          value={mobile}
          error={hasMobileErrors}
          keyboardType={'number-pad'}
          maxLength={10}
          returnKeyType={'done'}
          onChangeText={mobile => {
            setMobile(mobile), setMobileErrors(false);
          }}
          onBlur={() => {
            if (mobile.length === 10) {
              setMobileErrors(false);
              return true;
            } else {
              setMobileErrors(true);
              seterror('Mobile Number is Required');
              return false;
            }
          }}
          onSubmitEditing={() => {
            if (mobile.length === 10) {
              setMobileErrors(false);
              return true;
            } else {
              setMobileErrors(true);
              seterror('Mobile Number is Required');
              return false;
            }
          }}
          theme={{
            colors: {
              primary: mode == 'dark' ? Colors.teal : Colors.teal,
              placeholder: mode == 'dark' ? Colors.teal : Colors.background,
              text: mode == 'dark' ? Colors.secondary : Colors.background,
              borderWidth: 1,
              fontFamily: 'honc-Medium',
            },
            fonts: {
              regular: {
                fontFamily: 'honc-Medium',
                fontWeight: 'normal',
              },
              medium: {
                fontFamily: 'honc-Medium',
                fontWeight: 'normal',
              },
            },
          }}
          style={
            mode == 'dark' ? styles.darkModeTextInput : styles.textInputStyle
          }
        />
        {hasMobileErrors ? (
          <Text
            style={[all_styles.span_12_m, {color: 'red', marginTop: scale(5)}]}>
            {error}
          </Text>
        ) : null}

        <View style={[styles.row, {paddingVertical: scale(20)}]}>
          <CheckBoxSquare />
          <Text
            style={mode == 'dark' ? styles.darktermsText : styles.termsText}>
            I Accept
          </Text>
          <Pressable onPress={() => props.navigation.navigate('TermsScreen')}>
            <Text
              style={[
                all_styles.span_14_m,
                {marginLeft: scale(2), color: Colors.teal},
              ]}>
              Terms and Conditions
            </Text>
          </Pressable>
        </View>
        <DynamicButton onPress={() => handleLogin()}>Proceed</DynamicButton>
       
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
