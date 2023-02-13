import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import {toastr} from '../../utils/toast';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {setIsAuthenticated, setUserDetails} from '../../redux/actions';
import CameraPopup from './components/CameraPopup';
import Camera from '../../assets/svg/Camerablue.svg';
import DynamicButton from '../../components/DynamicButton';
import config from './config.json';
import { useHeaderHeight } from '@react-navigation/elements'
import callApi from '../../utils/apiCaller';
import axios from 'axios';
const CreateAccount = props => {
  const dispatch = useDispatch();
const headerHeight = useHeaderHeight()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setprofileImage] = useState(null);
  const [showImagePopup, setshowImagePopup] = useState(false);
  const [hasNameErrors, setHasNameErrors] = useState(false);
  const [hasEmailErrors, sethasEmailErrors] = useState(false);
  const [responsefromTheImageObject, setresponsefromTheImageObject] = useState('')
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
  //give me a code for googlevision api caller using axios

  const pushImageToTheGoogleVisionApi = image => {
    let data={
      task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1",
      group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
      data:{
        document1:image,
        consent:'yes'
      }
    }
   callApi(`ind_aadhaar`,'post',data).then(res=>{
    if (res) {
      console.log('res', res)
      setresponsefromTheImageObject(res?.result?.extraction_output)
    }
   }).catch(err=>{
    console.log('err', err)
   })
  };

  //   async function pushImageToTheGoogleVisionApi(base64) {

  //     return await
  //         fetch(config.googleCloud.api + config.googleCloud.apiKey, {
  //             method: 'POST',
  //             body: JSON.stringify({
  //                 "requests": [
  //                     {
  //                         "image": {
  //                             "content": base64
  //                         },
  //                         "features": [
  //                             {
  //                                 "type": "LABEL_DETECTION"
  //                             }
  //                         ]
  //                     }
  //                 ]
  //             })
  //         }).then((response) => {
  //           console.log('GoogleVision',response)
  //             // return response.json();
  //         }, (err) => {
  //             console.error('promise rejected')
  //             console.error(err)
  //         });
  // }
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
      dispatch(setUserDetails([name, email, profileImage]));
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
      // maxHeight: 250,
      // maxWidth: 350,
      // includeBase64: true //
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true 
    };
    ImagePicker.launchCamera(options, response => {
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
        pushImageToTheGoogleVisionApi(response?.assets[0]?.base64);
        setshowImagePopup(false);
      }
    });
  };

  const handleGalleryUpload = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true //add this in the option to include base64 value in the response
    };
    ImagePicker.launchImageLibrary(options, response => {
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
        pushImageToTheGoogleVisionApi(response?.assets[0]?.base64);
        setshowImagePopup(false);
      }
    });
  };

  return (
    <SafeAreaView
      style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: 500,
        })}

        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
          <View>
            <StatusBar
              backgroundColor={Colors.teal}
              barStyle={'light-content'}
            />
            <View style={styles.halfScreen}>
              <TouchableOpacity onPress={() => setshowImagePopup(true)}>
                <View style={styles.round}>
                  {profileImage ? (
                    <Image
                      source={{
                        uri:
                          profileImage?.image || profileImage?.assets[0]?.uri,
                      }}
                      style={styles.profilePicture}
                    />
                  ) : (
                    <Camera height={100} width={50} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.insideContainer}>
              <Text
                style={
                  mode == 'dark' ? styles.darkModebelowText : styles.belowText
                }>
                Please enter your details.
              </Text>
              <TextInput
                mode="flat"
                label="Name"
                value={name||responsefromTheImageObject?.name_on_card}
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
                    placeholder:mode == 'dark' ? Colors.teal : Colors.background,
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
                  mode == 'dark'
                    ? styles.darkModeTextInput
                    : styles.textInputStyle
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
                    placeholder:
                      mode == 'dark' ? Colors.teal : Colors.background,
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
                  mode == 'dark'
                    ? styles.darkModeTextInput
                    : styles.textInputStyle
                }
              />

              <DynamicButton onPress={() => handleCreateAccount()}>
                Save
              </DynamicButton>
              {showImagePopup ? (
                <CameraPopup
                  ActivePopUp={0}
                  camera={() => requestPermission()}
                  gallery={() => handleGalleryUpload()}
                  avatar={avatar_url => handleAvatarUpload(avatar_url)}
                  modalVisible={showImagePopup}
                  setModalVisible={() => setshowImagePopup(false)}
                />
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    // flex: 1,
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
    alignItems: 'center',
  },
  round: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderRadius: scale(100),
    height: scale(140),
    width: scale(140),
    marginVertical:'5%',
    justifyContent: 'center',
  },
  profilePicture: {
    height: scale(140),
    width: scale(140),
    borderRadius: scale(100),
  },
});
