'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const PersonSchema = Schema({
  name: String,
  last_name: String,
  phone: String,
  description: String,
  facebook: String,
  linkedin: String,
  github: String,
  twitter: String,
  picture: String,
  mail: String,
  user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Person', PersonSchema)
