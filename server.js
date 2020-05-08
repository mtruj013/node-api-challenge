const express = require('express');
const projectRouter = require('./data/helpers/projectRouter.js');
const server = express();


server.use(express.json());
server.use(logger);

server.use('/api/projects', projectRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Node Sprint 1</h2>`)
})

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}], Requested method: ${req.method}, to Url:${req.url} from ${req.get('Origin')}`);

    next();
}

module.exports = server;