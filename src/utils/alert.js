import {Alert} from 'react-native';

export const alert = {
  showAlert: (title, message) => {
    Alert.alert(title, message);
  },
};
