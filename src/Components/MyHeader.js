import React, { Component } from 'react';
import { Header } from 'react-native-elements';
// import { useNavigation } from '@react-navigation/native';

const MyHeader = props => {
  // const navigation = useNavigation();
  return (
    <Header
    backgroundColor='white'
    style={{padding:8}}
      leftComponent={{
        icon:'menu',
        color: 'black',
        onPress: () => props.navigation.toggleDrawer(),
      }}
      rightComponent={{
        icon:'home',
        color:'black'
      }}
      statusBarProps={{ barStyle: 'light-content' }}
    />
  )
}

export default MyHeader;