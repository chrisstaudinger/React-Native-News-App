import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { View, Text, StyleSheet, FlatList, Image, Linking, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'

const source = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'

const NewsArticles = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    if (!articles) fetchArticles()
  })

  const fetchArticles = () => {
    setIsFetching(true)
    axios.get(`http://${source}:5000/`).then(res => {
      return res.data
    }).then(data => {
      setIsFetching(false)
      setArticles(data.articles)
     })
  }

  return (
    <FlatList
      data={articles}
      style={styles.container}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Article article={item} />}
      onRefresh={fetchArticles}
      refreshing={isFetching}
    />
  )
}

const Article = ({ article }) => {
  const goToArticle = () => Linking.openURL(article.url)

  return (
    <TouchableWithoutFeedback onPress={goToArticle}>
      <View style={styles.articleContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Image style={styles.image} source={{uri: article.urlToImage}} />
        {Boolean(article.description) && <Text style={styles.description}>{article.description}</Text>}
        <View style={styles.authorAndPublishContainer}>
          { article.author && (
            <>
              <Text style={styles.text}>{article.author}</Text>
              <Text style={styles.separator}>{"\u00B7"}</Text>
            </>
          )}
          <Text style={styles.text}>{ moment(article.publishedAt).format('MMM DD, YYYY')}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
)}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  articleContainer: {
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24
  },
  image: {
    flex: 1,
    marginTop: 28,
    height: 120,
    marginBottom: 24,
  },
  description: {
    marginBottom: 12,
    fontSize: 12,
    color: '#333'
  },
  authorAndPublishContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  separator: {
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    color: '#333'
  }
})

export default NewsArticles