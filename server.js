
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 9000
require("dotenv").config()
const uri = process.env.MONGODB_URI

// ... other imports 
const path = require("path")

// every request (middleware)
app.use(express.json())
app.use(morgan('dev'))
// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// connect to database
mongoose.connect(uri, () => console.log('connected thru mongodb'))

// mongoose.connect('mongodb://localhost:27017/bounties',
// () => console.log('Connected to the database.') 
// )

// different routes
app.use('/', require('./routes/homeInfo'))
// app.use('/bounty', require('./routes/bounty'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Running on ${port}`)
})