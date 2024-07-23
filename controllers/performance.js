const mongoose = require('mongoose');
const Performance = require('../models/Performance'); 

async function getPerformanceMetrics(playerId, year) {
  try {
    // Find performance data for the player and year
    const performance = await Performance.findOne({
      player: playerId, 
      'metrics': { $exists: true }
    }).exec();

    if (!performance) {
      throw new Error('No performance data found for the specified player and year.');
    }

    const metrics = performance.metrics.get(year.toString());

    if (!metrics) {
      throw new Error(`No metrics found for the year ${year}.`);
    }

    // Calculate metrics
    const minutesPerGoalRatio = metrics.goals > 0 ? metrics.minutes / metrics.goals : 0;
    const shotAccuracyRatio = metrics.shots.on_target + metrics.shots.off_target > 0
      ? (metrics.shots.on_target / (metrics.shots.on_target + metrics.shots.off_target)) * 100
      : 0;
    const passAccuracyRatio = metrics.passes.attempted > 0
      ? (metrics.passes.completed / metrics.passes.attempted) * 100
      : 0;
    const tackleWinPercent = metrics.tackles.attempted > 0
      ? (metrics.tackles.won / metrics.tackles.attempted) *100
      : 0;

    minutesPerGoal = parseFloat(minutesPerGoalRatio).toFixed(2);
    shotAccuracy = parseFloat(shotAccuracyRatio).toFixed(2);
    passAccuracy = parseFloat(shotAccuracyRatio).toFixed(2);
    tackleWinRate = parseFloat(tackleWinPercent).toFixed(2);

    return {
      minutesPerGoal,
      shotAccuracy,
      passAccuracy,
      tackleWinRate
    };
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    throw error;
  }
}
async function getOverallPerformanceMetrics(playerId) {
  try {
    // Find performance data for the player
    const performance = await Performance.findOne({
      player: playerId,
      'metrics': { $exists: true }
    }).exec();

    if (!performance) {
      throw new Error('No performance data found for the specified player.');
    }

    // Aggregate metrics across all years
    let totalGoals = 0;
    let totalMinutes = 0;
    let totalShotsOnTarget = 0;
    let totalShotsOffTarget = 0;
    let totalPassesAttempted = 0;
    let totalPassesCompleted = 0;
    let totalTacklesAttempted = 0;
    let totalTacklesWon =0;

    performance.metrics.forEach(metrics => {
      totalGoals += metrics.goals;
      totalMinutes += metrics.minutes;
      totalShotsOnTarget += metrics.shots.on_target;
      totalShotsOffTarget += metrics.shots.off_target;
      totalPassesAttempted += metrics.passes.attempted;
      totalPassesCompleted += metrics.passes.completed;
      totalTacklesAttempted += metrics.tackles.attempted;
      totalTacklesWon += metrics.tackles.won;
    });

    // Calculate overall ratios
    const minutesPerGoalRatio = totalGoals > 0 ? totalMinutes / totalGoals : 0;
    const totalShots = totalShotsOnTarget + totalShotsOffTarget;
    const shotAccuracyRatio = totalShots > 0 ? (totalShotsOnTarget / totalShots) * 100 : 0;
    const passAccuracyRatio = totalPassesAttempted > 0 ? (totalPassesCompleted / totalPassesAttempted) * 100 : 0;
    const tackleWinPercent = totalTacklesAttempted > 0 ? (totalTacklesWon / totalTacklesAttempted ) *100 : 0;


    minutesPerGoal = parseFloat(minutesPerGoalRatio).toFixed(2);
    shotAccuracy = parseFloat(shotAccuracyRatio).toFixed(2);
    passAccuracy = parseFloat(passAccuracyRatio).toFixed(2);
    tackleWinRate = parseFloat(tackleWinPercent).toFixed(2);

    return {
      minutesPerGoal,
      shotAccuracy,
      passAccuracy,
      tackleWinRate
    };
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    throw error;
  }
}

module.exports = {getPerformanceMetrics, getOverallPerformanceMetrics}