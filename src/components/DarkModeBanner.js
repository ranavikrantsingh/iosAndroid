import {StyleSheet, Animated, View, Image, Text} from 'react-native';
import React, {useState, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {scale} from '../utils/scaling';
import DarkModeSwitch from './DarkModeSwitch';
const CheckBoxSquare = props => {
  const progress = useRef(new Animated.Value(0)).current;
  const [animate, setAnimate] = useState(false);
  const handleAnimation = () => {
    const animatedValue = animate ? 0 : 0.5;
    Animated.timing(progress, {
      toValue: animatedValue,
      duration: 1400,
      useNativeDriver: true,
    }).start();
    setAnimate(!animate);
  };
  return (
    <>
      <View>
        <LottieView
          source={require('../assets/animations/DayNight.json')}
          progress={progress}
          style={styles.banner}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: '5%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image source={props.image} style={styles.profileImage} />
          <View style={{marginLeft: scale(1), flex: 1}}>
            <Text
              style={animate ? styles.label : styles.darklabel}
              numberOfLines={1}>
              {props.name}
            </Text>
            <Text
              style={animate ? styles.label : styles.darklabel}
              numberOfLines={1}>
              {props.subTitle}
            </Text>
          </View>
          <View>
            <DarkModeSwitch
              onPress={() => {
                handleAnimation();
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default CheckBoxSquare;

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    marginTop: scale(-5),
  },
  profileImage: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(5),
    marginLeft: scale(10),
    marginTop: scale(10),
    marginBottom: scale(10),
    borderColor: '#fFF',
    borderWidth: scale(1),
    borderRadius: scale(100),
    // transform: [{rotate: '90deg'}],
  },
  bg: {
    height: scale(95),
    resizeMode: 'cover',
    top: scale(-5),
  },
  label: {
    fontFamily: 'honc-Medium',
    fontSize: scale(16),
    color: '#fff',
  },
  darklabel: {
    fontFamily: 'honc-Medium',
    fontSize: scale(16),
    color: '#000',
  },
});
