const express = require('express')
const homeInfo = express.Router()
const Bounty = require('../models/bounties')


homeInfo.route('/')
    .get((req, res, next) => {
        Bounty.find((error, bounty) => {
            if (error) {
                res.status(500)
                return next(error)
            }
            return res.status(200).send(bounty)
        })
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
homeInfo.route('/bounty')
    .get((req, res, next) => {
        Bounty.find((error, bounty) => {
            if (error) {
                res.status(500)
                return next(error)
            }
            return res.status(200).send(bounty)
        })
    })
    .post((req, res, next) => {
        const newBountyObj = new Bounty (req.body)
        newBountyObj.save(err => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(newBountyObj)
        })
    })
homeInfo.route('/bounty/:bountyId')
    .get((req, res, next) => {
        Bounty.findById(req.params.bountyId, (err, bounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bounty)            
        })
    })
    .delete((req, res, next) => {
        Bounty.findByIdAndRemove(req.params.bountyId, (error, bounty) => {
            if (error) {
                res.status(500)
                return next(error)
            }
            const response = {
                message: 'Bounty successfully deleted'
            }
            return res.status(200).send(response)
        })
    })
    .put((req, res, next) => {
        Bounty.findByIdAndUpdate(
            req.params.bountyId, 
            req.body, 
            {new:true},
            (err, bounty) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.send(bounty)
            }
        )
    })

module.exports = homeInfo