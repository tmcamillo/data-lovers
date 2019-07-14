const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request')
const functions = require('firebase-functions')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true }))

const API_URL = 'http://api.steampowered.com'

app.get('/news', (req, res) => {
    const options = {
        url: `${API_URL}/ISteamNews/GetNewsForApp/v0002/?appid=440&maxlength=350&format=json`
    }

    request.get(options)
        .on('response', (response) => {
            console.log(response.statusCode)
        })
        .pipe(res)
})


exports.app = functions.https.onRequest(app)


