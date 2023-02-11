import {StyleSheet, SafeAreaView, ActivityIndicator, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Colors from '../../constants/Colors';
import NetInfo from '@react-native-community/netinfo';

const TermsScreen = () => {
  const [connectedToTheInternet, setconnectedToTheInternet] = useState(false);

  // const networkConnectionChecker = async () => {
  //   setconnectedToTheInternet(false);
  //   try {
  //     const response = await NetInfo.fetch();
  //     if (response?.isConnected) {
  //       setconnectedToTheInternet(true);
  //     } else {
  //       setconnectedToTheInternet(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setconnectedToTheInternet(false);
  //   }
  // };

  useEffect(() => {
    // networkConnectionChecker();
    NetInfo?.fetch().then(res => {
      if (res?.isConnected) {
        setconnectedToTheInternet(true);
      } else {
        setconnectedToTheInternet(false);
      }
    });
  }, [connectedToTheInternet]);

  return (
    <SafeAreaView style={styles?.mainContainer}>
      <FocusAwareStatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {connectedToTheInternet ? (
        <WebView
          source={{uri: 'https://ranavikrantsingh.github.io'}}
          style={{flex: 1}}
        />
      ) : (
        <View style={styles?.preloader}>
          <ActivityIndicator color={Colors.teal} size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
