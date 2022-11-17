import React from 'react';
import {List} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';

const Home = props => {
  return (
    <View styles={{flex: 1}}>
      <FlatList
        data={props?.data}
        renderItem={({item, index}) => {
          return (
            <List.Accordion
              title={item?.title}
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item title={item?.subTitle} onPress={props?.onPress} />
            </List.Accordion>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
