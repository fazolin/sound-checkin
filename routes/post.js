const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.post('/post', async(req, res) => {
    const post = await new Post({
        loc: {
            coordinates: [req.body.lat, req.body.lon]
        }
    })

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({
                message: err
            })
        })

})

module.exports = router