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
  Button
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class Home extends Component {
  constructor () {
    super();
    this.state = {
      searchText:"",
    };
  }

  updateSearchText(inputText) {
    this.setState( {
      searchText:inputText
    });
  }

  render() {
    return (
      // <StatusBar barStyle="dark-content" />
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
              />
              <Button
                style={{
                  flex:2,
                  padding:10
                }}
                title="Google Later"
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