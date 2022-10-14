import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  View,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import LottieView from 'lottie-react-native';
const win = Dimensions.get('window');

const DynamicButton = props => {
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
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <View>
          {props.loading ? (
            <View
              style={[
                props.style,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <LottieView
                source={require('../assets/animations/ShakyButton.json')}
                autoPlay
                autoSize
                Loop={false}
              />

              <ActivityIndicator
                style={{position: 'absolute'}}
                animating={true}
                size={18}
                color="#fff"
              />
            </View>
          ) : (
            <View
              style={[
                props.style,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <LottieView
                source={require('../assets/animations/ShakyButton.json')}
                autoPlay
                autoSize
                Loop={false}
              />

              <Text
                style={{
                  position: 'absolute',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'honc-SemiBold',
                }}>
                {props.children}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DynamicButton;

const styles = StyleSheet.create({});
