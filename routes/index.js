'use strict'

const express = require('express')
const personCtrl = require('../controllers/person')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

/* Person */
api.get('/person', personCtrl.getPeople)
api.get('/person/:personId', personCtrl.getPerson)
api.post('/person', personCtrl.savePerson)
api.put('/person/:personId', auth, personCtrl.updatePerson)
api.delete('/person/:personId', auth, personCtrl.deletePerson)

/*Login*/

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
