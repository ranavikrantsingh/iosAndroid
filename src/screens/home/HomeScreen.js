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
import PremiumBlock from './components/PremiumBlock';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    useSelector(state => state?.appReducer?.user),
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <View style={styles.insideContainer}>
          <Text style={all_styles.span_18_b} numberOfLines={1}>
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
