import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../../utils/scaling';

const PremiumBlock = props => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Premium Block</Text>
      <Text style={styles.labelText}>loremIpsum</Text>
    </View>
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
    lineHeight: scale(23),
  },
});
