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

const storeSearch = async (value) => {
  try {
    const jsonVal = JSON.stringify(value);
    await AsyncStorage.setItem('@searches_Key', jsonVal);
    console.log("data saved: ", jsonVal);
  } catch (e) {
    Alert("error saving entry: ", e);
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@searches_Key');
    console.log("get data value:",value);
    return value;
  } catch(e) {
    Alert("alert",e);
  }
}

class Home extends Component {
  constructor () {
    super();
    this.state = {
      searchText:"",
    };
    this.saveSearchText = this.saveSearchText.bind(this);
  }

  updateSearchText(inputText) {
    this.setState( {
      searchText:inputText
    });
  }

  saveSearchText(inputText) {
    //Not sure what's going on with whatever string is 
    //being fetched in getData()

    // get data string
    getData()
    .then(result => {
      console.log("promises?",result);
      var data = JSON.parse(result);
      data.push(inputText);
      console.log("data: ", data);
      storeSearch(data);
    });

    //stringify the list
    
    
    //set data string
    // var data = [];

    
    this.setState({
      searchText:""
    });
  }

  render() {
    return (
      <SafeAreaView>
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
                  height:null,
                  borderColor:'gray',
                  paddingLeft:20
                }}
                placeholder="enter your search text!"
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
                onPress={() => this.props.navigation.navigate('SearchResults')}
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