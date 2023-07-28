const express = require('express');
const listViewRouter = express.Router();
const tasks = require('./data'); 

listViewRouter.get('/completed-tasks', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});


listViewRouter.get('/incomplete-tasks', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;
