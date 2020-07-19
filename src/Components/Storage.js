import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("getData result:",value);
    return value;
  } catch(e) {
    Alert("alert",e);
  }
}

export const storeSearch = async (value) => {
  try {
    const jsonVal = JSON.stringify(value);
    await AsyncStorage.setItem('@searches_Key', jsonVal);
    console.log("data saved: ", jsonVal);
  } catch (e) {
    Alert("error saving entry: ", e);
  }
}

export const removeSearches = async() => {
  const key = '@searches_Key';
  try {
    await AsyncStorage.removeItem(key);
  } catch(e) {
    Alert("alert:", e);
  }
  console.log("Search requests cleared");
}