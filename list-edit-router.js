const express = require('express');
const listEditRouter = express.Router();
const tasks = require('./data');

// Middleware para manejar errores en las solicitudes POST y PUT
function errorSolicitud(req, res, next) {
  if (req.method === 'POST' && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
  }

  if (req.method === 'POST') {
    const { id, description, isCompleted } = req.body;
    if (!id || !description || isCompleted === undefined) {
      return res.status(400).json({ error: 'La solicitud POST tiene información no válida o atributos faltantes' });
    }
  }

  if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
  }

  if (req.method === 'PUT') {
    const { description, isCompleted } = req.body;
    if (!description || isCompleted === undefined) {
      return res.status(400).json({ error: 'La solicitud PUT tiene información no válida o atributos faltantes' });
    }
  }
  next();
}

listEditRouter.post('/create-task', errorSolicitud, (req, res) => {
  const { id, description, isCompleted } = req.body;

  const newTask = { id, description, isCompleted };
  tasks.push(newTask);

  res.json(newTask);
});

listEditRouter.delete('/delete-task/:id', (req, res) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json(deletedTask);
});

listEditRouter.put('/update-task/:id', errorSolicitud, (req, res) => {
  const taskId = req.params.id;
  const { description, isCompleted } = req.body;

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (typeof isCompleted === 'boolean') {
    task.isCompleted = isCompleted;
  }

  if (description) {
    task.description = description;
  }

  res.json(task);
});

module.exports = listEditRouter;
