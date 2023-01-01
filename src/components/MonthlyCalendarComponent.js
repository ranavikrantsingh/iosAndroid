import {
    FlatList,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {scale} from '../util/scaling';
  import Back from '../assets/icons/back_2.svg';
  import moment from 'moment';
  
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const CalendarComponent = props => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [calendar, setCalendar] = useState({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });
  
    const prevMonth = () => {
      if (calendar.month === 0) {
        setCalendar({
          month: 11,
          year: calendar.year - 1,
        });
      } else {
        setCalendar({
          month: calendar.month - 1,
          year: calendar.year,
        });
      }
    };
  
    const nextMonth = () => {
      if (calendar.month === 11) {
        setCalendar({
          month: 0,
          year: calendar.year + 1,
        });
      } else {
        setCalendar({
          month: calendar.month + 1,
          year: calendar.year,
        });
      }
    };
  
    const selectDate = (date, month, year) => {
      setSelectedDate(new Date(year, month, date));
    };
  
    const isSelected = (date, month, year) => {
      return (
        selectedDate.getDate() === date &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      );
    };
  
    const isCurrentMonth = (month, year) => {
      return calendar.month === month && calendar.year === year;
    };
  
    const isPrevMonth = (month, year) => {
      return calendar.month === 0 && month === 11 && calendar.year - 1 === year;
    };
  
    const isNextMonth = (month, year) => {
      return calendar.month === 11 && month === 0 && calendar.year + 1 === year;
    };
  
    const isWeekend = day => {
      return day === 0;
    };
  
    const isToday = (date, month, year) => {
      const today = new Date();
      return (
        today.getDate() === date &&
        today.getMonth() === month &&
        today.getFullYear() === year
      );
    };
  
    const renderHeader = () => {
      return (
        <View style={styles?.row_1}>
          <TouchableWithoutFeedback onPress={prevMonth}>
            <View style={styles?.back}>
              <Back
                height={scale(15)}
                fill={
                  calendar.month === 0 && calendar.year === 2020 ? '#fff' : '#000'
                }
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles?.row}>
            <Text style={styles?.month}>{months[calendar.month]}</Text>
            <Text style={styles?.year}>{calendar.year}</Text>
          </View>
          <TouchableWithoutFeedback onPress={nextMonth}>
            <View style={styles?.next}>
              <Back
                height={scale(15)}
                fill={
                  calendar.month === 11 && calendar.year === 2021
                    ? '#fff'
                    : '#000'
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    };
  
    const renderDays = () => {
      return (
        <View style={styles?.row}>
          {days.map(day => {
            return (
              <Text
                style={[
                  styles?.days,
                  isWeekend(days.indexOf(day)) && styles?.weekend,
                ]}
                key={day}>
                {day}
              </Text>
            );
          })}
        </View>
      );
    };
  
    useEffect(() => {
      const dates = [];
      const firstDay = new Date(calendar.year, calendar.month, 1);
      const lastDay = new Date(calendar.year, calendar.month + 1, 0);
      const firstDayIndex = firstDay.getDay();
      const lastDayDate = lastDay.getDate();
      const lastDayInPrevMonth = new Date(
        calendar.year,
        calendar.month,
        0,
      ).getDate();
      const prevMonth = calendar.month === 0 ? 11 : calendar.month - 1;
      const prevMonthYear =
        calendar.month === 0 ? calendar.year - 1 : calendar.year;
      const nextMonth = calendar.month === 11 ? 0 : calendar.month + 1;
      const nextMonthYear =
        calendar.month === 11 ? calendar.year + 1 : calendar.year;
      let day = 1;
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayIndex) {
            week.push({
              date: lastDayInPrevMonth - firstDayIndex + j + 1,
              month: prevMonth,
              year: prevMonthYear,
              selected: false,
              prevMonth: true,
            });
          } else if (day > lastDayDate) {
            week.push({
              date: day - lastDayDate,
              month: nextMonth,
              year: nextMonthYear,
              selected: false,
              nextMonth: true,
            });
            day++;
          } else {
            week.push({
              date: day,
              month: calendar.month,
              year: calendar.year,
              selected:
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === calendar.month &&
                selectedDate.getFullYear() === calendar.year,
              currentMonth: true,
            });
            day++;
          }
        }
        dates.push(week);
      }
      setDates(dates);
    }, [calendar, selectedDate]);
  
    return (
      <View style={styles?.margins}>
        <View>
          {renderHeader()}
          <View style={styles?.vertical}>{renderDays()}</View>
          <FlatList
            data={dates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles?.wrap}>
                  {item.map((date, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        // onPressIn={props.onPressIn}
                        onPress={() =>
                          selectDate(date.date, date.month, date.year)
                        }>
                        <View
                          style={[
                            styles?.daysWrap,
                            isSelected(date.date, date.month, date.year) &&
                            !isToday(date.date, date.month, date.year) &&
                            !isNextMonth(date.month, date.year)
                              ? styles?.selected
                              : {},
                            isToday(date.date, date.month, date.year) &&
                            !isSelected(date.date, date.month, date.year)
                              ? styles?.today
                              : {},
                            isCurrentMonth(date.month, date.year) &&
                            !isSelected(date.date, date.month, date.year)
                              ? styles?.currentMonth
                              : {},
                            date.prevMonth &&
                            !isSelected(date.date, date.month, date.year)
                              ? styles?.prevMonth
                              : {},
                            isNextMonth(date.month, date.year)
                              ? styles?.nextMonth
                              : {},
                          ]}>
                          <Text
                            style={[
                              styles?.days,
                              isSelected(date.date, date.month, date.year)
                                ? styles?.selectedText
                                : {},
                              isToday(date.date, date.month, date.year)
                                ? styles?.todayText
                                : {},
                              isCurrentMonth(date.month, date.year)
                                ? styles?.currentMonthText
                                : {},
                              date.prevMonth ? styles?.prevMonthText : {},
                              isNextMonth(date.month, date.year)
                                ? styles?.nextMonthText
                                : {},
                            ]}>
                            {date.date}
                          </Text>
                          <Text
                            style={[
                              styles?.days_1,
                              isSelected(date.date, date.month, date.year)
                                ? styles?.selectedText
                                : {},
                              isToday(date.date, date.month, date.year)
                                ? styles?.todayText
                                : {},
                              isCurrentMonth(date.month, date.year)
                                ? styles?.currentMonthText
                                : {},
                              date.prevMonth ? styles?.prevMonthText : {},
                              isNextMonth(date.month, date.year)
                                ? styles?.nextMonthText
                                : {},
                            ]}>
                            {moment(
                              `${date.year}-${date.month + 1}-${date.date}`,
                            ).format('ddd')}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              );
            }}
          />
          <View style={[styles?.wrap, styles?.vertical]}>
            <View style={styles?.row}>
              <View style={styles?.expiredSquare} />
              <Text style={styles?.days_1}>Expired</Text>
            </View>
            <View style={styles?.row}>
              <View style={styles?.availableSquare} />
              <Text style={styles?.days_1}>Available</Text>
            </View>
            <View style={styles?.row}>
              <View style={styles?.notAvailableSquare} />
              <Text style={styles?.days_1}>Not available</Text>
            </View>
            <View style={styles?.row}>
              <View style={styles?.holidaySquare} />
              <Text style={styles?.days_1}>Holiday</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  export default CalendarComponent;
  
  const styles = StyleSheet.create({
    margins: {},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    row_1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    days: {
      fontSize: scale(18),
      paddingVertical: scale(5),
      textAlign: 'center',
      color: '#2a2e39',
      fontFamily: 'honc-Medium',
    },
    days_1: {
      color: '#2a2e39',
      fontSize: scale(12),
      textAlign: 'center',
      fontFamily: 'honc-Medium',
    },
    month: {
      fontSize: scale(18),
      fontFamily: 'honc-Medium',
      color: '#000',
      marginHorizontal: scale(10),
    },
    year: {
      fontSize: scale(18),
      fontFamily: 'honc-Medium',
      color: '#000',
      marginHorizontal: scale(10),
    },
    next: {
      transform: [{rotate: '180deg'}],
    },
    daysWrap: {
      borderColor: '#fff',
      borderWidth: scale(1),
      width: scale(45),
      backgroundColor: '#fff',
      paddingVertical: scale(2),
      borderRadius: scale(5),
      marginVertical: scale(7),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    vertical: {
      marginVertical: scale(15),
    },
    expiredSquare: {
      backgroundColor: '#E6E6E6',
      borderColor: '#E6E6E6',
      marginRight: scale(5),
  
      height: scale(17),
      width: scale(17),
    },
    availableSquare: {
      backgroundColor: '#fff',
      borderColor: '#56BC96',
      borderWidth: scale(1),
      marginRight: scale(5),
      height: scale(17),
      width: scale(17),
    },
    holidaySquare: {
      backgroundColor: '#BFD3F2',
      borderColor: '#BFD3F2',
      height: scale(17),
      marginRight: scale(5),
  
      width: scale(17),
    },
    notAvailableSquare: {
      backgroundColor: '#FFB2B2',
      borderColor: '#FFB2B2',
      marginRight: scale(5),
  
      height: scale(17),
      width: scale(17),
    },
    today: {
      backgroundColor: '#fff',
      borderColor: 'purple',
      borderWidth: scale(1),
    },
    selected: {
      borderColor: '#ffb100',
      backgroundColor: '#ffb100',
      borderWidth: scale(1),
    },
    currentMonth: {
      backgroundColor: '#fff',
      borderWidth: scale(1),
    },
    prevMonth: {
      backgroundColor: '#E6E6E6',
      borderColor: '#E6E6E6',
      borderWidth: scale(1),
    },
    nextMonth: {
      backgroundColor: '#E6E6E6',
      borderColor: '#E6E6E6',
      borderWidth: scale(1),
    },
    selectedText: {
      color: '#fff',
    },
    todayText: {
      color: 'purple',
    },
    prevMonthText: {
      color: '#6D6D6D',
    },
    nextMonthText: {
      color: '#6D6D6D',
    },
    weekend: {
      color: '#FF0000',
    },
  });
  