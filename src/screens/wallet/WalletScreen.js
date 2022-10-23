import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import BackgroundImage from './components/BackgroundImage';
import SliderDot from './components/Dots';

const data = [
  'https://images.unsplash.com/photo-1570745859748-6ba2014423eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&w=1000&q=80',
  'https://i.pinimg.com/564x/3d/c8/26/3dc826c7103ae621402e887c55f2cdbf.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/10562/screenshots/4533596/media/e6e8090d5c82637fd71a52a1ab36e312.jpg',
  'https://images.unsplash.com/photo-1623594444059-fc8a82febd99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGpva2VyfGVufDB8MXwwfHw%3D&w=1000&q=80',
];

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let sliderRef = useRef();

  // Animated values
  const translationY = useSharedValue(0);
  const animIndex = useSharedValue(0);
  const slideImageHeight = useSharedValue(250);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.x;
  });

  const handleViewItemChange = useRef(({changed}) => {
    animIndex.value = changed[0]?.index;
    setCurrentIndex(changed[0]?.index);
  }).current;

  const handleDotPress = dotIndex => {
    sliderRef?.current?.scrollToIndex({index: dotIndex, animated: true});
    setCurrentIndex(dotIndex);
  };

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(slideImageHeight.value, {duration: 300}),
    };
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {data?.map((item, index) => (
        <BackgroundImage
          item={item}
          translationY={translationY}
          index={index}
          key={item}
        />
      ))}

      <AnimatedFlatlist
        data={data}
        onScroll={scrollHandler}
        // ref={refer => (sliderRef = refer)}
        ref={sliderRef}
        horizontal={true}
        pagingEnabled
        contentContainerStyle={styles.center}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 100,
        }}
        onViewableItemsChanged={handleViewItemChange}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() =>
              (slideImageHeight.value =
                slideImageHeight.value === height ? 250 : height)
            }>
            <Animated.View style={[styles.sliderImage, animatedImageStyle]}>
              <Image source={{uri: item}} style={styles.image} />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
      />

      <View style={styles.row}>
        {data?.map((item, index) => (
          <TouchableOpacity onPress={() => handleDotPress(index)} key={item}>
            <SliderDot
              translationY={translationY}
              index={index}
              currentIndex={currentIndex}
              animIndex={animIndex}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: '100%'},
  center: {justifyContent: 'center', alignItems: 'center'},
  sliderImage: {width: width, height: 250},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height * 0.11,
  },
});

// Lets add comment




// import {StyleSheet, Text, SafeAreaView,StatusBar} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {useSelector} from 'react-redux';
// import { scale } from '../../utils/scaling';
// import { useIsFocused } from '@react-navigation/native';
// import Colors from '../../constants/Colors';
// import { CloseHeader } from '../../components/Header';
// import all_styles from '../../styles/all_styles';
// const WalletScreen = (props) => {
//   const [user, setUser] = useState(
//     useSelector(state => state?.appReducer?.user),
//   );
//   const theme = useSelector(state => state.appReducer);
//   const [mode, setMode] = useState(theme.mode);

//   function FocusAwareStatusBar(props) {
//     const isFocused = useIsFocused();

//     return isFocused ? <StatusBar {...props} /> : null;
//   }
//   useEffect(() => {
//     setMode(theme.mode);
//   }, [theme]);
//   return (
//     <SafeAreaView
//       style={mode == 'dark' ? styles.darkModeContainer : styles.mainContainer}>
//         <CloseHeader
//       text="Wallet"
//       onPress={()=>props.navigation.navigate('DrawerNavigator')}
//       fill={mode == 'dark' ? '#121212' : '#fff'}
//       />
//       <FocusAwareStatusBar
//         backgroundColor={mode == 'dark' ? '#121212' : '#fff'}
//         barStyle={mode == 'dark' ? 'light-content' : 'dark-content'}
//       />
//       </SafeAreaView>
//   );
// };

// export default WalletScreen;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   darkModeContainer: {
//     flex: 1,
//     backgroundColor: Colors.darkMode,
//   },
//   insideContainer: {
//     marginHorizontal: scale(23),
//   },
//   welcomeText: {
//     fontSize: scale(20),
//     fontFamily: 'honc-Bold',
//     color: '#000',
//     paddingVertical: scale(20),
//   },
//   darkmodeWelcomeText: {
//     fontSize: scale(20),
//     fontFamily: 'honc-Bold',
//     color: '#fff',
//     paddingVertical: scale(20),
//   },
// });
