import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from './components/Header'
import NewsArticles from './components/Article'

const App = () => {
  return (
    <View style={styles.container}>
      <Header title='News App' />
      <NewsArticles />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center'
  }
})

export default App