const express = require('express')

const postsRouter = require('./posts/posts-router')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Posts API</h2>
    <h4>Welcome to Lambda Posts API</h4>
    `)
})

server.use('/api/posts', postsRouter)

server.listen(5000, () => {
    console.log('Server running on 5000')
})
