import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import all_styles from '../styles/all_styles';
import {scale} from '../utils/scaling';
import Back from '../assets/svg/back_2.svg';
import moment from 'moment';
import LottieView from 'lottie-react-native';

const win = Dimensions.get('window');
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const WeeklyCalendarComponent = props => {
  const [days, setDays] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const handleOnDatePress = date => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedDate(date);
  };

  return (
    <>
      <View style={styles.root}>
        <Text style={styles?.boldBlueText14}>
          Cleaning Status Update
          </Text>
        <View style={styles.row}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.changeMonth(moment(props.startDate).subtract(1, 'month'));
            }}>
            <View
              style={{
                paddingRight: scale(5),
                paddingBottom: scale(18),
              }}>
              <Back height={16} width={16} fill={'#000000'} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text
              style={[
                all_styles.span_14_m,
                {
                  color: '#000000',
                  paddingBottom: scale(18),
                },
              ]}>
              {moment(props.startDate).format('MMMM YYYY')}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              moment(props.startDate).isBefore(moment(), 'month')
                ? props.changeMonth(moment(props.startDate).add(1, 'month'))
                : null;
            }}>
            <View
              style={{
                paddingLeft: scale(10),
                paddingBottom: scale(18),
              }}>
              <Back
                height={16}
                width={16}
                fill={
                  moment(props.startDate).isBefore(moment(), 'month')
                    ? '#000000'
                    : '#00000050'
                }
                style={{transform: [{rotate: '180deg'}]}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {props.isFetchingCalender ? (
          <LottieView
            source={require('../assets/animations/chat-loader-2.json')}
            autoPlay
            autoSize
            style={{
              alignSelf: 'center',
            }}
          />
        ) : (
          <View>
            {props?.daysWithStatus?.length > 0 ? (
              <ScrollView horizontal={true} style={{}}>
                {props?.datesWithStatus && props?.datesWithStatus.length > 0
                  ? props?.datesWithStatus.map(i => {
                      return (
                        <TouchableWithoutFeedback
                          onPress={() => {
                            handleOnDatePress(i);
                          }}>
                          <View
                            style={
                              selectedDate && selectedDate?.date === i?.date
                                ? styles.selectedDate
                                : styles.date
                            }>
                            <View>
                              {i.status === 'Completed' ? (
                                <View
                                  style={[styles.indicator, {color: '#00BF93'}]}
                                />
                              ) : i.status === 'Incomplete' ||
                                i.status === 'Not Attempted' ||
                                i.status === 'Cleaner did not clean' ? (
                                <View
                                  style={[
                                    styles.indicator,
                                    {backgroundColor: '#f26868'},
                                  ]}
                                />
                              ) : i.status === 'Vehicle not available' ? (
                                <View
                                  style={[
                                    styles.indicator,
                                    {backgroundColor: '#0181E3'},
                                  ]}
                                />
                              ) : i.status === 'holiday' ? (
                                <View
                                  style={[
                                    styles.indicator,
                                    {backgroundColor: '#BFD3F2'},
                                  ]}
                                />
                              ) : i.status === 'Cleaner did not clean' ? (
                                <View
                                  style={[
                                    styles.indicator,
                                    {backgroundColor: '#0181E3'},
                                  ]}
                                />
                              ) : null}

                              <Text
                                style={
                                  selectedDate && selectedDate?.date === i?.date
                                    ? styles.selectedDateText
                                    : styles.dateText
                                }>
                                {moment(i?.date).format('DD')}
                              </Text>
                              <Text
                                style={
                                  selectedDate && selectedDate?.date === i?.date
                                    ? styles.selectedDayText
                                    : styles.dayText
                                }>
                                {days[moment(i.date).isoWeekday() - 1]}
                              </Text>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })
                  : null}
              </ScrollView>
            ) : (
              <View style={{alignItems: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                  <LottieView
                    source={require('../assets/animations/calendar.json')}
                    autoPlay
                    loop={false}
                    style={{
                      alignSelf: 'center',
                      height: scale(70),
                      width: scale(70),
                    }}
                  />
                  <Text style={[all_styles.span_14_b, {textAlign: 'center'}]}>
                    No Jobs available!
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
        
        <View
          style={{
            marginTop: scale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.line, {color: '#00BF93'}]}></View>
            <Text style={[all_styles.span_10_m, {color: '#000'}]}>Cleaned</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.line, {backgroundColor: '#f26868'}]}></View>
            <Text style={[all_styles.span_10_m, {color: '#000'}]}>
              Not cleaned
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.line, {backgroundColor: '#0181E3'}]}></View>
            <Text style={[all_styles.span_10_m, {color: '#000'}]}>
              No Vehicle
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.line, {backgroundColor: '#BFD3F2'}]}></View>
            <Text style={[all_styles.span_10_m, {color: '#000'}]}>Holiday</Text>
          </View>
        </View>
      </View>
      {selectedDate?.date && (
        <View style={styles?.requestPictureContainer}>
          <View style={styles?.rowWithSpaceBetween}>
            <View>
              <Text style={styles?.currentday}>
                {moment(selectedDate?.date).format('DD MMMM YYYY')}
              </Text>
              <Text style={styles?.boldText}>{selectedDate?.status}</Text>
            </View>
            {props?.isRequestingPicture ? (
                <Text style={styles?.blueText12}>Requested Already</Text>
              ) : (
                <TouchableOpacity
              onPress={
                props?.isRequestingPicture
                  ? null
                  : () => {
                      props?.requestPicture(selectedDate?.date);
                    }
              }>
              
                <Text style={styles?.redBold14}>Request Picture</Text>
            
            </TouchableOpacity>)

            }
            
          </View>
        </View>
      )}
    </>
  );
};

