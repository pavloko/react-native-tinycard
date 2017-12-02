import React from 'react'
import { StyleSheet, View, Text, Platform, Image, Animated } from 'react-native'
import {
  getIntroductionCardWidth,
  getIntroductionCardHeight,
  getIntroductionCardBorderRadius
} from '../utils/responsive'
import FlipCard from 'react-native-flip-card'

class Card extends React.Component {
  halo = new Animated.Value(0)
  enter = new Animated.Value(0.5)

  componentDidMount() {
    this.animateEntrance()
    if (this.props.image) {
      Image.prefetch(this.props.image)
    }
  }

  animateEntrance() {
    Animated.spring(this.enter, {
      toValue: 1,
      friction: 8
    }).start(({finished}) => {
      if (finished) {
        this.startHaloAnimation()
      }
    })
  }

  startHaloAnimation() {
    Animated.timing(this.halo, {
      toValue: 1,
      duration: 2000
    }).start(({finished}) => {
      if (finished) {
        this.halo.setValue(0)
        this.startHaloAnimation()
      }
    })
  }

  renderCardBackSide = () => {
    const {translation, image} = this.props
    if (image) {
      return <Image resizeMode="cover" style={styles.image} source={{uri: image}}/>
    }

    return <Text>{translation}</Text>
  }

  render() {
    const haloStyles = {
      position: 'absolute',
      width: getIntroductionCardWidth(),
      height: getIntroductionCardHeight(),
      borderRadius: getIntroductionCardBorderRadius(),
      opacity: this.halo.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      }),
      transform: [
        {
          scale: this.halo.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1.125]
          })
        }
      ],
      backgroundColor: this.halo.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(69,159,242)', 'white']
      })
    }

    return (
      <Animated.View>
        {this.props.showHalo && <Animated.View style={StyleSheet.flatten(haloStyles)}/>}
        <FlipCard
          friction={18}
          flipHorizontal
          useNativeDriver
          clickable={false}
          perspective={1000}
          flipVertical={false}
          flip={this.props.isFlipped}
          style={styles.flipContainer}
        >
          {/* Face Side */}
          <View style={StyleSheet.flatten([styles.cardShadow, styles.cardFace])}>
            <View style={styles.faceContent}>
              <Text>
                {this.props.word}
              </Text>
            </View>
          </View>
          {/* Back Side */}
          <View style={StyleSheet.flatten([styles.cardShadow, styles.cardBack])}>
            <View style={styles.backContent}>
              <Text>
                {this.renderCardBackSide()}
              </Text>
            </View>
            {Platform.OS === 'android' && <View style={styles.fixIntroCardImageClipping}/>}
          </View>
        </FlipCard>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: getIntroductionCardWidth() - 16 * 2, // Image should be smaller because cardSides have margin
    height: getIntroductionCardHeight() - 16 * 2,
    borderRadius: getIntroductionCardBorderRadius(),
    backgroundColor: '#FFF',
    padding: 16
  },
  flipContainer: {
    flex: 0,
    borderWidth: 0,
    width: getIntroductionCardWidth(),
    height: getIntroductionCardHeight()
  },
  cardShadow: {
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4.0,
        shadowOpacity: 0.2
      },
      android: {
        elevation: 2
      }
    })
  },
  cardFace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 8,
    borderRadius: getIntroductionCardBorderRadius()
  },
  cardBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 8,
    borderRadius: getIntroductionCardBorderRadius()
  },
  faceContent: {
    flexDirection: 'row'
  },
  backContent: {
    alignItems: 'center'
  },
  fixIntroCardImageClipping: {
    position: 'absolute',
    top: -getIntroductionCardBorderRadius(),
    bottom: -getIntroductionCardBorderRadius(),
    right: -getIntroductionCardBorderRadius(),
    left: -getIntroductionCardBorderRadius(),
    borderRadius: getIntroductionCardBorderRadius(),
    borderWidth: getIntroductionCardBorderRadius(),
    borderColor: '#F8F8F8'
  }
})

export default Card
