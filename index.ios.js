import React, { Component } from 'react';
import Card from './components/card';
import {
  AppRegistry,
  PanResponder,
  StyleSheet,
  Animated,
  Text,
  View
} from 'react-native';

export default class cardswiper extends Component {
  render() {
    return (
      <View style={styles.container}>
          {Array.from(Array(6).keys()).map((i)=> {
              return <Card key={i} number={i}/>
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    backgroundColor: 'purple'
 }
});

AppRegistry.registerComponent('cardswiper', () => cardswiper);
