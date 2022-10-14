import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import DynamicButton from '../../components/DynamicButton';
import {connect, useDispatch, useSelector} from 'react-redux';

import {scale} from '../../utils/scaling';
const OtpScreen = props => {
  var contact = useSelector(state => state.appReducer.mobileNumber);

  var replaced = contact.replace(/^(.{2}).*(.{3}).*(.{4})$/, `$1****$3`);

  const handleOnLogin = () => {
    props.navigation.navigate('CreateAccount');
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.insideContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.belowText}>
          Please enter the otp sent to {replaced}
        </Text>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <DynamicButton onPress={() => handleOnLogin()}>Login</DynamicButton>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  insideContainer: {
    marginHorizontal: scale(23),
  },
  welcomeText: {
    fontSize: scale(30),
    fontFamily: 'honc-Bold',
    color: '#000',
    paddingVertical: scale(20),
  },
  belowText: {
    fontSize: scale(16),
    fontFamily: 'honc-Medium',
    color: '#000',
    paddingBottom: scale(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
