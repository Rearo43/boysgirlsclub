'use strict';

require('dotenv').config();

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Routes
app.get('/', handleHome);
app.get('/updates', handleUpdate);
app.use('*', handleNotFound);
app.use(handleError);

//////////////     Home Page
function handleHome(req, res) {
  res.render('public/index');
}

//////////////     Weekly Updates
function handleUpdate(req, res) {
  res.render('public/update');
}

//////////////////    Errors
function handleNotFound(req, res) {
  res.status(404).send('Route not found');
}

function handleError(error, res) {
  console.log(error);
  res.render('pages/error', { data: error.message, pgName: 'Error 404' });
}

////////////// Listen on Port, Start the server
client.connect(() => {
  app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
});
