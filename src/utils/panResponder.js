import {PanResponder} from 'react-native';

export const panResponder = {
  create: (onMove, onRelease) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        onMove(gestureState);
      },
      onPanResponderRelease: (event, gestureState) => {
        onRelease(gestureState);
      },
    });
  },
};

// Path: src/utils/panResponder.js
