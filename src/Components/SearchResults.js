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
      ducky:true,
      searchEngine:""
    };
  }

  componentDidMount() {
    if (this.state.ducky) {
      this.setState({
        searchEngine:this.state.duckySearch
      });
    }
    else { 
      this.setState({
        searchEngine:this.state.regularSearch
      });
    }
  }

  render() {
    return (
      <View
        style={{flex:1}}
      >
        <Button
          style={{flex:1, paddingBottom:24}}
          title={this.state.googleButton}
          onPress={() => {
            this.setState( {
              searchEngine:this.state.regularSearch
            })
          }}
        />
      <WebView
        source={{
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
      
        
      </View>
    );
  }
}

export default SearchResults;