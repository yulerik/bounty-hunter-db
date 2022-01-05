const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Bounty blueprint
const bountySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    living: {
        type: Boolean,
        required: true
    },
    bountyAmount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['jedi', 'sith'],
        required: true
    }
})

const bountyModel = mongoose.model("Bounty", bountySchema)

module.exports = bountyModel