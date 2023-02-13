import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Routes from './Routes';
import LoginRoutes from './LoginRoutes';
import NetInfo from '@react-native-community/netinfo';
import Colors from '../constants/Colors';
import Preloader from '../components/Preloader';
const Root = props => {
  const [connectedToTheInternet, setconnectedToTheInternet] = useState(false);

  useEffect(() => {
    NetInfo?.fetch().then(res => {
      if (res?.isConnected) {
        setconnectedToTheInternet(true);
      } else {
        setconnectedToTheInternet(false);
      }
    });
  }, [connectedToTheInternet]);

  if (connectedToTheInternet) {
    if (props?.isAuthenticated) {
      return <Routes />;
    } else {
      return <LoginRoutes />;
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
