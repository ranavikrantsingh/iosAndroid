import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import UserCard from './components/UserCard';
import TapToPay from './components/TapToPay';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import {scale} from '../../utils/scaling';
const BkashPayment = () => {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
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

      <View style={mode == 'dark' ? style.darkContent : style.innerContent}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <Text style={style.heading}>
            Confirm to <Text style={style.bold}>Mobile Recharge</Text>
          </Text>
          <UserCard
            title={user[0]}
            subTitle={user[1]}
            image={{uri: user[2]?.image || user[2]?.assets[0]?.uri}}
          />
          <View style={style.boxArea}>
            <View style={style.Row}>
              <View style={style.col}>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  Total
                </Text>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  $10.00
                </Text>
              </View>
              <View style={style.col}>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  New Balance
                </Text>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  $2710.00
                </Text>
              </View>
              <View style={style.col}>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  Type
                </Text>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  Prepaid
                </Text>
              </View>
              <View style={style.col}>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  Mobile Operator
                </Text>
                <Text style={mode == 'dark' ? style.darkTitle : style.title}>
                  Airtel
                </Text>
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
  darkTitle: {
    color: '#fff',
    fontSize: scale(12),
  },
  title: {
    color: '#2a2e39',
    fontSize: scale(12),
  },
});
