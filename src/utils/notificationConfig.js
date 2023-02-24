import { Alert, Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';

const onRegister = (token) => {
  console.log('NotificationHandler:', token);
};
const onNotification = (notification) => {
  console.log('NotificationHandler:', notification);

  if (notification.foreground) {
    return Alert.alert(
      notification.title,
      notification.message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => Linking.openURL(notification.data.url),
        },
      ],
      // { cancelable: true },
    );
  }
  return Linking.openURL(notification.data.url);
};

const onAction = (notification) => {
  console.log('Notification action received:');
  console.log(notification.action);
  console.log(notification);

  if (notification.action === 'Yes') {
    PushNotification.invokeApp(notification);
  }
};

// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
const onRegistrationError = (err) => {
  console.log(err);
};

const notificationConfig = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: onRegister,

    // (required) Called when a remote or local notification is opened or received
    onNotification: onNotification,

    // (optional) Called when Action is pressed (Android)
    onAction: onAction,

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: onRegistrationError,

    senderId: 15537333050,

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
  });
};

export default notificationConfig;
