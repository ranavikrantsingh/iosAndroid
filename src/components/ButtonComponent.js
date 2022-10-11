import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
import {scale} from '../utils/scaling';

const ButtonComponent = props => {
  const animation = useRef(new Animated.Value(0)).current;
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    setTimeout(() => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, 200);
  };
  return (
    <Animated.View style={[{transform: [{scale}]}]}>
      <TouchableNativeFeedback
        {...props}
        disabled={props.disabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <View
          style={{
            ...styles.button,
            ...props.buttonStyle,
          }}>
          <Text
            style={{
              ...styles.buttonText,
              ...props.textStyle,
            }}>
            {props.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </Animated.View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 16.5,
    backgroundColor: Colors.accent,
    marginHorizontal: 18,

    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: scale(14),
    fontFamily: 'honc-Bold',
  },
});
