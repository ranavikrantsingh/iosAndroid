import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Colors from '../../../constants/Colors';
const Chat = ({title, description, photo, time}) => {
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  return (
    <View style={mode == 'dark' ? style.darkrow : style.row}>
      <Image source={{uri: photo}} style={style.photo} />
      <View style={style.mailText}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={mode == 'dark' ? style.darkTitle : style.title}>
            {title}
          </Text>
          <Text style={[style.subTitle, {fontSize: 12}]}>{time}</Text>
        </View>

        <Text style={[style.subTitle]} numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default Chat;

const style = StyleSheet.create({
  darkrow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.darkMode,
    overflow: 'hidden',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: '100%',
  },
  mailText: {
    marginLeft: 15,
    width: '80%',
  },

  darkTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 13,
    color: 'gray',
  },
  photo: {width: 45, height: 45, borderRadius: 30},
});
