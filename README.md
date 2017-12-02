### Card component inspired by [Tinycards](https://tinycards.duolingo.com/)

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

### License