'use strict'

const Project = require('../models/project')

function getProject (req, res) {
  let projectId = req.params.projectId

  Project.findById(projectId, (err, project) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!project) return res.status(404).send({message: `El project no existe`})

    res.status(200).send({ project })
  })
}

function getProjects (req, res) {
  const query = {};

  if (req.params.name !== 'null') {
    query.name = { $regex: `.*${req.params.name}.*`, $options:'i' };
  }
  const skip = parseInt(req.params.skip, 10);
  const limit = parseInt(req.params.limit, 10);

  Project.find(query, (err, projects) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    if (!projects) return res.status(404).send({ message: 'No existe el project' });

    return res.status(200).send({ projects });
  }).skip(skip).limit(limit);
}

function saveProject (req, res) {

  let project = new Project()

  project.name = req.body.name
  project.description = req.body.description
  project.text = req.body.text
  project.picture = req.body.picture

  project.save().then((projectStored)=>{
    res.status(200).send({ time: projectStored })
  },(err)=>{
    res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
  })

}

function updateProject (req, res) {
  let projectId = req.params.projectId
  let update = req.body

  Project.findByIdAndUpdate(projectId, update, (err, projectUpdate) => {
    if (err) res.status(500).send({message: `Error al actualizar el project: ${err}`})

    res.status(200).send({ project: projectUpdate })
  })
}

function deleteProject (req, res) {
  let projectId = req.params.projectId

  Project.findById(projectId, (err, project) => {
    if (err) res.status(500).send({message: `Error al borrar el project: ${err}`})

    project.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el project ${err}`})
      res.status(200).send({message: 'El project ha sido eliminado'})
    })
  })
}

module.exports = {
  getProject,
  getProjects,
  saveProject,
  updateProject,
  deleteProject
}
