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
  Person.find({}, (err, people) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!people) return res.status(404).send({message: 'No existen personas'})

    res.status(200).send({ people })
  })
}

function savePerson (req, res) {
  console.log("cuerpo",req.body)

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
