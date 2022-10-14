import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from '../../utils/scaling';
import {useSelector, useDispatch} from 'react-redux';
import all_styles from '../../styles/all_styles';
import Colors from '../../constants/Colors';
const ProfileScreen = props => {
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar backgroundColor={Colors.teal} barStyle={'light-content'} />
      <View style={styles.tealBackground}></View>
      <View style={styles.whiteBackground}>
        <Text style={all_styles.span_30_b}>Hi {user}</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  tealBackground: {
    flex: 1,
    backgroundColor: Colors.teal,
  },
  whiteBackground: {
    flex: 2,
    borderTopLeftRadius: scale(20),
    position: 'absolute',
    bottom: scale(0),
    elevation: 4,
    height: '50%',
    paddingHorizontal: scale(23),
    width: '100%',
    borderTopRightRadius: scale(20),
    backgroundColor: '#fff',
  },
});
