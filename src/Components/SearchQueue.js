import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import MyHeader from './MyHeader';
import { getData, storeSearch, clearList } from './Storage';
import { SEARCHES_KEY } from './Home';

class SearchQueue extends Component {
  constructor() {
    super();
    this.state = {
      searchQueue: []
    }
  }

  componentDidMount() {
    this.getSearchQueue();
  }

  getSearchQueue() {
    getData(SEARCHES_KEY)
    .then(result => {
      if (result !== null) {
        var data = JSON.parse(result);
        if (data.length != 0) {
          var temp = [];
          for (var i = 0; i < data.length; i++) {
            temp.push({
              id: String(i),
              title: data[i]
            });
          }
          var tempMap = temp.map((item) => ({
            key: `item-${item.id}`,
            title: item.title,
          }));
          this.setState({
            searchQueue: tempMap
          })
          console.log("searchQueue for display:", this.state.searchQueue);
        }
        else {
          console.log("get data is empty", SEARCHES_KEY);
          this.setState({
            searchQueue: []
          });
        }
      }
      else {
        console.log("getData is null", SEARCHES_KEY);
        this.setState({
          searchQueue: []
        });
      }
    })
  }

  renderItem = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 40,
          backgroundColor: isActive ? "blue" : 'white',
          alignItems: "center",
          justifyContent: "center"
        }}
        onLongPress={drag}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize:18,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  extractStrings(data) {
    var temp = [];
    data.map(item => {
      console.log(item.title);
      temp.push(item.title);
    });
    console.log("temp strings:",temp);
    return temp;
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex:1 }}>
        <MyHeader navigation={this.props.navigation} />
        <View
          style={{ flex:1 }}>
          <DraggableFlatList
            data={this.state.searchQueue}
            renderItem={this.renderItem}
            keyExtractor={(item) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => {
              console.log("data:", data);
              console.log("state before:", this.state.searchQueue);
              this.setState({
                searchQueue: data
              });
              storeSearch(this.extractStrings(data),SEARCHES_KEY);
              console.log("state after:", this.state.searchQueue);
            }}
          />
          <Button
            title="Clear Search Queue"
            onPress={() => {
              clearList(SEARCHES_KEY);
              this.getSearchQueue();
            }}
          />
          <Button
            title="Update"
            onPress={() => {
              this.getSearchQueue();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchQueue;