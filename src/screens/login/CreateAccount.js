import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import {toastr} from '../../utils/toast';
import all_styles from '../../styles/all_styles';
import {useDispatch,useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {setIsAuthenticated, setUserDetails,switchMode} from '../../redux/actions';
import LottieView from 'lottie-react-native';
import DynamicButton from '../../components/DynamicButton';
const CreateAccount = props => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasNameErrors, setHasNameErrors] = useState(false);
  const [hasEmailErrors, sethasEmailErrors] = useState(false);
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
 

  // Update the app Incase the theme mode changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  const [error, seterror] = useState('');
  const handleValidationforAccount = input => {
    let output = {};
    output.isValid = true;
    output.message = '';
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!input.name) {
      output.isValid = false;
      output.message = 'please enter name';
      setHasNameErrors(true);
      return output;
    }
    if (
      !input.email ||
      input.email == '' ||
      !re.test(input.email.toLowerCase())
    ) {
      output.isValid = false;
      sethasEmailErrors(true);
      output.message = 'please enter a valid email';
      return output;
    }
    return output;
  };

  const handleCreateAccount = () => {
    let data = {};
    data.name = name;
    data.email = email;
    let validation = handleValidationforAccount(data);
    if (validation.isValid) {
      // props.navigation.navigate({
      //   name: 'OtpScreen',
      // });
      dispatch(setIsAuthenticated(true));
      dispatch(setUserDetails(name));
    } else {
      toastr.showToast(validation.message);
    }
  };
  return (
    <SafeAreaView style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
      <StatusBar backgroundColor={Colors.teal} barStyle={'light-content'} />
      <View style={styles.halfScreen}>
        <TouchableOpacity>
          <View style={styles.round}>
            <LottieView
              source={require('../../assets/animations/Profile.json')}
              autoPlay
              autoSize
              style={{borderRadius: scale(100), marginTop: scale(-4)}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.insideContainer}>
        <Text style={mode == 'dark' ? styles.darkModebelowText : styles.belowText}>Please enter your details.</Text>
        <TextInput
          mode="flat"
          label="Name"
          value={name}
          error={hasNameErrors}
          maxLength={30}
          returnKeyType={'done'}
          onChangeText={name => {
            setName(name), setHasNameErrors(false);
          }}
          onBlur={() => {
            if (name.length < 0) {
              setHasNameErrors(false);
              return true;
            } else {
              setHasNameErrors(true);
              return false;
            }
          }}
          onSubmitEditing={() => {
            if (name.length < 0) {
              setHasNameErrors(false);
              return true;
            } else {
              setHasNameErrors(true);
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

        <TextInput
          mode="flat"
          label="Email"
          value={email}
          error={hasEmailErrors}
          returnKeyType={'done'}
          onChangeText={email => {
            email.replace(/\s/g, '');
            setEmail(email), sethasEmailErrors(false);
          }}
          onBlur={() => {
            if (email.length < 0) {
              sethasEmailErrors(false);
              return true;
            } else {
              sethasEmailErrors(true);
              return false;
            }
          }}
          onSubmitEditing={() => {
            if (email.length < 0) {
              sethasEmailErrors(false);
              return true;
            } else {
              sethasEmailErrors(true);
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

        <DynamicButton onPress={() => handleCreateAccount()}>
          Save
        </DynamicButton>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkModeContainer: {
    flex: 1,
    backgroundColor: '#121212',
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
  halfScreen: {
    backgroundColor: Colors.teal,
    flex: 0.6,
    alignItems: 'center',
  },
  round: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: scale(100),
    borderWidth: scale(3),
    marginTop: '20%',
  },
});
