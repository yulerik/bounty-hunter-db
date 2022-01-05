const express = require('express')
const homeInfo = express.Router()
const Bounty = require('../models/bounties')

homeInfo.route('/')
    .get((req, res) => {
        console.log('route to /bounty for bounty list')
        res.send('add endpoint /bounty to url parameter')
    })
homeInfo.get('/search', (req, res, next) => {
    const queryObj = req.query
    console.log(req.query)
    Bounty.find(queryObj, (error, bounties) => {
        if (error) {
            res.status(500)
            return next(error)
        }
        return res.status(200).send(bounties)
    })
})

module.exports = homeInfo