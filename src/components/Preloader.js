import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {scale} from '../utils/scaling';
const Preloader = () => {
  return (
    <View style={styles?.preloader}>
      <LottieView
        source={require('../assets/animations/preloader.json')}
        autoPlay
        loop
        style={styles?.lottieAnimation}
      />
    </View>
  );
};

export default Preloader;

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  lottieAnimation: {
    height: scale(50),
    width: scale(50),
  },
});
