import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Colors from '../../../constants/Colors';

const UserCard = ({title, subTitle, description, avatarText, avatarColor}) => {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);

  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <View style={mode == 'dark' ? style.darkRow : style.row}>
      <Icon name="user-circle" color="grey" size={45} />
      <View style={style.mailText}>
        <Text
          style={[mode == 'dark' ? style.darkTitle : style.title, style.bold]}>
          {title}
        </Text>
        <Text
          style={[
            mode == 'dark' ? style.darkSubTitle : style.subTitle,
            style.bold,
          ]}
          numberOfLines={1}>
          {subTitle}
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
});
