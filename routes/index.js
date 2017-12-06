'use strict'

const express = require('express')

/* Controllers */
const personCtrl = require('../controllers/person')
const stackCtrl = require('../controllers/stack')
const timeCtrl = require('../controllers/time')
const projectCtrl = require('../controllers/project')
const userCtrl = require('../controllers/user')

/* Login */
const auth = require('../middlewares/auth')
const api = express.Router()

/* Person */
api.get('/person/:name/:lastName/:mail/:skip/:limit', personCtrl.getPeople)
api.get('/person/:personId', personCtrl.getPerson)
api.post('/person', personCtrl.savePerson)
api.put('/person/:personId', personCtrl.updatePerson)
api.delete('/person/:personId', personCtrl.deletePerson)

/* Stack */
api.get('/stack/:name/:skip/:limit', stackCtrl.getStacks)
api.get('/stack/:stackId', stackCtrl.getStack)
api.post('/stack', stackCtrl.saveStack)
api.put('/stack/:stackId', stackCtrl.updateStack)
api.delete('/stack/:stackId', stackCtrl.deleteStack)

/* Time */
api.get('/time/:name/:skip/:limit', timeCtrl.getTimes)
api.get('/time/:timeId', timeCtrl.getTime)
api.post('/time', timeCtrl.saveTime)
api.put('/time/:timeId', timeCtrl.updateTime)
api.delete('/time/:timeId', timeCtrl.deleteTime)

/* Project */
api.get('/project/:name/:skip/:limit', projectCtrl.getProjects)
api.get('/project/:projectId', projectCtrl.getProject)
api.post('/project', projectCtrl.saveProject)
api.put('/project/:projectId', projectCtrl.updateProject)
api.delete('/project/:projectId', projectCtrl.deleteProject)

/*Login*/

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
