import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = ({ title }) => {
  return(
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  }
})

export default Header