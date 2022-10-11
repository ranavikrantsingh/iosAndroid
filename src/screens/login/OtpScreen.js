import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const OtpScreen = props => {
  const {contact} = props?.route?.params;
  console.log('====================================');
  console.log(contact);
  console.log('====================================');
  return (
    <View>
      <OTPInputView
       style={{width: '80%', height: 200}}
       pinCount={4}
       // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
       // onCodeChanged = {code => { this.setState({code})}}
       autoFocusOnLoad
       codeInputFieldStyle={styles.underlineStyleBase}
       codeInputHighlightStyle={styles.underlineStyleHighLighted}
       onCodeFilled = {(code => {
           console.log(`Code is ${code}, you are good to go!`)
       })}/>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
