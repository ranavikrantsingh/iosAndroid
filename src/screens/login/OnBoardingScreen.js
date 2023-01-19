import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import all_styles from '../../styles/all_styles';
import {scale} from '../../utils/scaling';
import ButtonComponent from '../../components/ButtonComponent';
import Colors from '../../constants/Colors';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('screen');

const OnBoardingScreen = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const [show, setshow] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const sliderRef = React.useRef();
  const handleDotPress = dotIndex => {
    sliderRef?.current?.scrollToIndex({index: dotIndex, animated: true});
    setCurrentIndex(dotIndex);
  };

  const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
  const DATA = [
    {
      key: 0,
      title: 'Hey there!',
      image: require('../../assets/animations/robot.json'),
      desc: 'Welcome to the app and thank you for downloading it.',
    },
    {
      key: 1,
      title: 'Fearless',
      image: require('../../assets/animations/Cart.json'),
      desc: 'Feel free to explore the app',
    },
    {
      key: 2,
      title: 'Musician',
      image: require('../../assets/animations/BarChart.json'),
      desc: 'I am a musician and I love to play music',
    },
    {
      key: 3,
      title: 'Here you go !',
      image: require('../../assets/animations/Wallet.json'),
      desc: "Let's get started",
    },
  ];
  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      sliderRef?.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sliderRef?.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }

  }
  const Indicator = ({scrollX}) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          flexDirection: 'row',
        }}>
        {DATA?.length > 1 &&
          DATA?.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 0.9, 0.6],
              extrapolate: 'clamp',
            });

            return (
              <TouchableOpacity
                onPress={() => handleDotPress(index)}
                key={index}>
                <Animated.View
                  key={`indicator-${index}`}
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    opacity,
                    margin: 10,
                    transform: [{scale}],
                  }}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };
  const Backdrop = ({scrollX}) => {
    const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_, i) => i * width),
      outputRange: bgs.map(bg => bg),
    });
    return (
      <Animated.View
        style={[StyleSheet.absoluteFillObject, {backgroundColor}]}
      />
    );
  };

  const Square = ({scrollX}) => {
    const RANA = Animated.modulo(
      Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width),
      ),
      1,
    );
    const rotate = RANA.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['-35deg', '0deg', '-35deg'],
    });
    const translateX = RANA.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -height, 0],
    });
    return (
      <Animated.View
        style={{
          width: height,
          height: height,
          backgroundColor: '#fff',
          borderRadius: 86,
          position: 'absolute',
          top: -height * 0.6,
          left: -height * 0.3,
          transform: [
            {
              rotate,
            },
            {
              translateX,
            },
          ],
        }}
      />
    );
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <View style={{flex: 0.7, justifyContent: 'center'}}>
          <LottieView
            source={item.image}
            style={{
              width: scale(210),
              height: scale(210),
            }}
            autoPlay
            loop
          />
        </View>
        <View style={{flex: 0.3}}>
          <Text style={[all_styles.span_35_b, {color: '#fff'}]}>
            {item.title}
          </Text>
          <Text style={[all_styles.span_20_b, {color: '#fff'}]}>
            {item.desc}
          </Text>
        </View>
      </View>
    );
  };
  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (currentIndex < DATA?.length - 1) {
          setCurrentIndex(currentIndex + 1);
          sliderRef?.current?.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
          });
        } else {
          setCurrentIndex(0);
          sliderRef?.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoPlay]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle={
        'dark-content'
      } />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        ref={sliderRef}
        horizontal
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onEndReached={() => setshow(true)}
        contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <View style={{alignItems: 'center'}}>
        <Indicator scrollX={scrollX} />
      </View>
      {show ? (
        <View style={styles.buttonContainer}>
          <ButtonComponent
            name="Proceed"
            buttonStyle={{
              backgroundColor: Colors.secondary,
            }}
            textStyle={{
              color: '#000',
            }}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width,
    bottom: 0,
  },
});
