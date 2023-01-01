import {
    StyleSheet,
    Image,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {scale} from '../util/scaling';
  const {width} = Dimensions.get('screen');
  
  const CustomCarousel = props => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    let sliderRef = React.useRef();
    const handleDotPress = dotIndex => {
      sliderRef?.current?.scrollToIndex({index: dotIndex, animated: true});
      setCurrentIndex(dotIndex);
    };
    const Indicator = ({scrollX}) => {
      return (
        <View
          style={{
            flexDirection: 'row',
          }}>
          {props?.data?.length > 1 &&
            props?.data?.map((item, index) => {
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
                  key={item}>
                  <Animated.View
                    key={`indicator-${index}`}
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 10,
                      backgroundColor: '#f26868',
                      opacity,
                      margin: 5,
                      transform: [{scale}],
                    }}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      );
    };
    return (
      <View>
        <Animated.FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={sliderRef}
          data={props?.data}
          renderItem={({item,index}) => (
            <TouchableOpacity onPress={()=>props?.onCurrentImagePressed(index)} disabled={props?.disabled}>
              <View>
                <Image
                  source={{uri: item}}
                  style={{...styles.imageContainer, ...props?.imageStyle}}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
          listKey={(index) => `${index}`}
          pagingEnabled={true}
          scrollEventThrottle={32}
          contentContainerStyle={{justifyContent: 'center'}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: '100%',
                  width: scale(5),
                }}
              />
            );
          }}
        />
        {props?.showDot ? (
          <View style={{alignItems: 'center'}}>
            <Indicator scrollX={scrollX} />
          </View>
        ) : null}
      </View>
    );
  };
  
  export default CustomCarousel;
  
  const styles = StyleSheet.create({
    imageContainer: {
      height: scale(122),
      width: scale(351),
      // marginVertical: scale(20),
      borderRadius: scale(10),
    },
  });
  