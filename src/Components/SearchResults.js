import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native'
import { WebView } from 'react-native-webview'

class SearchResults extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <WebView
        source={{
          uri: 'https://www.google.com'
        }}
      />
      // <View>
      //   <Text>hello world</Text>
      // </View>
    );
  }
}

export default SearchResults;