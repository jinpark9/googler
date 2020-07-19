/**
 * Googler React Native App
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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
import 'react-native-gesture-handler';
import {
  Colors, Header,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import SearchResults from './SearchResults';
import History from './History';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class SearchNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: ''}}
          />
          <Stack.Screen
            name="SearchResults"
            component={SearchResults}
            options={{
              title: '',
            }}
          />
        </Stack.Navigator>
    );
  }
}

class App extends Component {
  constructor () {
    super();
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Splash">
          <Drawer.Screen name="Home" component={SearchNavigation} />
          <Drawer.Screen name="History" component={History} />
        </Drawer.Navigator>
      </NavigationContainer>
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

export default App;
