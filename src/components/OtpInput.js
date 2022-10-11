import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import Colors from '../styles/Colors';

const Input = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFloat, setIsFloat] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const [pin1, setPin1] = useState(' ');
  const [pin2, setPin2] = useState(' ');
  const [pin3, setPin3] = useState(' ');
  const [pin4, setPin4] = useState(' ');
  const onChangeHandler = inputValue => {
    setInputValue(inputValue);
  };
  return (
    <View>
      <View
        style={{
          ...styles.placeholderContainer,
          ...{top: !isFloat && inputValue.length == 0 ? 10 : 30},
        }}>
        <Text
          style={{
            ...styles.placeholder,
            ...{
              color: !isFloat && inputValue.length == 0 ? '#ccc' : 'blue',
              fontSize: !isFloat && inputValue.length == 0 ? 24 : 16,
            },
            ...props.inputTextStyle,
          }}>
          {props.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          {...props}
          textContentType={props.type}
          style={{
            ...styles.input,
            ...{
              borderBottomColor: !isFocused ? '#ccc' : Colors.accent,
              borderBottomWidth: !isFocused ? 1 : 2,
            },
            ...props.inputStyle,
          }}
          placeholderTextColor="#bbb"
          onFocus={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          onBlur={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          ref={pin1Ref}
          keyboardType="numeric"
          maxLength={1}
          onChange={pin1 => {
            setPin1(pin1);
            if (pin1 != ' ') {
              pin2Ref.current.focus();
            }
          }}
          value={inputValue}
          onChangeText={onChangeHandler}
        />
        <TextInput
          {...props}
          textContentType={props.type}
          style={{
            ...styles.input,
            ...{
              borderBottomColor: !isFocused ? '#ccc' : Colors.accent,
              borderBottomWidth: !isFocused ? 1 : 2,
            },
            ...props.inputStyle,
          }}
          placeholderTextColor="#bbb"
          onFocus={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          onBlur={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          ref={pin1Ref}
          keyboardType="numeric"
          maxLength={1}
          onChange={pin1 => {
            setPin2(pin1);
            if (pin1 != '') {
              pin2Ref.current.focus();
            }
          }}
          value={inputValue}
          onChangeText={onChangeHandler}
        />
        <TextInput
          {...props}
          textContentType={props.type}
          style={{
            ...styles.input,
            ...{
              borderBottomColor: !isFocused ? '#ccc' : Colors.accent,
              borderBottomWidth: !isFocused ? 1 : 2,
            },
            ...props.inputStyle,
          }}
          placeholderTextColor="#bbb"
          onFocus={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          onBlur={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          ref={pin2Ref}
          keyboardType="numeric"
          maxLength={1}
          onChange={pin2 => {
            setPin1(pin2);
            if (pin2 != '') {
              pin3Ref.current.focus();
            }
          }}
          value={inputValue}
          onChangeText={onChangeHandler}
        />
        <TextInput
          {...props}
          textContentType={props.type}
          style={{
            ...styles.input,
            ...{
              borderBottomColor: !isFocused ? '#ccc' : Colors.accent,
              borderBottomWidth: !isFocused ? 1 : 2,
            },
            ...props.inputStyle,
          }}
          placeholderTextColor="#bbb"
          onFocus={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          onBlur={() => {
            setIsFocused(prevState => !prevState);
            setIsFloat(prevState => !prevState);
          }}
          ref={pin3Ref}
          keyboardType="numeric"
          maxLength={1}
          onChange={pin3 => {
            setPin1(pin3);
            if (pin3 != '') {
              pin4Ref.current.focus();
            }
          }}
          value={inputValue}
          onChangeText={onChangeHandler}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  placeholder: {
    color: '#ccc',
    fontSize: 24,
  },
  placeholderContainer: {
    position: 'relative',
  },
});
