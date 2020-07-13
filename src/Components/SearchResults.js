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
      searchText:"ohlone land",
      duckyText:"https://duckduckgo.com/?q=!ducky+",
      regularText:"https://www.google.com/search?q=",
      ducky:true,
      searchEngine:""
    };
  }

  componentDidMount() {
    if (this.state.ducky) {
      this.setState({
        searchEngine:this.state.duckyText
      });
    }
    else { 
      this.setState({
        searchEngine:this.state.regularText
      });
    }
  }

  render() {
    return (
      <WebView
        source={{
          // uri: `https://www.google.com/search?q=${this.state.searchText}`
          // uri: `https://duckduckgo.com/?q=${this.state.duckyText}${this.state.searchText}`
          uri: `${this.state.searchEngine}${this.state.searchText}`
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