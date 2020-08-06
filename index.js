require('dotenv').config()

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

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})
