
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 9000

// every request (middleware)
app.use(express.json())
app.use(morgan('dev'))
// connect to database

mongoose.connect("mongodb+srv://forrest:Juliette92@cluster0.ab21w.mongodb.net/bounty-hunter?retryWrites=true&w=majority", () => console.log('remote db connection'));

// mongoose.connect('mongodb://localhost:27017/bounties', 
// // {
// //     useNewUrlParser: true,
// //     // useUnitfiedTopology: true,
// //     useCreateIndex: true,
// //     useFindAndModify: false
// // },
// () => console.log('Connected to the database.') 
// )
// different routes
app.use('/', require('./routes/homeInfo'))
app.use('/bounty', require('./routes/bounty'))
// error handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// // ... other imports 
// const path = require("path")

// // ... other app.use middleware 
// app.use(express.static(path.join(__dirname, "client", "build")))

// // ...
// // Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });





app.listen(port, () => {
    console.log(`Running on ${port}`)
})