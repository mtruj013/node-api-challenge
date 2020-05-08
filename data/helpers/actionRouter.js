const express = require('express');
const router = express.Router();
const Projects = require('./projectModel.js');
const Actions = require('./actionModel.js')

// router.get('/', (req,res) => {
//     const id = req.params.id;

//     Actions.get(id)
//     .then( action => {
//         res.status(200)
//         .json(action)
//     })
//     .catch(error => {
//         res.status(500)
//         .json({error: "Could not get actions"})
//     })
// })

router.get('/:id', validateActionId, (req,res) => {
    const id = req.params.id;

    Actions.get(id)
    .then(action => {
        res.status(200)
        .json(action)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not get action"})
    })
})


//middleware
function validateActionId (req,res,next){
    const id = req.params.id;

    Actions.get(id)
    .then(action => {
        if(action){
            next();
        }
        else {
            res.status(404)
            .json({error: "The action with the specified ID does not exist."})
        }
    })
}


module.exports = router;