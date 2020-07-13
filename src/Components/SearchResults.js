import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      searchText:"ohlone land"
    };
  }

  render() {
    return (
      <WebView
        source={{
          // uri: `https://www.google.com/search?q=${this.state.searchText}&btnI`
          uri: `https://duckduckgo.com/?q=!ducky+${this.state.searchText}`
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color='black'
            size='large'
            style={{
              paddingBottom:300
            }}
          />
        )}
      />
    );
  }
}

export default SearchResults;