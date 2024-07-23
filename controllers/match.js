const Match = require('../models/Match'); 

async function getNextScheduledMatch() {
  try {
    const nextMatch = await Match.findOne({ status: 'scheduled' })
      .sort({ date: 1 })
      .populate('homeTeam awayTeam')
      .exec();
    return nextMatch;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getLatestMatch() {
  try {
    const latestMatch = await Match.findOne({
      status: { $in: ['completed', 'ongoing'] }
    })
      .sort({ date: -1 })
      .populate('homeTeam awayTeam')
      .exec();
    return latestMatch;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

 async function getLastFiveCompletedMatches() {
  try {
    const matches = await Match.find({ status: 'completed' })
      .sort({ date: -1 })
      .limit(5)
      .populate('homeTeam awayTeam')
      .exec();
    return matches;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getNextFiveScheduledOrPostponedMatches() {
  try {
    const matches = await Match.find({ status: { $in: ['scheduled', 'postponed'] } })
      .sort({ date: 1 })
      .limit(5)
      .populate('homeTeam awayTeam')
      .exec();
    return matches;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllMatches() {
  try {
    const matches = await Match.find({})
      .populate('homeTeam awayTeam')
      .exec();

    const results = matches.filter(match => match.status === 'completed');
    const fixtures = matches.filter(match => match.status !== 'completed');

    return { results, fixtures };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getNextScheduledMatch,
  getLatestMatch,
  getLastFiveCompletedMatches,
  getNextFiveScheduledOrPostponedMatches,
  getAllMatches
};
