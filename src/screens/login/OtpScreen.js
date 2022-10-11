import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import DynamicButton from '../../components/DynamicButton';
import {scale} from '../../utils/scaling';
const OtpScreen = props => {
  const {contact} = props?.route?.params;
  const handleOnLogin = () => {};
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.insideContainer}>
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
        <DynamicButton>Login</DynamicButton>
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
});
