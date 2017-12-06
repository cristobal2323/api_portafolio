'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const ProjectSchema = Schema({
  name: String,
  description: String,
  text: String,
  picture: String,
})

module.exports = mongoose.model('Project', ProjectSchema)
