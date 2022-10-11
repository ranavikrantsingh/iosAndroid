import React, {Component, useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {Alert, BackHandler, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import _ from 'lodash';
import Routes from './Routes';
import LoginRoutes from './LoginRoutes';
import DeviceInfo from 'react-native-device-info';
import { setDeviceId } from '../redux/actions';
// export let API_URL = 'https://api.honc.io';
// import AsyncStorage from '@react-native-async-storage/async-storage';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: {},
      isFetchingApiUrl: false,
    };
    //OneSignal Init Code
    // OneSignal.setLogLevel(6, 0);
    // OneSignal.setAppId('c14f8536-c3f8-47b1-9a04-781e464aa2aa');
    //END OneSignal Init Code

    //Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log('OneSignal: notification opened:', notification);
    // });
  }

//   async componentDidMount() {
//     var uniqueId = DeviceInfo.getModel();
//     this.props.setDeviceId(uniqueId);
//   }


  componentDidUpdate(prevProps, prevState) {}

  

  render() {
 
      if (this.props.isAuthenticated) {
        return <Routes />;
      }
      else{
        return <LoginRoutes />;
      }
   
  }
}

const mapStateToProps = state => ({
  deviceId: state.partnerReducer.deviceId,
  isAuthenticated: state.partnerReducer.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  setDeviceId: deviceId => {
    dispatch(setDeviceId(deviceId));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Root);
