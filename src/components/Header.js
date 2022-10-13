import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {Button} from 'native-base';
import BackNew from '../assets/svg/BackNew.svg';
import Hamburger from '../assets/svg/Hamburger.svg';
import {scale} from '../utils/scaling';
import Colors from '../constants/Colors';
import LottieView from 'lottie-react-native';
export default NewHeader = props => {
  const progress = useRef(new Animated.Value(0)).current;
  const animate = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(false);
  const [menuAnimation, setmenuAnimation] = useState(false);

  const handleAnimation = () => {
    const newValue = show ? 0 : 1;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setShow(!show);
  };

  const handleMenu = () => {
    const menu = menuAnimation ? 0 : 1;

    Animated.timing(animate, {
      toValue: menu,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setmenuAnimation(!menuAnimation);
  };
  return props.buttonText ? (
    <View
      style={{
        paddingHorizontal: scale(16),
      }}>
      <View style={[styles.container, props.style]}>
        {!props.noArrow ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button style={styles.closeIcon} onPress={props.onPress}>
              <BackNew
                style={styles.icon_2}
                fill={props.fill ? props.fill : '#000000'}
              />
            </Button>
            <Text
              style={[
                styles.headingText,
                {
                  // paddingLeft: scale(16),
                  color: props.fill ? props.fill : '#000000',
                },
              ]}
              numberOfLines={1}>
              {props.text}
            </Text>
            <View />
          </View>
        ) : (
          <Text
            style={[
              styles.headingText,
              {
                paddingVertical: 8,
              },
            ]}
            numberOfLines={1}>
            {props.text}
          </Text>
        )}
      </View>
      <TouchableWithoutFeedback style={{}} onPress={props.onButtonPress}>
        <View
          style={{
            height: 20,
            // backgroundColor: colors.blue,
            paddingHorizontal: 16,
            borderRadius: 10,
          }}>
          <Text
            style={{
              // color: colors.white,
              fontFamily: 'honc-Regular',
              bottom: Platform.OS == 'ios' ? -4 : 0,
            }}>
            {props.buttonText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ) : (
    <View
      style={{
        paddingHorizontal: scale(16),
      }}>
      <View style={[styles.container, props.style]}>
        {!props.noArrow ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback
              style={styles.closeIcon}
              onPressIn={handleMenu}
              onPress={props.onPress}>
              {/* <Hamburger
                style={styles.icon_2}
                fill={props.fill ? props.fill : '#000000'}
              /> */}
              <LottieView
                style={styles.icon_2}
                source={require('../assets/animations/hamburger.json')}
                progress={animate}
              />
            </TouchableWithoutFeedback>
            <View style={styles.dateContainer}>
              <Text
                style={[
                  styles.headingText3,
                  {
                    color: props.fill ? props.fill : Colors.accent,
                  },
                ]}
                numberOfLines={1}>
                {props.text}
              </Text>
            </View>

            <View />
            <TouchableWithoutFeedback
              style={styles.closeIcon}
              onPressIn={handleAnimation}
              onPress={props.onBellPress}>
              <LottieView
                style={styles.icon_2}
                source={require('../assets/animations/bell_black.json')}
                progress={progress}
              />
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.headingText2,
                {
                  paddingVertical: 8,
                  color: props.fill ? props.fill : '#000000',
                },
              ]}
              numberOfLines={1}>
              {props.text}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const CloseHeader = props => (
  <View style={[styles.container, props.style]}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: scale(10),
      }}>
      <Button style={styles.closeIcon} onPress={props.onPress}>
        <BackNew
          style={styles.icon_2}
          fill={props.fill ? props.fill : '#000000'}
        />
      </Button>
      <Text
        style={[
          styles.headingText2,
          {
            color: props.fill ? props.fill : '#000000',
          },
        ]}
        numberOfLines={1}>
        {props.text}
      </Text>

      <View />
    </View>
  </View>
);

export {CloseHeader};

const styles = StyleSheet.create({
  root: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.accent,
    left: scale(30),
    right: scale(30)
  },
  container: {
    padding:scale(10)
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  headingText: {
    fontFamily: 'honc-Medium',
    fontSize: scale(18),
    bottom: Platform.OS == 'ios' ? -4 : 0,
    left: -20,
  },
  headingText2: {
    fontFamily: 'honc-Medium',
    fontSize: scale(18),
    left: -20,

    // textAlign:'center',
    bottom: Platform.OS == 'ios' ? -4 : 0,
  },
  headingText3: {
    fontFamily: 'honc-Bold',
    fontSize: scale(14),
    marginLeft: scale(10),
    marginRight: scale(10),
    bottom: Platform.OS == 'ios' ? -4 : 0,
  },
  closeIcon: {
    backgroundColor: 'transparent',
    elevation: 0,
    paddingRight: 20,
    paddingVertical: 18,
  },
  icon: {
    height: 20,
    width: 25,
  },
  icon_2: {
    height: 30,
    width: 30,
  },
});
