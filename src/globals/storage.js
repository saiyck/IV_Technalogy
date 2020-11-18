import AsyncStorage from '@react-native-community/async-storage';
import get from 'lodash/get';

const storageKey = 'dropnhost';

export const saveState = async (data) => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(data));
};

export const retrieveState = async () => {
  const data = await AsyncStorage.getItem(storageKey);
  return JSON.parse(data);
};

export const getKeyValue = async (keypath, defaultvalue) => {
  let data = await AsyncStorage.getItem(storageKey);
  data = JSON.parse(data);
  return get(data, keypath, defaultvalue);
};
