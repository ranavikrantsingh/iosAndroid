import {StyleSheet, Animated, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef,useEffect} from 'react';
import LottieView from 'lottie-react-native';
import { useSelector,useDispatch } from 'react-redux';
import { switchMode } from '../redux/actions';
const CheckBoxSquare = props => {
  const dispatch = useDispatch()
  const progress = useRef(new Animated.Value(0)).current;
  const [animate, setAnimate] = useState(false);
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  const handleThemeChange = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };
  const handleAnimation = () => {
    const animatedValue = animate ? 0 : 1;
    Animated.timing(progress, {
      toValue: animatedValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setAnimate(!animate);
    handleThemeChange()
  };
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <TouchableOpacity
      onPressIn={() => {
        handleAnimation()
      }}
      onPress={props.onPress}>
      <View>
        <LottieView
          source={require('../assets/animations/DarkMode.json')}
          progress={progress}
          autoSize
        />
      </View>
    </TouchableOpacity>
  );
};

export default CheckBoxSquare;

const styles = StyleSheet.create({});
