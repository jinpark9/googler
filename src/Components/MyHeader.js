import React, { Component } from 'react';
import { Header } from 'react-native-elements';

const MyHeader = props => {
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
        color:'black',
        onPress: () => props.navigation.navigate('Home'),
      }}
      statusBarProps={{ barStyle: 'light-content' }}
    />
  )
}

export default MyHeader;