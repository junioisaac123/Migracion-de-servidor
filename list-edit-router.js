// list-edit-router.js
const express = require('express');
const listEditRouter = express.Router();
const tasks = require('./data'); // Importamos el array de tareas desde data.js

// Ruta para crear una nueva tarea (Solicitud POST)
listEditRouter.post('/create-task', (req, res) => {
  const { id, isCompleted, description } = req.body;

  // Validamos que se proporcionen todas las propiedades necesarias para crear una tarea
  if (!id || typeof isCompleted !== 'boolean' || !description) {
    return res.status(400).json({ error: 'Datos de tarea no válidos' });
  }

  // Creamos una nueva tarea y la agregamos al array de tareas
  const newTask = { id, isCompleted, description };
  tasks.push(newTask);

  res.json(newTask);
});

// Ruta para eliminar una tarea por su ID (Solicitud DELETE)
listEditRouter.delete('/delete-task/:id', (req, res) => {
  const taskId = req.params.id;

  // Buscamos la tarea en el array de tareas por su ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  // Si la tarea no se encuentra, enviamos un error
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Eliminamos la tarea del array de tareas
  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json(deletedTask);
});

// Ruta para actualizar una tarea por su ID (Solicitud UPDATE)
listEditRouter.put('/update-task/:id', (req, res) => {
  const taskId = req.params.id;
  const { isCompleted, description } = req.body;

  // Buscamos la tarea en el array de tareas por su ID
  const task = tasks.find(task => task.id === taskId);

  // Si la tarea no se encuentra, enviamos un error
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Actualizamos las propiedades de la tarea si se proporcionan en la solicitud
  if (typeof isCompleted === 'boolean') {
    task.isCompleted = isCompleted;
  }

  if (description) {
    task.description = description;
  }

  res.json(task);
});

module.exports = listEditRouter;
