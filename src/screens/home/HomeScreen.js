import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import all_styles from '../../styles/all_styles';
import {scale} from '../../utils/scaling';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import PremiumBlock from './components/PremiumBlock';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
const HomeScreen = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <FocusAwareStatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

      <Header
        noArrow={false}
        text={moment().format('MMM DD, YYYY')}
        onBellPress={() => props.navigation.navigate('Notifications')}
        onPress={() => props.navigation.toggleDrawer()}
      />
      <ScrollView>
        <View style={styles.insideContainer}>
          <Text style={all_styles.span_20_b} numberOfLines={1}>
            Hi, {user}!
          </Text>
          <PremiumBlock />
        </View>
      </ScrollView>
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
