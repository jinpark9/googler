import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from 'react-native';
import {
  ListItem
} from 'react-native-elements';

import { getData, storeSearch, clearList } from './Storage';
import { HISTORY_KEY } from './Home'
import MyHeader from './MyHeader';

class History extends Component {
  constructor() {
    super();
    this.state = {
      searches:[],
      uniqueVal:0
    }
    this.fillData = this.fillData.bind(this);
  }

  forceRemount() {
    this.setState({
      uniqueVal: uniqueVal+1
    })
  }

  fillData() {
    var DATA = [];
    getData(HISTORY_KEY)
    .then(result => {
      if (result !== null) {
        var histList = JSON.parse(result);
        if (histList.length != 0) {
          for (var i = 0; i < histList.length; i++) {
            DATA.push({
              id: String(i),
              title: histList[i]
            });
          }
        }
        else {
          console.log("history is empty");
        }
      }
      else {
        console.log("history is null");
      }
      console.log("DATA pre:", DATA);
      this.setState({
        searches: DATA
      })
      console.log("state DATA:", this.state.searches);
    })
    .catch(e => console.log("error copying history:", e));    
  }

  componentDidMount() {
    this.fillData();
  }

  render() {
    return (
      <SafeAreaView>
        <MyHeader navigation={this.props.navigation} />
        <View key={this.state.uniqueVal}>
          {
            this.state.searches.map((l,i) => (
              <ListItem
                key={i}
                title={l.title}
                bottomDivider
              />
            ))
          }
          <Button
            title="Clear History"
            onPress={() => {
              clearList(HISTORY_KEY);
              this.fillData();
            }}
          />
          <Button
            title="Refresh"
            onPress={() => {
              this.fillData();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


export default History;