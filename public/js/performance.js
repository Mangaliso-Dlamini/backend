async function fetchData() {
    const id = document.getElementById('id').textContent
    console.log(id)
    const response = await fetch(`/api/performance/${id}`);
    const data = await response.json();
    console.log(data)
    return data;
}

function prepareChartData(metrics) {
    const years = [];
    const minutesPerGoal = [];
    const shotAccuracy = [];
    const passAccuracy = [];
    const tackleWinRate = [];

    const sortedMetrics = Object.entries(metrics)
        .sort(([yearA], [yearB]) => yearA - yearB);

    sortedMetrics.forEach(([year, data]) => {
        years.push(year);

        const goals = data.goals || 0;
        const minutes = data.minutes || 0;
        const shotsOnTarget = data.shots ? data.shots.on_target || 0 : 0;
        const shotsOffTarget = data.shots ? data.shots.off_target || 0 : 0;
        const totalShots = shotsOnTarget + shotsOffTarget;
        const passesAttempted = data.passes ? data.passes.attempted || 0 : 0;
        const passesCompleted = data.passes ? data.passes.completed || 0 : 0;
        const tacklesAttempted = data.tackles ? data.tackles.attempted || 0 : 0;
        const tacklesWon = data.tackles ? data.tackles.won || 0 : 0;

        minutesPerGoal.push(goals > 0 ? minutes / goals : 0);
        shotAccuracy.push(totalShots > 0 ? (shotsOnTarget / totalShots) * 100 : 0);
        passAccuracy.push(passesAttempted > 0 ? (passesCompleted / passesAttempted) * 100 : 0);
        tackleWinRate.push(tacklesAttempted > 0 ? (tacklesWon / tacklesAttempted) * 100 : 0);
    });

    return {
        years,
        minutesPerGoal,
        shotAccuracy,
        passAccuracy,
        tackleWinRate
    };
}

async function createCharts() {
    const metrics = await fetchData();
    const { years, minutesPerGoal, shotAccuracy, passAccuracy, tackleWinRate } = prepareChartData(metrics);

    const ctx1 = document.getElementById('minutesPerGoalChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Minutes per Goal',
                data: minutesPerGoal,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Historical Minutes per Goal Ratio',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Minutes per Goal',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById('shotAccuracyChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Shot Accuracy (%)',
                data: shotAccuracy,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Historical Shot Accuracy (%)',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Shot Accuracy (%)',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    const ctx3 = document.getElementById('passAccuracyChart').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Pass Accuracy (%)',
                data: passAccuracy,
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Historical Pass Accuracy (%)',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Pass Accuracy (%)',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    const ctx4 = document.getElementById('tackleWinRateChart').getContext('2d');
    new Chart(ctx4, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Tackle Win Rate (%)',
                data: tackleWinRate,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Historical Tackle Win Rate (%)',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tackle Win Rate (%)',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });
}

createCharts();
