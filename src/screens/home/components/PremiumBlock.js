import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '../../../utils/scaling';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const PremiumBlock = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.9}>
      <View style={styles.card}>
        <Text style={styles.text}>✪ For Gated Communities</Text>
        <Text style={styles.labelText}>loremIpsum</Text>
        <View style={styles.miniSquare}>
        <Icon name="rocket" size={30} color="#900" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PremiumBlock;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    marginVertical: scale(10),
  },
  text: {
    color: '#ebebeb',
    fontFamily: 'honc-Bold',
    fontSize: scale(18),
  },
  labelText: {
    color: '#ebebeb',
    fontFamily: 'honc-Medium',
    fontSize: scale(16),
    marginHorizontal: scale(17),
    lineHeight: scale(23),
  },
  miniSquare: {
    backgroundColor: Colors.teal,
    borderRadius: scale(10),
    height: scale(30),
    width: scale(30),
    bottom: scale(-5),
    right: scale(-5),
    position: 'absolute',
  },
});
