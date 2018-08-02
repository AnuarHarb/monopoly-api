'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').load();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const services = require('./services');

app.get('/players', services.getPlayers);
app.post('/players', services.newPlayer);

app
  .listen(PORT, () => console.log(`Ready to play Monopoly in PORT ${ PORT } !!`));
