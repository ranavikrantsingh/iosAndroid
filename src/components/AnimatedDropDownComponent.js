import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Text,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Colors from '../constants/Colors';
import all_styles from '../styles/all_styles';
import {scale} from '../utils/scaling';
// import { TextInput } from 'react-native-paper';
import Close from '../assets/svg/closeIcon-white.svg';
import _ from 'lodash';
import LottieView from 'lottie-react-native';

const AnimatedDropDownPopup = props => {
  const progress = useRef(new Animated.Value(0)).current;
  const [list, setList] = useState([]);
  const [animate, setAnimate] = useState(false);
  const handleAnimation = () => {
    const animatedValue = animate ? 0 : 1;
    Animated.timing(progress, {
      toValue: animatedValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setAnimate(!animate);
  };
  useEffect(() => {
    setList(props.list);
  }, []);

  const buttonPressed = value => {
    console.log('value :>> ', value);
    props.handleSelection(props.keyName, value);
  };

  const handleSearch = searchString => {
    searchString = _.kebabCase(searchString);
    let searchList = props.list;
    searchList = searchList.filter(
      item => _.kebabCase(item).indexOf(searchString) > -1,
    );
    setList(searchList);
  };
  const renderSeparator = () => (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );

  const renderView = () => {
    if (props.ActivePopUp == 0) {
      return (
        <View style={styles.modalView}>
          <View style={{marginHorizontal: scale(16)}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <LottieView
                source={require('../assets/animations/Success.json')}
                progress={progress}
                loop={false}
                size={16}
                style={{height: 18, marginTop: Platform.OS === 'ios' ? 4 : 6}}
              />
              <View
                style={{flex: 1, marginLeft: Platform.OS === 'ios' ? 6 : 2}}>
                <TextInput
                  placeholder="Search"
                  style={[
                    all_styles.span_14,
                    {
                      marginTop: scale(20),
                      alignItems: 'center',
                      height: scale(50),
                    },
                  ]}
                  onChangeText={text => {
                    handleSearch(text);
                  }}
                />
              </View>
            </View>
            {/* <TextInput
              placeholder="Search"
              onChangeText={(text) => {
                handleSearch(text);
              }}
              mode="flat"
              theme={{
                colors: {
                  primary: Colors.background,
                  placeholder: Colors.background,
                  text: Colors.background,
                  borderWidth: StyleSheet.hairlineWidth,
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
              style={styles.searchBox}
              left={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity onPress={() => handleAnimation()}>
                      <View style={styles.contactBook}>
                        <LottieView
                          source={require('../../../../../assets/animation/SearchLottie.json')}
                          autoSize
                          progress={progress}
                          loop={false}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  size={22}
                  color={'black'}
                />
              }
            /> */}
          </View>
          <View style={styles.flatlistContainer}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={list}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => buttonPressed(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 16,
                    }}>
                    <Text style={all_styles.span_14_sb}>{`${item}`}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.email}
              // ItemSeparatorComponent={renderSeparator}
              ListFooterComponent={<View style={{height: scale(60)}} />}
            />
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.centeredView}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(0, 0, 0, 0.8)"
        barStyle={'light-content'}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        useNativeDriver={true}
        onDismiss={() => props.setModalVisible(false)}
        onSwipeComplete={() => props.setModalVisible(false)}
        onBackButtonPress={() => props.setModalVisible(false)}
        onBackdropPress={() => props.setModalVisible(false)}
        onSwipeCancel={() => props.setModalVisible(false)}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}>
        <View style={styles.centeredView_2}>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 12,
              marginBottom: 14,
            }}>
            <View>
              <TouchableOpacity onPress={() => props.setModalVisible(false)}>
                <View
                  style={{
                    backgroundColor: '#00000080',
                    width: 45,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 45 / 2,
                  }}>
                  <Close style={{}} height={20} width={20} Color={'#fff'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView behavior="padding" style={{width: '100%'}}>
              {renderView()}
            </KeyboardAvoidingView>
          ) : (
            renderView()
          )}
        </View>
      </Modal>
    </View>
  );
};

export default AnimatedDropDownPopup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredView_2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: scale(20),
    width: scale(390),
    height: scale(350),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalView_2: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: scale(20),
    width: scale(384),
    height: scale(200),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: scale(10),
    marginTop: 10,
  },
  icon: {
    height: 20,
    width: 25,
  },
  iconContainer: {alignSelf: 'flex-end', paddingBottom: 20},
  flatlistContainer: {
    marginTop: 15,
    marginHorizontal: scale(10),
    height: '80%',
  },
  searchBox: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(30),
    borderRadius: scale(50),
    paddingVertical: Platform.OS === 'android' ? undefined : scale(15),
  },
  center: {
    alignItems: 'center',
    marginTop: '10%',
  },
});
