'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const StackSchema = Schema({
  name: String,
  value: { type: Number, min: 0, max: 100 },
})

module.exports = mongoose.model('Stack', StackSchema)
