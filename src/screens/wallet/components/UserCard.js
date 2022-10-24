import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Colors from '../../../constants/Colors';
import {scale} from '../../../utils/scaling';

const UserCard = props => {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  

  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <View style={mode == 'dark' ? style.darkRow : style.row}>
      {props?.image ? (
        <Image source={props?.image} style={style.image} />
      ) : (
        <Icon name="user-circle" color="grey" size={45} />
      )}
      <View style={style.mailText}>
        <Text
          style={[mode == 'dark' ? style.darkTitle : style.title, style.bold]}>
          {props?.title}
        </Text>
        <Text
          style={[
            mode == 'dark' ? style.darkSubTitle : style.subTitle,
            style.bold,
          ]}
          numberOfLines={1}>
          {props?.subTitle}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  darkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.darkMode,
  },
  mailText: {
    marginLeft: 15,
    width: '80%',
  },
  bold: {
    fontWeight: 'bold',
  },
  darkTitle: {
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subTitle: {
    fontSize: 13,
    color: '#000',
  },
  darkSubTitle: {
    fontSize: 13,
    color: '#fff',
  },
  image: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(5),
    
    borderColor: '#fFF',
    borderWidth: scale(1),
    borderRadius: scale(100),
  },
});
