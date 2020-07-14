const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    loc: {
        coordinates: [Number],
    },
    sound: {
        type: Buffer
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)