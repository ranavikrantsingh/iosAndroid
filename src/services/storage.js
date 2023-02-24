import AsyncStorage from '@react-native-community/async-storage';

const storeItem = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, value, callback);
  } catch (error) {
    console.error(error);
  }
};

const getItem = async (key, callback) => {
  try {
    return await AsyncStorage.getItem(key, callback);
  } catch (error) {
    console.error(error);
  }
};

export default { storeItem, getItem };
