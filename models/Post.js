const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    loc: {
        coordinates: [Number],
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)