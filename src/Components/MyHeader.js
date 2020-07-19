import React, { Component } from 'react';
import { Header } from 'react-native-elements'

const MyHeader = props => {
  return (
    <Header
    backgroundColor='white'
      leftComponent={{
        icon:'menu',
        color: 'gray'
      }}
      // centerComponent={{
      //   text: props.title,
      //   style: { color: '#FFFFFF', fontWeight: 'bold' }
      // }}
      statusBarProps={{ barStyle: 'light-content' }}
    />
  )
}

export default MyHeader;