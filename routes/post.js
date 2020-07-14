const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.post('/post', async(req, res) => {

    const post = await new Post({
        loc: {
            coordinates: [req.body.lat, req.body.lon]
        },
        sound: req.body.base64String
    })

    post.save()
        .then(data => {
            console.log('New post!')
            res.json(data);
        })
        .catch(err => {
            res.json({
                message: err
            })
        })

})

router.get('/posts', async(req, res) => {
    try {
        //User.findById("5580c79aa11e7310b2985ab1", function(error, user) { }
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }

})





module.exports = router