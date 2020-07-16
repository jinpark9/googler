import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: this.props.route.params.searchText,
      duckySearch:"https://duckduckgo.com/?q=!ducky+",
      regularSearch:"https://www.google.com/search?q=",
      duckyButton: "View Ducky Search",
      googleButton: "View Google Search Results",
      buttonText: "",
      ducky:true,
      searchEngine:"",
      loading:true
    };
  }

  componentDidMount() {
    this.setDuckySettings();
  }

  setDuckySettings() {
    if (this.state.ducky) {
      this.setState({
        searchEngine:this.state.duckySearch,
        buttonText: this.state.googleButton
      });
    }
    else { 
      this.setState({
        searchEngine:this.state.regularSearch,
        buttonText:this.state.duckyButton
      });
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Button
          style={{flex:1, paddingBottom:24}}
          title={this.state.buttonText}
          onPress={() => {
            this.setState({
              ducky: !this.state.ducky
            });
            this.setDuckySettings();
          }}
        />
        <WebView
          source={{
            uri: `${this.state.searchEngine}${this.state.searchText}`
          }}
          onLoadStart={() => (
            this.setState({
              loading: true
            })
          )}
          onLoad={() => (
            this.setState({
              loading: false
            })
          )}
        />

        {/* display loading spinner based on loading state */}
        {this.state.loading && (
          <ActivityIndicator
            color='black'
            size='large'
            style={{
              paddingBottom:300
            }}
          />
        )}
      </View>
    );
  }
}

export default SearchResults;