const express = require('express');
const router = express.Router();
const Projects = require('./projectModel.js');
const Actions = require('./actionModel.js')

router.get('/', (req,res)=> {
    //do something
    const id = req.params.id;

    Projects.get(id)
    .then(project => {
        res.status(200)
        .json(project)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not retrieve projects"})
    })
});

router.get('/:id', validateProjectId,(req, res) => {
    const id = req.params.id;
    
    Projects.get(id)
    .then(project => {
        res.status(200)
        .json(project)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not retrieve project"})
    })
})

router.get('/:id/actions', validateProjectId, (req,res) => {
    const id = req.params.id;

    Projects.getProjectActions(id)
    .then(actions => {
        res.status(200)
        .json(actions)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not find actions"})
    })

  
})

router.post('/', validateProject, (req,res)=> {
    Projects.insert(req.body)
    .then(project => {
        res.status(201)
        .json(project)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not add new project"})
    })
})

router.post('/:id/actions', validateProjectId, validateAction,(req,res) => {
    
    Actions.insert(req.body)
    .then(action => {
        res.status(200)
        .json(action)
    })
    .catch(error => {
        res.status(500)
        .json({error: "Unable to add action to project."})
    })
    
})

router.put('/:id', validateProject, (req,res) => {
    const id = req.params.id;

    Projects.update(id, req.body)
    .then(updates => {
        res.status(200)
        .json(updates)
    })
    .catch(error => {
        res.status(500)
        .json({error: "The project could not be updated"})
    })
})

router.delete('/:id', validateProjectId, (req,res)=> {

    const id = req.params.id;

    Projects.remove(id)
    .then(() => {
        res.status(204)
        .json({error: "Project deleted!"})
    })
    .catch(error => {
        res.status(500)
        .json({error: "Could not delete project"})
    })

})

//middleware

function validateProjectId(req,res,next){

    const id = req.params.id;

    Projects.get(id)
    .then(project => {
        if(project){
            next();
        }else {
            res.status(404)
            .json({error: "The project with the specified ID does not exist."})
        }
    })
    
}

function validateProject(req,res,next){
    const projectBody = req.body;

    if(Object.keys(projectBody).length === 0){
        res.status(400)
        .json({message: "missing project data"})
    } else if (!projectBody.name || !projectBody.description){
        res.status(400)
        .json({message: "Missing project name or description"})
    } else {
        next();
    }
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