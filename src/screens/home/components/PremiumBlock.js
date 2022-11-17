import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState,useEffect} from 'react';
import {scale} from '../../../utils/scaling';
import Colors from '../../../constants/Colors';
import Icon, { Icons } from '../../../components/Icons';

import { useSelector } from 'react-redux';
const PremiumBlock = props => {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.9}>
      <View style={mode == 'dark' ? styles.darkModeCard :styles.card}>
        <Text style={styles.text}>✪ {props.title}</Text>
        <Text style={styles.labelText}>{props.subTitle}</Text>
        <View style={styles.miniSquare}>
        <Icon type={Icons.FontAwesome} name="rocket" color={Colors.secondary} size={24} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PremiumBlock;

const styles = StyleSheet.create({
  darkModeCard: {
    backgroundColor: Colors.background,
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    marginVertical: scale(10),
  },
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
    alignItems:'center',
    borderRadius: scale(10),
    height: scale(30),
    width: scale(30),
    bottom: scale(-5),
    right: scale(-5),
    position: 'absolute',
  },
});
