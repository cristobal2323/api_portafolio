'use strict'

const Person = require('../models/person')

function getPerson (req, res) {
  let personId = req.params.personId

  Person.findById(personId, (err, person) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!person) return res.status(404).send({message: `La persona no existe`})

    res.status(200).send({ person })
  })
}

function getPeople (req, res) {
  const query = {};

  if (req.params.name !== 'null') {
    query.name = { $regex: `.*${req.params.name}.*`, $options:'i' };
  }
  if (req.params.lastName !== 'null') {
    query.last_name = { $regex: `.*${req.params.lastName}.*`, $options:'i' };
  }
  if (req.params.mail !== 'null') {
    query.mail = { $regex: `.*${req.params.mail}.*`, $options:'i' };
  }
  const skip = parseInt(req.params.skip, 10);
  const limit = parseInt(req.params.limit, 10);
  Person.find(query, (err, people) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    if (!people) return res.status(404).send({ message: 'No existen personas' });

    return res.status(200).send({ people });
  }).skip(skip).limit(limit);
}

function savePerson (req, res) {

  let person = new Person()
  
  person.name = req.body.name
  person.last_name = req.body.last_name
  person.facebook = req.body.facebook
  person.linkedin = req.body.linkedin
  person.github = req.body.github
  person.twitter= req.body.twitter
  person.picture = req.body.picture
  person.description = req.body.description
  person.mail = req.body.mail
  person.user_id = req.body.user_id
  person.phone = req.body.phone

  person.save().then((personStored)=>{
    res.status(200).send({ person: personStored })
  },(err)=>{
    res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
  })

}

function updatePerson (req, res) {
  let personId = req.params.personId
  let update = req.body

  Person.findByIdAndUpdate(personId, update, (err, personUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar la persona: ${err}`})

    res.status(200).send({ person: personUpdated })
  })
}

function deletePerson (req, res) {
  let personId = req.params.personId

  Person.findById(personId, (err, person) => {
    if (err) res.status(500).send({message: `Error al borrar la persona: ${err}`})

    person.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar la persona ${err}`})
      res.status(200).send({message: 'La persona ha sido eliminado'})
    })
  })
}

module.exports = {
  getPerson,
  getPeople,
  savePerson,
  updatePerson,
  deletePerson
}
