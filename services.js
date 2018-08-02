'use strict';

const fs = require('fs'); //file sistem

const getPlayers = (request, response) => {
  let players = [];
  try {
    const file = fs.readFileSync('data/db.json');
    const fileJson = JSON.parse(file);
    players = fileJson.game.players;
    response.status(200).send(players);
  } catch (error) {
    response.status(500).send('Error, mueres');
  }
}

const newPlayer = (request, response) => {
  const player = request.body;
  try {
    const file = fs.readFileSync('data/db.json');
    const jsonFile = JSON.parse(file);
    let players = jsonFile.game.players;
    const newId = players.length;
    if(newId > 6) {
      response.status(500).send('El numero máximo de jugadores es 6');
    }
    players.push({...player, newId});
    jsonFile.game.players = players;
    fs.writeFileSync('data/db.json', JSON.stringify(jsonFile));
    response.status(200).send(players);
  } catch(erro) {
    response.status(500).send('Hay un gaitto en el servidor y lo rompio');
  }
}

module.exports = {getPlayers, newPlayer};
