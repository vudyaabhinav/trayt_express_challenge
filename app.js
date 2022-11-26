const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {
  saveRecommendations,
  getSavedRecommendations,
  verifyToken,
  getRecommendationsForUser,
} = require('./helperFunctions')
const jwtSecretKey = require('./config')

const LISTENING_PORT = 9000
const app = express()

app.use(cors())
app.use(express.json())


app.get('/recommendations', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecretKey, async (err, authData) => {
    if(err) {
      res.sendStatus(403)
    }
    else {
      const userId = authData.userId
      let recommendations = await getSavedRecommendations(userId)

      if (recommendations) {
        res.send({recommendation: recommendations})
      } else {
        recommendations = await getRecommendationsForUser(userId)
        await saveRecommendations(userId, recommendations)
        res.send({recommendation: recommendations})
      }
    }
  })
})

const server = app.listen(LISTENING_PORT, function () {
  console.log(`Server is listening on ${LISTENING_PORT}`)
})
