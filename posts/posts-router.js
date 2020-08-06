const express = require('express')

const Posts = require('../data/db')

const router = express.Router()


router.get('/', (req, res) => {

    const query = req.query;

    Posts.find(query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})

router.get('/:id', (req, res) => {

    Posts.findById(req.params.id)
        .then(post => {
            if (post){
                res.status(200).json(post)
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/:id/comments', (req, res) => {

    Posts.findPostComments(req.params.id)
        .then(comments => {
            if (comments) {
                res.status(200).json({comments})
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
     })   

router.post("/", (req, res) => {
    const post = req.body

    if(!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
        try {
            Posts.insert(post);
            res.status(201).json(post);
        } catch {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    }
})

router.post("/:id/comments", (req, res) => {
    const id = req.params.id
    console.log(req.params)
    const comment = { "text": req.body.text, "post_id": id}
    comment.post_id = Number(id)

    if (!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }else{
        Posts.findPostComments(req.params.id)
        .then(comments => {
            if(comments) {
                Posts.insertComment(comment)
                res.status(201).json(comment)
            }else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }
})

router.delete("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        Posts.remove(req.params.id)
        .then(() => {
            res.send(204)
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
    })
    .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})

router.put("/:id", (req, res) => {
    const update = req.body
    const id = req.params.id

    Posts.findById(id)
    .then(() => {
        if(!update.title || !update.contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }else{
            Posts.update(id, update)
            .then(() => {
                res.status(200).json(update)
            })
            .catch(error => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
        }
    })
    .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})



module.exports = router;