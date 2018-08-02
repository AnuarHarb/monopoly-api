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

module.exports = {getPlayers};
