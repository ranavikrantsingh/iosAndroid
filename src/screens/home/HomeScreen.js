import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import all_styles from '../../styles/all_styles';
import {scale} from '../../utils/scaling';
import DynamicButton from '../../components/DynamicButton';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions';

const HomeScreen = props => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={styles.insideContainer}>
        <Text style={all_styles.span_18_b}>HomeScreen</Text>
      </View>
      <DynamicButton onPress={() => dispatch(logout())}>Logout</DynamicButton>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  insideContainer: {
    marginHorizontal: scale(23),
  },
});
