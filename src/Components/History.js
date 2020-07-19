import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';

import { getData, storeSearch } from './Home';

class History extends Component {
  constructor() {
    super();
    this.state = {
      searches:[],
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>hello world</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default History;