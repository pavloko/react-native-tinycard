[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![npm version](https://badge.fury.io/js/react-native-tinycard.svg)](https://badge.fury.io/js/react-native-tinycard)

### Card component inspired by [Tinycards](https://tinycards.duolingo.com/)
![](https://github.com/pavloko/react-native-tinycard/blob/master/screenshots/react-native-tinycard.gif "react-native-tinycard-screenshoty")

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
                onContinue={() => console.log('Swipped the card. Showing next!')}
            />
        </View>
    }
}
```

### Running the example project
1. Fork and clone the rope
2. `cd react-native-tinycard`
3. Install dependencies: `cd example && yarn`
4. Symlink the source code to get livesync: `npm link ../`
5. Run the project from main dir: `cd .. && yarn start`