[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![npm version](https://badge.fury.io/js/react-native-tinycard.svg)](https://badge.fury.io/js/react-native-deck-swiper)

### Card component inspired by [Tinycards](https://tinycards.duolingo.com/)
![](https://github.com/pavloko/react-native-tinycard/blob/master/screenshots/react-native-tinycard.gif)

### Dependencies
1. [react-native-flip-card](https://github.com/moschan/react-native-flip-card)

### Installation
1. `yarn add react-native-tinycard`

### Usage
```
import React, {Component} from 'react'
import {View} from 'react-native'
import Tinycard from 'react-native-tinycard'

class App extends Component {
    render() {
        <View>
            <Tinycard
                word={'book'}
                translation={'libra'}
                onContinue={() => console.log('Card is flipped!')}
            />
        </View>
    }
}
```
