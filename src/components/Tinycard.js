import React from 'react'
import { Animated, PanResponder, StyleSheet, View } from 'react-native'
import Card from './Card'
import Tutorial from './Tutorial'

const VELOCITY_THRESHOLD = 0.5
const TUTORIAL_DISPLAY_DELAY = 3000

class Tinycard extends React.Component {
  pan = new Animated.ValueXY()
  isFlippedFirstTime = false
  timeoutId = null

  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false,
      isShowingTutorial: false,
      isShowingHalo: true
    }

    const mover = Animated.event([null, {dx: this.pan.x, dy: this.pan.y}])

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!this.isFlippedFirstTime) {
          this.timeoutId = setTimeout(() => {
            this.setState({isShowingTutorial: true})
          }, TUTORIAL_DISPLAY_DELAY)
        }
      },
      onPanResponderMove: (e, gestureState) => {
        if (!this.isFlippedFirstTime) {
          return
        }
        if (this.state.isShowingTutorial) {
          this.setState({isShowingTutorial: false})
        }
        clearTimeout(this.timeoutId)
        return mover(e, gestureState)
      },
      onPanResponderRelease: (e, {vx, vy, dx, dy}) => {
        if (!this.isFlippedFirstTime || (Math.abs(dx) <= 1 && Math.abs(dy) <= 1)) {
          this.setState({
            isFlipped: !this.state.isFlipped,
            isShowingHalo: false
          })
          this.isFlippedFirstTime = true
          return
        }
        const velocityVectorLength = Math.sqrt(vx * vx + vy * vy)
        if (velocityVectorLength > VELOCITY_THRESHOLD) {
          const x = vx / velocityVectorLength
          const y = vy / velocityVectorLength
          Animated.decay(this.pan, {
            velocity: {x, y}
          }).start()
        } else {
          Animated.spring(this.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  render() {
    const [translateX, translateY] = [this.pan.x, this.pan.y]
    const rotate = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg']
    })
    const animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}]}

    return (
      <View style={styles.container}>
        <Animated.View style={animatedCardStyles} {...this.panResponder.panHandlers}>
          <Card
            word={this.props.word}
            translation={this.props.translation}
            showHalo={this.state.isShowingHalo}
            isFlipped={this.state.isFlipped}
          />
        </Animated.View>
        <View style={styles.tutorialContainer}>
          {this.state.isShowingTutorial && <Tutorial/>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tutorialContainer: {
    height: 60 // Set fixed height to avoid jitter on render
  }
})

export default Tinycard
