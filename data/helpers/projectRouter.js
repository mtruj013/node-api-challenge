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

  
})

router.post('/', (req,res)=> {

})

router.put('/:id', (req,res) => {

})

router.delete('/:id', (req,res)=> {

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
    


}

function validateAction(req,res,next){

}

module.exports = router;