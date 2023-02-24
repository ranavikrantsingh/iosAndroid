import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Vet + Camera Permission',
        message: 'Vet + needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Toast.show('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};
