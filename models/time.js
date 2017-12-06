'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const TimeSchema = Schema({
  name: String,
  description: String,
  text: String,
  picture: String,
})

module.exports = mongoose.model('Time', TimeSchema)
