import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {scale} from '../utils/scaling';

propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{rotateZ: `${rotateBy}deg`}],
  };
};

renderThirdLayer = percent => {
  if (percent > 50) {

    return (
      <View
        style={[
          styles.secondProgressLayer,
          propStyle(percent - 50, 45),
        ]}></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

const CircularProgress = ({percent}) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      <Text style={styles.display}>{percent}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderColor: '#f2f2f2',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  firstProgressLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{rotateZ: '-135deg'}],
  },
  secondProgressLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{rotateZ: '45deg'}],
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#f2f2f2',
    borderTopColor: '#f2f2f2',
    transform: [{rotateZ: '-135deg'}],
  },
  display: {
    fontFamily: 'honc-Bold',
    color: '#000',
    fontSize: scale(25),
  },
});

export default CircularProgress;
