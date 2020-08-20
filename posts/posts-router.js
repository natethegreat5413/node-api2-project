const router = require('express').Router()

const db = require('../data/db')

// get all posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json({ posts })
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
})

// get post by id  
router.get('/:id', (req, res) => {
    
    db.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json({post})
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

// get comments on specific post
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(comments => {
            if(comments){
                res.status(200).json({comments})
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

// create a Post
router.post('/', (req, res) => {
    const post = req.body;
    db.insert(post)

    .then(post => {
        if(post){
            res.status(201).json(post)
        }else{
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

// create a comment for a specific post
router.post('/:id/comments', (req, res) => {
    const comment = req.body;
    db.insertComment(comment)

    .then(add => {
        if(add){
            res.status(201).json({ add })
        }else if(!add){
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    
    .then(post => {
        if(post){
            res.status(200).json({ post })
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    db.update(req.params.id, changes)
    
    .then(post => {
        if(post){
        res.status(200).json(post)
       }else{
           res.status(404).json({ message: "The post with the specified ID does not exist." })
       } 
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})


module.exports = router

