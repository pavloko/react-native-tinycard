import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Tinycard from 'react-native-tinycard'

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Tinycard
          word={'hello'}
          translation={'goodbye'}
          onContinue={() => {console.log('onContinue')}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  }
})
