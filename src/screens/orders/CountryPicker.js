import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Countries from '../../constants/Countries';
import {TextInput} from 'react-native-paper';
import {scale} from '../../utils/scaling';
import all_styles from '../../styles/all_styles';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CountryPicker = props => {
  const [selectedCountryData, setSelectedCountryData] =
    useState('Selected Country');
  const searchRef = useRef();
  const [isSelected, setisSelected] = useState(false);
  const [data, setdata] = useState(Countries);
  const theme = useSelector(state => state.appReducer);
  const [mode, setMode] = useState(theme.mode);

  // Update the app Incase the theme mode changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);
  const onSearch = text => {
    if (text != '') {
      let temporaryData = data?.filter(item => {
        return item?.name?.toLowerCase().indexOf(text?.toLowerCase()) > -1;
      });
      setdata(temporaryData);
    } else {
      setdata(Countries);
    }
  };
  const handleDropDownAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); //for ease in and ease out animation
    setisSelected(!isSelected);
  };

  return (
    <View style={styles?.margins}>
      <TouchableOpacity onPress={handleDropDownAnimation}>
        <View
          style={
            mode == 'dark' ? styles.darkModeTextInput : styles.textInputStyle
          }>
          <Text
            style={
              mode == 'dark' ? styles.darkModebelowText : styles.belowText
            }>
            {selectedCountryData}
          </Text>
        </View>
      </TouchableOpacity>
      {isSelected ? (
        <View style={styles?.card}>
          <TextInput
            mode="outlined"
            theme={{
              colors: {
                primary: mode == 'dark' ? Colors.teal : Colors.teal,
                placeholder: mode == 'dark' ? Colors.teal : Colors.background,
                text: mode == 'dark' ? Colors.secondary : Colors.background,
                borderWidth: 1,
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
            style={
              mode == 'dark' ? styles.darkModeTextInput : styles.textInputStyle
            }
            placeholder="Search"
            onChangeText={text => onSearch(text)}
            ref={searchRef}
          />
          <FlatList
            data={data}
            ItemSeparatorComponent={() => {
              <View style={styles?.divder} />;
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCountryData(item?.name);
                    onSearch('');
                    handleDropDownAnimation();
                    searchRef?.current?.clear();
                  }}>
                  <View
                    style={{marginVertical: scale(10), marginHorizontal: 8}}>
                    <Text style={all_styles?.span_14_m}>{item?.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  margins: {
    marginHorizontal: scale(23),
    marginVertical: scale(10),
  },
  divder: {
    borderBottomWidth: StyleSheet?.hairlineWidth,
  },
  borders: {
    borderWidth: StyleSheet?.hairlineWidth,
    borderRadius: scale(5),
  },
  card: {
    height: '60%',
    elevation: 3,
    shadowColor:'#000'
  },
  darkModeTextInput: {
    height: scale(50),
    backgroundColor: 'transparent',
  },

  textInputStyle: {
    height: scale(50),
    backgroundColor: Colors.secondary,
  },
  darkModebelowText: {
    fontSize: scale(16),
    fontFamily: 'honc-Medium',
    color: '#fff',
    paddingBottom: scale(13),
  },
  belowText: {
    fontSize: scale(16),
    fontFamily: 'honc-Medium',
    color: '#000',
    paddingBottom: scale(13),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
});
