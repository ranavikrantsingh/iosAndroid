import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import {toastr} from '../../utils/toast';
import all_styles from '../../styles/all_styles';
import Colors from '../../constants/Colors';
const LoginScreen = props => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.insideContainer}>
        <Text style={all_styles.span_14_b}>Welcome</Text>
        <TextInput />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  insideContainer: {
    marginHorizontal: scale(23),
  },
});
