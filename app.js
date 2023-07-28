const express = require('express');
const app = express();
const PORT = 3000; 
app.use(express.json());


const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/tasks', listViewRouter); 
app.use('/tasks', listEditRouter); 


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
