const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

const morgan = require('morgan')
app.use(morgan('dev'))

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  try {
    const apiKey = process.env.NEWSAPIKEY
    const newsEndpoint =`https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=${apiKey}` 
    
    const response = await axios.get(newsEndpoint)
    console.log(response.status)
    res.send(response.data)

  } catch (error) {
    console.log('ERRROR', error)
    res.status(500).send(error)
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening to PORT: ${PORT} 👍`))