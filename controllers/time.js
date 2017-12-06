'use strict'

const Time = require('../models/time')

function getTime (req, res) {
  let timeId = req.params.timeId

  Time.findById(timeId, (err, time) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!time) return res.status(404).send({message: `El Timeline no existe`})

    res.status(200).send({ time })
  })
}

function getTimes (req, res) {
  const query = {};

  if (req.params.name !== 'null') {
    query.name = { $regex: `.*${req.params.name}.*`, $options:'i' };
  }
  const skip = parseInt(req.params.skip, 10);
  const limit = parseInt(req.params.limit, 10);

  Time.find(query, (err, times) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    if (!times) return res.status(404).send({ message: 'No existe el timeline' });

    return res.status(200).send({ times });
  }).skip(skip).limit(limit);
}

function saveTime (req, res) {

  let time = new Time()

  time.name = req.body.name
  time.description = req.body.description
  time.text = req.body.text
  time.picture = req.body.picture

  time.save().then((timeStored)=>{
    res.status(200).send({ time: timeStored })
  },(err)=>{
    res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
  })

}

function updateTime (req, res) {
  let timeId = req.params.timeId
  let update = req.body

  Time.findByIdAndUpdate(timeId, update, (err, timeUpdate) => {
    if (err) res.status(500).send({message: `Error al actualizar el time: ${err}`})

    res.status(200).send({ time: timeUpdate })
  })
}

function deleteTime (req, res) {
  let timeId = req.params.timeId

  Time.findById(timeId, (err, time) => {
    if (err) res.status(500).send({message: `Error al borrar el time: ${err}`})

    time.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el timeline ${err}`})
      res.status(200).send({message: 'El Time ha sido eliminado'})
    })
  })
}

module.exports = {
  getTime,
  getTimes,
  saveTime,
  updateTime,
  deleteTime
}