export default WeeklyCalendarComponent;

const styles = StyleSheet.create({
  root: {
    borderWidth: 2,
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    borderColor: '#F2F2F2',
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(6),
    // paddingTop: scale(6),
    paddingVertical: scale(6),
    marginRight: scale(10),
  },
  selectedDate: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(6),

    paddingVertical: scale(6),

    marginRight: scale(10),
    backgroundColor: '#00BF93',
    borderRadius: 5,
  },
  currentDate: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: scale(6),
    marginRight: scale(10),
    borderRadius: 5,
    paddingHorizontal: scale(6),
  },
  bottom: {
    backgroundColor: '#2A2E39',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: scale(4),
    paddingTop: 3,
    paddingBottom: 3,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  line: {
    height: scale(5),
    width: scale(12),
    backgroundColor: '#00BF93',
    borderRadius: 5,
    marginRight: scale(5),
  },
  indicator: {
    height: scale(4),
    width: scale(17),
    marginBottom: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00BF93',
    borderRadius: 5,
  },

  dateText: {
    color: '#000',
    fontSize: scale(22),
    fontFamily: 'honc-Medium',
  },
  selectedDateText: {
    color: '#fff',
    fontSize: scale(22),
    fontFamily: 'honc-Medium',
  },
  dayText: {
    color: '#000',
    fontSize: scale(12),
    textAlign: 'center',
    fontFamily: 'honc-Medium',
  },
  currentday: {
    color: '#000',
    fontSize: scale(12),
    fontFamily: 'honc-Medium',
  },
  selectedDayText: {
    color: '#fff',
    fontSize: scale(12),
    fontFamily: 'honc-Medium',
    textAlign: 'center',
  },
  requestPictureContainer: {
    backgroundColor: '#BFD3F24D',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  boldText: {
    color: '#000',
    fontSize: scale(15),
    fontFamily: 'honc-Bold',
    marginTop: scale(2),
  },
  rowWithSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  redBold14: {
    color: '#f26868',
    fontSize: scale(14),
    fontFamily: 'honc-Bold',
    textDecorationLine: 'underline',
  },
  blueText12: {
    color: '#0181E3',
    fontSize: scale(12),
    fontFamily: 'honc-Medium',
  },
  boldBlueText14:{
    color: '#496591',
    fontSize: scale(14),
    fontFamily: 'honc-Bold',
    marginVertical: scale(10),
  }
});
