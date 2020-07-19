import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  // Text,
  TextInput,
  StatusBar,
  Image,
  Button,
  Alert
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import MyHeader from './MyHeader';

import { getData, storeSearch, clearList } from './Storage';

class Home extends Component {
  constructor () {
    super();
    this.state = {
      searchText:"",
      firstRequest:null,
    };
    this.saveSearchText = this.saveSearchText.bind(this);
  }

  updateSearchText(inputText) {
    this.setState( {
      searchText:inputText
    });
  }

  saveSearchText(inputText) {
    //ignore empty search requests
    if (inputText == "") {
      console.log("ignoring empty search request");
      return;
    }

    // get previous search requests
    getData('@searches_Key')
    // then add the new search request
    .then(result => {
      // if the search request list is not empty,
      // append and store the list again
      if (result !== null) {
        var data = JSON.parse(result);
        data.push(inputText);
        storeSearch(data,'@searches_Key');
      }
      // otherwise start the list!
      else {
        storeSearch([inputText],'@searches_Key');
      }
    })
    .catch(e => Alert("error: ", e));
    
    //clear the search bar
    this.setState({
      searchText:""
    });
  }

  getFirstSearchRequest() {
    getData('@searches_Key')
    .then(result => {
      if (result !== null) {
        var data = JSON.parse(result);
        if (data.length != 0) {
          this.setState({
            firstRequest: data.shift()
          });
          storeSearch(data,'@searches_Key');
          console.log("first search: ", this.state.firstRequest);
          this.props.navigation.navigate('SearchResults', {searchText: this.state.firstRequest});
        }
        else {
          console.log("you haven't had anything to google lately...");
        }
      }
      else {
        console.log("you haven't had anything to google lately...");
      }
    })
    .catch(e => Alert("error: ", e));
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <MyHeader navigation={this.props.navigation} />
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          {/* googler image */}
          <View>
            <Image
              style={{
                flex:1,
                width:null,
                height: 200
              }}
              source={require('../assets/google2.0.0.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.body}>
            <View>
              <TextInput
                style={{
                  height:60,
                  backgroundColor:'white',
                  color:'black',
                  borderColor:'black',
                  paddingLeft:20
                }}
                placeholder="enter your search text!"
                placeholderTextColor='black'
                onChangeText={input => this.updateSearchText(input)}
                value={this.state.searchText}
              />
            </View>
            <View style={styles.horizontalContainer}>
              <Button
                style={{
                  flex:2,
                  padding:10
                }}
                title="Google Now"
                onPress={() => {
                  if (this.state.searchText != "") {
                    this.props.navigation.navigate('SearchResults', {searchText: this.state.searchText})
                  }
                  else {
                    console.log("empty search field");
                  }
                }}
              />
              <Button
                style={{
                  flex:2,
                  padding:10
                }}
                title="Google Later"
                onPress={() => this.saveSearchText(this.state.searchText)}
              />
            </View>
            <View>
              <Button
                style={styles.horizontalContainer}
                title="What was I going to google?"
                onPress={() => {
                  this.getFirstSearchRequest();
                  
                }}
              />
            </View>
            <View>
              <Button
                style={styles.horizontalContainer}
                title="Clear search requests"
                onPress={() => clearList('@searches_Key')}
              />
            </View>
          </View>
        </ScrollView>     
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent:"space-evenly",
    marginTop: 32,
    paddingHorizontal: 24
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;