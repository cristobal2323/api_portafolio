'use strict'

const Stack = require('../models/stack')

function getStack (req, res) {
  let stackId = req.params.stackId

  Stack.findById(stackId, (err, stack) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!stack) return res.status(404).send({message: `El Stack no existe`})

    res.status(200).send({ stack })
  })
}

function getStacks (req, res) {
  const query = {};

  if (req.params.name !== 'null') {
    query.name = { $regex: `.*${req.params.name}.*`, $options:'i' };
  }
  const skip = parseInt(req.params.skip, 10);
  const limit = parseInt(req.params.limit, 10);

  Stack.find(query, (err, stacks) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    if (!stacks) return res.status(404).send({ message: 'No existe stack' });

    return res.status(200).send({ stacks });
  }).skip(skip).limit(limit);
}

function saveStack (req, res) {

  let stack = new Stack()
  
  stack.name = req.body.name
  stack.value = req.body.value

  stack.save().then((stackStored)=>{
    res.status(200).send({ stack: stackStored })
  },(err)=>{
    res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
  })

}

function updateStack (req, res) {
  let stackId = req.params.stackId
  let update = req.body

  Stack.findByIdAndUpdate(stackId, update, (err, stackUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el stack: ${err}`})

    res.status(200).send({ stack: stackUpdated })
  })
}

function deleteStack (req, res) {
  let stackId = req.params.stackId

  Stack.findById(stackId, (err, stack) => {
    if (err) res.status(500).send({message: `Error al borrar el stack: ${err}`})

    stack.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el stack ${err}`})
      res.status(200).send({message: 'El stack ha sido eliminado'})
    })
  })
}

module.exports = {
  getStack,
  getStacks,
  saveStack,
  updateStack,
  deleteStack
}
