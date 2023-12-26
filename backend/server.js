// attach env vars to the process
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
// attach any data on the request to the req object
app.use(express.json()) 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// grabs the routes attached to the router
// when we fire a request to this route, use this
app.use('/api/workouts', workoutRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })