import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import {toastr} from '../../utils/toast';
import all_styles from '../../styles/all_styles';
import Colors from '../../constants/Colors';
import ButtonComponent from '../../components/ButtonComponent';
import DynamicButton from '../../components/DynamicButton';
const LoginScreen = props => {
  const [mobile, setMobile] = useState('');
  const [hasMobileErrors, setMobileErrors] = useState(false);
  const [error, seterror] = useState('');
  const handleValidationforLogin = data => {
    let validation = {
      isValid: true,
    };

    if (!data.friend_phone || data.friend_phone == '') {
      validation.isValid = false;
      setMobileErrors(true);
      return validation;
    }

    return validation;
  };

  const handleLogin = () => {
    let data = {};
    data.friend_phone = mobile;
    let validation = handleValidationforLogin(data);
    if (validation.isValid) {
      props.navigation.navigate({
        name: 'OtpScreen',
        params: {
          contact: mobile,
        },
      });
    } else {
      seterror('*this field is required');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.insideContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.belowText}>
          Please enter your mobile number to proceed
        </Text>

        <TextInput
          mode="flat"
          label="Mobile Number"
          value={mobile}
          error={hasMobileErrors}
          keyboardType={'number-pad'}
          maxLength={10}
          returnKeyType={'done'}
          onChangeText={mobile => {
            setMobile(mobile), setMobileErrors(false);
          }}
          onBlur={() => {
            if (mobile.length === 10) {
              setMobileErrors(false);
              return true;
            } else {
              setMobileErrors(true);
              seterror('Mobile Number is Required');
              return false;
            }
          }}
          onSubmitEditing={() => {
            if (mobile.length === 10) {
              setMobileErrors(false);
              return true;
            } else {
              setMobileErrors(true);
              seterror('Mobile Number is Required');
              return false;
            }
          }}
          theme={{
            colors: {
              primary: Colors.pink,
              placeholder: Colors.background,
              text: Colors.background,
              borderWidth: 1,
              fontFamily: 'honc-Medium',
            },
            fonts: {
              regular: {
                fontFamily: 'honc-Medium',
                fontWeight: 'normal',
              },
              medium: {
                fontFamily: 'honc-Medium',
                fontWeight: 'normal',
              },
            },
          }}
          style={[
            all_styles.span_13,
            {
              height: scale(50),
              marginTop: scale(-5),
              backgroundColor: Colors.secondary,
            },
          ]}
        />
        {hasMobileErrors ? (
          <Text
            style={[
              all_styles.span_12_m,
              {color: '#000', marginTop: scale(5)},
            ]}>
            {error}
          </Text>
        ) : null}

        <View style={[styles.row, {paddingVertical: scale(20)}]}>
          <Text style={[all_styles.span_14_m, {marginLeft: scale(5)}]}>
            I Accept Terms and Conditions
          </Text>
        </View>
        <DynamicButton onPress={() => handleLogin()}>Proceed</DynamicButton>
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
    marginTop: '20%',
    flex: 1,
  },
  welcomeText: {
    fontSize: scale(30),
    paddingVertical: scale(20),
  },
  belowText: {
    fontSize: scale(16),
    paddingBottom: scale(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
