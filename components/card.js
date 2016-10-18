
import React, { Component } from 'react';
import {
  PanResponder,
  StyleSheet,
  Animated,
  Text
} from 'react-native';

export default class Card extends Component {
    constructor(props) {
      super(props);

      this.state = {
        pan: new Animated.ValueXY(),
        rotate: new Animated.Value(0),
        alive: true
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
                this.state.pan.setValue({x: 0, y: 0});
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),
            onPanResponderRelease: (evt, {vx, vy}) => {
                if (Math.abs(this.state.pan.x._value) > 120) {
                   if (vx > 0) {
                       Animated.decay(this.state.pan, {
                                  velocity: {x: 6, y: 2},
                                  deceleration: 0.98
                              }).start(() => {
                                  this.setState({alive: false});
                              })
                   } else{
                       Animated.decay(this.state.pan, {
                                  velocity: {x: -6, y: 2},
                                  deceleration: 0.98
                              }).start(() => {
                                  this.setState({alive: false});
                              })
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
      let { pan, rotate, alive } = this.state;
      let spin = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
      let [translateX, translateY] = [pan.x, pan.y];
      let imageStyle = {transform: [{translateX}, {translateY}, {"rotate": spin}]};

    return (
        alive ?
          <Animated.View style={[styles.card, imageStyle]} {...this._panResponder.panHandlers}>
              <Text style={styles.cardText}>Card {this.props.number}</Text>
          </Animated.View> : null
    );
  }
}

const styles = StyleSheet.create({
  card: {
      backgroundColor: '#FFF',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 300,
      height: 400,
      top: 70,
      left: 40,
      borderWidth: 2,
   borderColor: 'black',
  }
});
