import {PermissionsAndroid} from 'react-native';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera Permission Granted.');
    } else {
      console.log('Camera Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestExternalWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Write Permission',
        message: 'App needs write permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Write External Storage Permission Granted.');
    }
  } catch (error) {
    console.log('Write External Storage Permission Not Granted');
  }
};

export const requestExternalReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'External Storage Read Permission',
        message: 'App needs read permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Read External Storage Permission Granted.');
    }
  } catch (error) {
    console.log('Read External Storage Permission Not Granted');
  }
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs location permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location Permission Granted.');
    } else {
      console.log('Location Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestCallPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'Call Permission',
        message: 'App needs call permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Call Permission Granted.');
    } else {
      console.log('Call Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestReadContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'App needs contacts permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Contacts Permission Granted.');
    } else {
      console.log('Contacts Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestWriteContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'App needs contacts permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Contacts Permission Granted.');
    } else {
      console.log('Contacts Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestReadSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'SMS Permission',
        message: 'App needs sms permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('SMS Permission Granted.');
    } else {
      console.log('SMS Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestWriteSmsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_SMS,
      {
        title: 'SMS Permission',
        message: 'App needs sms permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('SMS Permission Granted.');
    } else {
      console.log('SMS Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestReadCallLogPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Permission',
        message: 'App needs call log permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Call Log Permission Granted.');
    } else {
      console.log('Call Log Permission Not Granted');
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestWriteCallLogPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
      {
        title: 'Call Log Permission',
        message: 'App needs call log permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Call Log Permission Granted.');
    } else {
      console.log('Call Log Permission Not Granted');
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestReadCalendarPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      {
        title: 'Calendar Permission',
        message: 'App needs calendar permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Calendar Permission Granted.');
    } else {
      console.log('Calendar Permission Not Granted');
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestWriteCalendarPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      {
        title: 'Calendar Permission',
        message: 'App needs calendar permission',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Calendar Permission Granted.');
    } else {
      console.log('Calendar Permission Not Granted');
    }
  } catch (error) {
    console.log(error);
  }
};
