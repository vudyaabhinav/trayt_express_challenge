const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
  verifyToken,
} = require('./helperFunctions')
const jwtSecretKey = require('./config')

const LISTENING_PORT = 9000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/recommendations', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecretKey, (err, authData) => {
    if(err) {
      res.sendStatus(403)
    }
    else {
      console.log('user id', authData.userId)
      res.sendStatus(200)
    }
  })
})

const server = app.listen(LISTENING_PORT, function () {
  console.log(`Server is listening on ${LISTENING_PORT}`)
})
