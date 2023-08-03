const express = require('express');
const app = express();
const PORT = 3000;

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para validar métodos HTTP válidos
const validateMethod = (req, res, next) => {
  if (['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    next();
  } else {
    res.status(405).send('Método HTTP no permitido');
  }
};

app.use(express.json());
app.use(validateMethod);

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
