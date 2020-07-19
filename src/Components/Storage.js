import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log("getData result:",value,key);
    return value;
  } catch(e) {
    Alert("alert",e);
  }
}

export const storeSearch = async (value, key) => {
  try {
    const jsonVal = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonVal);
    console.log("data saved: ", jsonVal, key);
  } catch (e) {
    Alert("error saving entry: ", e);
  }
}

export const clearList = async(key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch(e) {
    Alert("alert:", e);
  }
  console.log("List cleared:",key);
}

export function updateList(inputText,key) {
  //ignore empty search requests
  if (inputText == "") {
    console.log("ignoring empty search request");
    return;
  }
  // get previous search requests
  getData(key)
  // then add the new search request
  .then(result => {
    // if the search request list is not empty,
    // append and store the list again
    if (result !== null) {
      var data = JSON.parse(result);
      data.push(inputText);
      storeSearch(data,key);
    }
    // otherwise start the list!
    else {
      storeSearch([inputText],key);
    }
  })
  .catch(e => Alert("error: ", e));
}