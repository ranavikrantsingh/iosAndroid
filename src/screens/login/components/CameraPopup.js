import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {scale} from '../../../utils/scaling';
import Colors from '../../../constants/Colors';
import all_styles from '../../../styles/all_styles';
import BackNew from '../../../assets/svg/back_2.svg';
import Close from '../../../assets/svg/closeIcon-white.svg';
import Camera from '../../../assets/svg/Camera.svg';
import Gallery from '../../../assets/svg/Gallery.svg';
import DynamicButton from '../../../components/DynamicButton';

const CameraPopup = props => {
  const [avatarImages, setavatarImages] = useState([
    {
      id: 0,
      image:
        'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
    },
    {
      id: 1,
      image:
        'https://i.picsum.photos/id/1074/5472/3648.jpg?hmac=w-Fbv9bl0KpEUgZugbsiGk3Y2-LGAuiLZOYsRk0zo4A',
    },
    {
        id: 2,
        image:
          'https://i.picsum.photos/id/342/2896/1944.jpg?hmac=_2cYDHi2iG1XY53gvXOrhrEWIP5R5OJlP7ySYYCA0QA',
      },
  ]);

  //   const getAllAvatarProfileImages = () => {
  // callApi(`v2/customer/${props.userId}/get-profile-images`, 'get').then(
  //   (res) => {
  //     if (res.status == 'Success') {
  //       setavatarImages(res.data);
  //     }
  //   },
  // );
  //   };
  //   useEffect(() => {
  //     getAllAvatarProfileImages();
  //   }, []);

  const renderView = () => {
    if (props.ActivePopUp == 0) {
      return (
        <View style={styles.modalView}>
          <View style={{marginHorizontal: scale(23)}}>
            <Text style={all_styles.span_20_m}>Upload a Photo</Text>
            <TouchableOpacity onPress={props.camera}>
              <View style={styles.row}>
                <View style={styles.row_2}>
                  <Camera fill={'#000'} />
                  <Text
                    style={[
                      all_styles.span_16_m,
                      {marginHorizontal: scale(10)},
                    ]}>
                    Take photo
                  </Text>
                </View>
                <View style={styles.arrow}>
                  <BackNew fill={'#000'} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.gallery}>
              <View style={styles.row}>
                <View style={styles.row_2}>
                  <Gallery />
                  <Text
                    style={[
                      all_styles.span_16_m,
                      {marginHorizontal: scale(10)},
                    ]}>
                    Select from Gallery
                  </Text>
                </View>
                <View style={styles.arrow}>
                  <BackNew fill={'#000'} />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={all_styles.span_20_m}>Choose an avatar</Text>

            {avatarImages && avatarImages.length > 0 ? (
              <FlatList
                data={avatarImages}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <TouchableOpacity onPress={() => props.avatar(item)}>
                        <Image
                          source={{uri: item?.image}}
                          style={styles.avatar}
                        />
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            ) : (
              <View style={{alignItems: 'center', marginVertical: scale(20)}}>
                <ActivityIndicator animating={true} color={'#f26868'} />
              </View>
            )}
            {/* <View style={styles.line} /> */}
            <View style={{marginVertical: scale(20)}}>
              {/* <DynamicButton onPress={props.confirmButton}>
                Save Changes
              </DynamicButton> */}
            </View>
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
          <View>{renderView()}</View>
        </View>
      </Modal>
    </View>
  );
};

export default CameraPopup;
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
    borderTopRightRadius:scale(20),
    borderTopLeftRadius: scale(20),
    paddingTop: scale(20),
    width: Dimensions.get('window').width,
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
  avatar: {
    height: scale(70),
    width: scale(70),
    marginRight: scale(10),
    marginTop: scale(10),
    marginBottom: scale(10),
    borderRadius: scale(100),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(20),
    justifyContent: 'space-between',
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: scale(10),
  },
  row_2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    transform: [{rotate: '180deg'}],
  },
});
