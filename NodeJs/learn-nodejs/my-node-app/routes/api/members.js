const express = require('express')
const router = express.Router();
const members = require('../../Members')

router.get('/', (req, res) => {
    res.json(members);
  })
  
router.get('/:id', (req, res) => {
    const found = members.some( member => member.id === parseInt(req.params.id))
    if(found){
      res.json(members.filter(m => m.id === parseInt(req.params.id)))
    } else{
      res.status(404).json({msg: `No member with the id of ${req.params.id}`})
    }
})

router.post('/', (req, res) => {
    const newMember = {
        id: members.length + 1, 
        ...req.body
    }
    members.push(newMember)
    res.send(members);
})

module.exports = router