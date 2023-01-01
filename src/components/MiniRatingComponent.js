import {
    StyleSheet,
    Text,
    View,
    LayoutAnimation,
    UIManager,
    Platform,
    Animated,
    Keyboard,
    Easing,
    TouchableWithoutFeedback,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useRef} from 'react';
  import {scale} from '../util/scaling';
  import {TextInput} from 'react-native-paper';
  import Colors from '../styles/Colors';
  import Star from '../assets/icons/Star';
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  const numStars = 5;
  const MiniRatingComponent = props => {
    const listOfResponses = {
      1: 'Sorry 😢',
      2: 'Average 😞',
      3: 'Good 🙂',
      4: 'Superb 😊',
      5: 'OMG!! 😯',
    };
    const [rating, setRating] = useState(0);
    const animation = useRef(new Animated.Value(1)).current;
    const [response, setResponse] = useState('');
    const [isRating, setIsRating] = useState(false);
    const [showtextInput, setshowtextInput] = useState(false);
    const rate = star => {
      props?.setRating(star);
    };
    const onSubmitRatings = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); //for ease in and ease out animation
      props?.setIsRating(false);
      if (props?.rating > 0) {
        props.onSubmitRatings(
          props?.rating,
          props?.taskId,
        );
        props?.setIsRating(true);
      } else {
        alert('Please rate our partner before you submit');
      }
    };
    const animate = () => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        animation.setValue(1);
      });
    };
  
    const handleFeedBackOnPressed = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); //for ease in and ease out animation
      setshowtextInput(!showtextInput);
    };
  
    const handleOnSavePressed = () => {
      if (props?.value?.length > 0) {
        handleFeedBackOnPressed();
        props?.onSavePressed(props?.value, props.taskId);
        Keyboard.dismiss();
      } else {
        alert('Please enter your valuable feedback');
      }
    };
  
    let stars = [];
    const animateScale = animation?.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 1.4, 1],
    });
    const animationStyle = {
      transform: [{scale: animateScale}],
    };
    for (let x = 1; x <= numStars; x++) {
      stars?.push(
        <TouchableWithoutFeedback
          key={x}
          onPress={() => {
            setResponse(listOfResponses[x]);
            rate(x);
            animate();
          }}>
          <Animated.View style={x <= props?.rating ? animationStyle : null}>
            <Star
              fill={x <= props?.rating ? '#ffb100' : '#fff'}
              stroke={x <= props?.rating ? '#ffb100' : '#000'}
              style={styles.starImageStyle}
              height={scale(30)}
              width={scale(30)}
            />
          </Animated.View>
        </TouchableWithoutFeedback>,
      );
    }
  
    return (
      <View style={styles.container}>
        {/* {
          response && (
            <Text style={styles?.ratingText}>{response}</Text>
          )
        } */}
        {props?.isRating ? (
          <>
            <View style={[styles?.row]}>
              <View style={styles?.row}>
                <View style={styles?.gray}>
                  <View style={styles?.row}>
                    <Star fill={'#000'} height={scale(15)} width={scale(15)} />
                    <Text style={styles.ratingText}>{props?.rating}</Text>
                  </View>
                </View>
                {/* <TouchableOpacity
                  onPress={() => handleFeedBackOnPressed()}
                  disabled={props?.disabled}>
                  <Text style={styles?.submitText}>Write Feedback</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            {/* {showtextInput && (
              <TextInput
                style={{marginTop: scale(10), backgroundColor: '#fff'}}
                label="Feedback"
                mode="outlined"
                multiline={true}
                numberOfLines={4}
                onChangeText={props?.onChangeText}
                value={props?.value}
                theme={{
                  colors: {
                    primary: Colors.pink,
                    placeholder: Colors.background,
                    text: Colors.background,
                    borderWidth: 1,
                    fontFamily: 'honc-Medium',
                  },
                  fonts: {
                    regular: {
                      fontFamily: 'honc-Medium',
                      fontWeight: 'normal',
                    },
                    medium: {
                      fontFamily: 'honc-Medium',
                      fontWeight: 'normal',
                    },
                  },
                }}
                right={
                  <TextInput.Icon
                    name={() => (
                      <TouchableOpacity
                        onPress={() =>
                          handleOnSavePressed(props?.value, props.taskId)
                        }>
                        <Text style={styles?.saveText}>Send</Text>
                      </TouchableOpacity>
                    )}
                  />
                }
              />
            )} */}
          </>
        ) : (
          <View style={styles?.row}>
            <View style={styles?.row}>{stars}</View>
            <TouchableOpacity
              style={styles?.button}
              onPress={() => onSubmitRatings()}>
              <Text style={styles?.submitText}>
                {props?.isRating ? 'Submitting...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  
  export default MiniRatingComponent;
  
  const styles = StyleSheet.create({
    starImageStyle: {
      marginLeft: 10,
    },
    container: {
      marginVertical: scale(4),
    },
    submitText: {
      color: '#0181e3',
      fontSize: scale(14),
      textDecorationLine: 'underline',
      fontWeight: 'bold',
      marginLeft: scale(10),
    },
    gray: {
      backgroundColor: '#F2F2F2',
      borderRadius: scale(5),
      height: scale(30),
      paddingHorizontal: scale(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      color: '#000',
      fontSize: scale(12),
      marginLeft: scale(5),
      fontFamily: 'honc-Medium',
    },
    saveText: {
      color: '#f26868',
      fontSize: scale(14),
      fontWeight: 'bold',
    },
  });
  