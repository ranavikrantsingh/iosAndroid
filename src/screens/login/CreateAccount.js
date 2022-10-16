import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import {toastr} from '../../utils/toast';
import * as ImagePicker from 'react-native-image-picker'
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {setIsAuthenticated, setUserDetails} from '../../redux/actions';
import CameraPopup from './components/CameraPopup';
import Camera from '../../assets/svg/Camerablue.svg';
import DynamicButton from '../../components/DynamicButton';
const CreateAccount = props => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setprofileImage] = useState(null);
  const [showImagePopup, setshowImagePopup] = useState(false);
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

  const handleAvatarUpload = avatar_url => {
    setprofileImage(avatar_url);
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
      dispatch(setUserDetails([name, email,profileImage]));
    } else {
      toastr.showToast(validation.message);
    }
  };
 const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      this.handleImageUpload();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
          handleImageUpload();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

 const handleImageUpload = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
      
        setprofileImage(response);
      }
    });
  };

 const handleGalleryUpload = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        
        setprofileImage(response);
      }
    });
  };
  console.log(profileImage.assets[0].uri,'Rana')

  return (
    <SafeAreaView
      style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
      <StatusBar backgroundColor={Colors.teal} barStyle={'light-content'} />
      <View style={styles.halfScreen}>
        <TouchableOpacity onPress={() => setshowImagePopup(true)}>
          <View style={styles.round}>
            {profileImage ? (
              <Image 
              source={{uri:profileImage?.image || profileImage?.assets[0]?.uri}}
              style={styles.profilePicture}
              />
              
            ) : (
              <Camera height={100} width={50}/>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.insideContainer}>
        <Text
          style={mode == 'dark' ? styles.darkModebelowText : styles.belowText}>
          Please enter your details.
        </Text>
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
        {showImagePopup ? (
          <CameraPopup
            ActivePopUp={0}
            camera={()=>requestPermission()}
            gallery={()=>handleGalleryUpload()}
            avatar={avatar_url => handleAvatarUpload(avatar_url)}
            modalVisible={showImagePopup}
            setModalVisible={() => setshowImagePopup(false)}
          />
        ) : null}
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
    backgroundColor: Colors.secondary,
  },
  halfScreen: {
    backgroundColor: Colors.teal,
    flex: 0.6,
    alignItems: 'center',
  },
  round: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderRadius: scale(100),
    height:scale(140),width:scale(140),
    alignItems:'center',
    marginTop: '20%',
  },
  profilePicture:{
    height:scale(140),
    width:scale(140),
    borderRadius:scale(100)
  }
});
