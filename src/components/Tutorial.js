import * as React from 'react'
import { Animated, Easing, StyleSheet, Text } from 'react-native'
import { getIntroductionCardWidth } from '../utils/responsive'

class Tutorial extends React.Component {
  hand = new Animated.Value(0)
  handSize = new Animated.Value(1.3)
  fadeOut = new Animated.Value(1)

  componentDidMount() {
    this.animateHand()
  }

  animateHand() {
    Animated.sequence([
      Animated.timing(this.handSize, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(this.hand, {
        toValue: 1,
        duration: 1250,
        easing: Easing.cubic,
        useNativeDriver: true
      }),
      Animated.timing(this.fadeOut, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      this.hand.setValue(0)
      this.handSize.setValue(1.2)
      this.fadeOut.setValue(1)
      this.animateHand()
    })
  }

  render() {
    const animatedStyles = {
      transform: [
        {scale: this.handSize},
        {
          rotate: this.hand.interpolate({
            inputRange: [0, 1],
            outputRange: ['-5deg', '0deg']
          })
        },
        {
          translateX: this.hand.interpolate({
            inputRange: [0, 1],
            outputRange: [0, getIntroductionCardWidth() * 0.75]
          })
        }
      ]
    }
    return (
      <Animated.View style={[styles.container, {opacity: this.fadeOut}]}>
        <Text>
          Study, then swipe!
        </Text>
        <Animated.View style={[styles.handMask, animatedStyles]}/>
        <Animated.Image
          style={[styles.hand, animatedStyles]}
          resizeMode="contain"
          source={require('../images/hand_cursor.png')}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: getIntroductionCardWidth(),
    height: 60,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hand: {
    top: 18,
    left: 22,
    width: 31,
    height: 31,
    position: 'absolute'
  },
  handMask: {
    top: 12,
    left: 38,
    width: 31,
    height: 50,
    position: 'absolute',
    borderRightWidth: 200,
    borderRightColor: '#FFF'
  }
})

export default Tutorial
