import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import UserCard from './components/UserCard';
import TapToPay from './components/TapToPay';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../../constants/Colors'
const BkashPayment = () => {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <SafeAreaView style={style.container}>
      <FocusAwareStatusBar
        backgroundColor={mode == 'dark' ? 'rgba(0,0,0,0.4)' : '#fff'}
        barStyle={mode == 'dark' ? 'light-content' : 'dark-content'}
      />

      <View style={mode == 'dark' ? style.darkContent :style.innerContent}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <Text style={style.heading}>
            Confirm to <Text style={style.bold}>Mobile Recharge</Text>
          </Text>
          <UserCard
            title="Rana Vikrant Singh Rathod"
            subTitle="9666836140"
            avatarText="R"
            avatarColor="#e2136e"
          />
          <View style={style.boxArea}>
            <View style={style.Row}>
              <View style={style.col}>
                <Text>Total</Text>
                <Text>$10.00</Text>
              </View>
              <View style={style.col}>
                <Text>New Balance</Text>
                <Text>$2710.00</Text>
              </View>
              <View style={style.col}>
                <Text>Type</Text>
                <Text>Prepaid</Text>
              </View>
              <View style={style.col}>
                <Text>Mobile Operator</Text>
                <Text>Airtel</Text>
              </View>
            </View>
          </View>
        </View>
        <TapToPay />
      </View>
    </SafeAreaView>
  );
};

export default BkashPayment;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  innerContent: {
    backgroundColor: 'white',
    flex: 1,
  },
  darkContent: {
    backgroundColor: Colors.darkMode,
    flex: 1,
  },
  heading: {
    color: '#e2136e',
    fontSize: 20,
    // textAlign: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  bold: {
    fontWeight: 'bold',
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  col: {
    width: '50%',
    paddingVertical: 15,
  },
});
