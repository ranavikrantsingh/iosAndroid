import {StyleSheet, Animated, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import LottieView from 'lottie-react-native';

const CheckBoxSquare = props => {
  const progress = useRef(new Animated.Value(0)).current;
  const [animate, setAnimate] = useState(false);
  const handleAnimation = () => {
    const animatedValue = animate ? 0 : 1;
    Animated.timing(progress, {
      toValue: animatedValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setAnimate(!animate);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleAnimation(), props.onPress;
      }}>
      <View>
        <LottieView
          source={require('../assets/animations/CheckBox.json')}
          progress={progress}
          autoSize
        />
      </View>
    </TouchableOpacity>
  );
};

export default CheckBoxSquare;

const styles = StyleSheet.create({});
