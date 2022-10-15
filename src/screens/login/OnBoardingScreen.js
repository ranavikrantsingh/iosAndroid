import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import all_styles from '../../styles/all_styles';
import {scale} from '../../utils/scaling';
import ButtonComponent from '../../components/ButtonComponent';
import Colors from '../../constants/Colors';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('screen');

const OnBoardingScreen = props => {
  const [show, setshow] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;

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
  const Indicator = ({scrollX}) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          flexDirection: 'row',
        }}>
        {DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.9, 0.6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`indicator-${i}`}
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
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
