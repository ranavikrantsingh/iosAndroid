//Toast added by Rana
import {
    ToastAndroid as Toast,
    Platform,
    AlertIOS,
  } from 'react-native';
  import React from 'react';
  
  export const toastr = {
    showToast: message => {
      if (Platform.OS === 'android') {
        Toast.show(message, Toast.SHORT);
      } else {
        alert(message);
      }
    },
  };
  