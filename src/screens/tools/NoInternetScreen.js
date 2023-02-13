import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {scale} from '../../utils/scaling';

const NoInternetScreen = () => {
  return (
    <SafeAreaView styles={styles?.mainContainer}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={styles?.centeredView}>
        <LottieView
          source={require('../../assets/animations/No-InternetConnection.json')}
          loop
          autoPlay
          style={styles?.lottie}
        />
        <Text style={styles?.boldText16}>No Internet Connection</Text>
      </View>
    </SafeAreaView>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  lottie: {
    width: scale(200),
  },
  boldText16: {
    fontFamily: 'honc-Bold',
    fontSize: scale(16),
    color: '#000',
  },
});
