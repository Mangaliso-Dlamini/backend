const Player = require('../models/Player');

async function getAllPlayersWithTeamName() {
  try {
    const players = await Player.find({})
      .populate('team', 'name') 
      .exec();

    return players;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {getAllPlayersWithTeamName}
