const express = require('express');
const router = express.Router();

router.get('/', (req,res)=> {
    //do something
});


router.get('/:id', (req, res) => {

})

router.get('/:id/actions', (req,res) => {

})

router.post('/', (req,res)=> {
    
})

router.put('/:id', (req,res) => {

})

router.delete('/:id', (req,res)=> {

})

//middleware

function validateProjectId(req,res,next){

}

module.exports = router;