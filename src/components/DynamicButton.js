import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const win = Dimensions.get('window');

const DynamicButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
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
  );
};

export default DynamicButton;

const styles = StyleSheet.create({});
