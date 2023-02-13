import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Routes from './Routes';
import LoginRoutes from './LoginRoutes';
import NetInfo from '@react-native-community/netinfo';
import Preloader from '../components/Preloader';
import NoInternetScreen from '../screens/tools/NoInternetScreen';
const Root = props => {
  const [connectedToTheInternet, setconnectedToTheInternet] = useState(false);
  const [connectionStatus, setconnectionStatus] = useState('');

  useEffect(() => {
    NetInfo?.fetch().then(res => {
      if (res?.isConnected) {
        setconnectedToTheInternet(true);
        setconnectionStatus(res);
      } else {
        setconnectedToTheInternet(false);
      }
    });
  }, [connectedToTheInternet]);

  if (connectedToTheInternet) {
    if (connectionStatus?.isConnected) {
      if (props?.isAuthenticated) {
        return <Routes />;
      } else {
        return <LoginRoutes />;
      }
    } else {
      return <NoInternetScreen />;
    }
  } else {
    return (
      <SafeAreaView style={styles?.mainContainer}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <Preloader />
      </SafeAreaView>
    );
  }
};
const mapStateToProps = state => ({
  isAuthenticated: state.appReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Root);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
