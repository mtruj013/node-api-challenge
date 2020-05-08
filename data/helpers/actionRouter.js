const express = require('express');
const router = express.Router();
const Projects = require('./projectModel.js');
const Actions = require('./actionModel.js')


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

router.put('/:id', validateActionId, validateAction, (req,res) => {
    
    const id = req.params.id;

    Actions.update(id, req.body)
    .then( updates => {
        res.status(200)
        .json(updates)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not update action"})
    })
})

router.delete('/:id', validateActionId, (req,res) => {
    const id = req.params.id;

    Actions.remove(id)
    .then(() => {
        res.status(204)
        .json({error: "Action deleted!"})
    })
    .catch( error => {
        res.status(500)
        .json({error: "Could not delete action."})
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


function validateAction(req,res,next){

    if (!req.body.project_id){
        res.status(400)
        .json({error: "Missing the project ID"})
    } else if(!req.body.description){
        res.status(400)
        .json({error: "Missing action description"})
    } else if(!req.body.notes){
        res.status(400)
        .json({error: "Missing action notes"})
    } else {
        next();
    }
}


module.exports = router;