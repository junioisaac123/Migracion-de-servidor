const express = require('express');
const listViewRouter = express.Router();
const tasks = require('./data');

// Middleware para gestionar parámetros correctos en las rutas
function validarParametros(req, res, next) {
  const { id } = req.params;

  // Verificar que el ID sea un número positivo
  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: 'El parámetro de ID debe ser un número positivo' });
  }

  next();
}

listViewRouter.get('/completed-tasks', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

listViewRouter.get('/incomplete-tasks', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

// Utilizar el middleware validarParametros para las rutas que contengan ":id"
listViewRouter.get('/task/:id', validarParametros, (req, res) => {
  const { id } = req.params;

  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(task);
});

module.exports = listViewRouter;
