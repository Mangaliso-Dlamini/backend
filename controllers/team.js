const Team = require('../models/Team');

async function getAllTeamsWithPlayerCount() {
  try {
    const teams = await Team.find({})
      .populate('players')
      .exec();

    const teamsWithPlayerCount = teams.map(team => ({
      ...team._doc,
      playerCount: team.players.length
    }));

    return teamsWithPlayerCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {getAllTeamsWithPlayerCount}
