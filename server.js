require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

const router = require('./routes/subroutes.js')
app.use('/subscribers', router)


app.listen(port, () => console.log("Server is Running"))
