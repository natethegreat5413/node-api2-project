// FINISHED!!

const router = require('express').Router()

const db = require('../data/db')

// const router = express.Router()

// GET A LIST OF POSTS
router.get('/', (req, res) => {
    db.find()
    .then(post => {
        res.status(200).json({post})
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

// GET A SPECIFIC POST
router.get('/:id', (req, res) => {
    let id = req.params.id
    db.findById(id)
    .then(post => {
        if(post) {
            res.status(200).json({post})
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})


// GET COMMENTS FROM SPECIFIC POST
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(comment => {
        if(!comment){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
            res.status(200).json({comment})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})


// CREATE A NEW POST
router.post('/', (req, res) => {
    db.insert(req.body)
    .then(post => {
        if(!post){
            res.status(404).json({ errorMessage: "Please provide title and contents for the post." })
        }else{
            res.status(201).json({post})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})


// CREATE A COMMENT
router.post('/:id/comments', (req, res) => {
    db.insertComment(req.body)
    .then(comment => {
        if(!comment){
            res.status(404).json({ errorMessage: "Please provide text for the comment." })
        }else{
            res.status(201).json({comment})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database." })
    })
})


// DELETE A POST
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
            res.status(204).end()
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed." })
    })
})


// EDIT A POST
router.put('/:id', (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
    .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else if(!req.body.title || !req.body.contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }else{
            res.status(200).json({post})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})



module.exports = router


