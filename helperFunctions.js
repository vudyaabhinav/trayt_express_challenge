// Don't modify this file

const { cloneDeep } = require('lodash')
const { users, ratedMovies, movies } = require('./fakeDB.json')

const moviesByDirector = {}
const moviesByGenre = {}

Object.values(movies).forEach((movie) => {
  const { id, director, geners } = movie
  if (moviesByDirector[director]) {
    moviesByDirector[director].push(id)
  } else {
    moviesByDirector[director] = [id]
  }

  geners.forEach((genre) => {
    if (moviesByGenre[genre]) {
      moviesByGenre[genre].push(id)
    } else {
      moviesByGenre[genre] = [id]
    }
  })
})

const userRecommendations = {}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function getRatedMovies(userId) {
  const user = users[userId]
  if (!user) throw new Error('User does not exist')
  await delay(100)
  return cloneDeep(ratedMovies[userId].map(({ id }) => movies[id]))
}

async function getRecommendationByDirector(director) {
  await delay(100)
  return cloneDeep(moviesByDirector[director].map((id) => movies[id]))
}

async function getRecommendationByGenre(genre) {
  await delay(100)
  return cloneDeep(moviesByGenre[genre].map((id) => movies[id]))
}

async function saveRecommendations(userId, recommendations) {
  const user = users[userId]
  if (!user) throw new Error('User does not exist')
  await delay(100)
  userRecommendations[userId] = cloneDeep(recommendations)
  return { message: 'Recommendations saved successfully' }
}

async function getSavedRecommendations(userId) {
  await delay(100)
  return cloneDeep(userRecommendations[userId])
}

module.exports = {
  getRatedMovies,
  getRecommendationByDirector,
  getRecommendationByGenre,
  saveRecommendations,
  getSavedRecommendations,
}
