import {Animated} from 'react-native';

export const animated = {
  animate: (value, toValue, duration) => {
    Animated.timing(value, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();
  },
};

// Path: src/utils/animated.js
