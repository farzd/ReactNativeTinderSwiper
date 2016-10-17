/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  PanResponder,
  StyleSheet,
  Animated,
  Text,
  View
} from 'react-native';

export default class cardswiper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        pan: new Animated.ValueXY(),
        rotate: new Animated.Value(0)
      };
    }

  componentWillMount() {
      this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
            //    this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});

              // The guesture has started. Show visual feedback so the user knows
              // what is happening!

              // gestureState.{x,y}0 will be set to zero now
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),
            onPanResponderRelease: (evt, {vx, vy}) => {
                if (Math.abs(this.state.pan.x._value) > 150) {
                   if (vx > 0) {
                       Animated.decay(this.state.pan, {
                                  velocity: {x: 6, y: 2},
                                  deceleration: 0.98
                              }).start()
                   } else{
                       Animated.decay(this.state.pan, {
                                  velocity: {x: -6, y: 2},
                                  deceleration: 0.98
                              }).start()
                   }
               }
               else {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 7
                    }).start()
                }
            }
        });
  }

  render() {
      let { pan, rotate } = this.state;
      let spin = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
      let [translateX, translateY] = [pan.x, pan.y];
      let imageStyle = {transform: [{translateX}, {translateY}, {"rotate": spin}]};

    return (
      <View style={styles.container}>
          <Animated.View style={[styles.card, imageStyle]} {...this._panResponder.panHandlers}>
              <Text style={styles.cardText}>Card</Text>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  card: {
      height: 400,
      width: 300,
      backgroundColor: '#FFF',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  }
});

AppRegistry.registerComponent('cardswiper', () => cardswiper);
