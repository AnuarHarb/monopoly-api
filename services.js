'use strict';

const fs = require('fs'); //file sistem

Array.prototype.clean = function() {
  var newArray = new Array();
  for(const item of this){
    if(item) {
      newArray.push(item);
    }
  }
    return newArray;
   };

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

const getSinglePlayer = (request, response) => {
  const playerId = Number(request.params.id);
  let players = [];
  try {
    const file = fs.readFileSync('data/db.json');
    const fileJson = JSON.parse(file);
    players = fileJson.game.players;
    const singlePlayer = players.map(player => {
      if (player.id === playerId) {
        return player;
      }
    });
    response.status(200).send(singlePlayer.clean());
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

const getTiles = (request, response) => {
  let tiles = [];
  try {
    const file = fs.readFileSync('data/db.json');
    const fileJson = JSON.parse(file);
    tiles = fileJson.static.tiles;
    response.status(200).send(tiles);
  } catch (error) {
    response.status(500).send('Error, mueres');
  }
}

const getSingleTile = (request, response) => {
  const tileId = Number(request.params.id);
  let tiles = [];
  try {
    const file = fs.readFileSync('data/db.json');
    const fileJson = JSON.parse(file);
    tiles = fileJson.static.tiles;
    const singleTiles = tiles.map(tile => {
      if (tile.id === tileId) {
        return tile;
      }
    });
    response.status(200).send(singleTiles.clean());
  } catch (error) {
    console.log(error);
    response.status(500).send('Error, mueres');
  }
}

const getFortune = (request, response) => {
  let fortune = [];
  try {
    const file = fs.readFileSync('data/db.json');
    const fileJson = JSON.parse(file);
    fortune = fileJson.static.fortune;
    response.status(200).send(fortune);
  } catch (error) {
    response.status(500).send('Error, mueres');
  }
}

const getArc = (request, response) => {
  let arc = [];
  try {
    const file = fs.readFileSync('data/db.json');
    const fileJson = JSON.parse(file);
    arc = fileJson.static.arc;
    response.status(200).send(arc);
  } catch (error) {
    response.status(500).send('Error, mueres');
  }
}

module.exports = {getPlayers, newPlayer, getTiles, getFortune, getArc, getSinglePlayer, getSingleTile};
