// utils.js

// Import necessary modules
const fs = require('fs');
const { google } = require('googleapis');
const { youtubeAPIKey, youtubeChannelId, adminRoles } = require('./config');

// YouTube API Section
//----------------------------------------------------------

const youtube = google.youtube({ version: 'v3', auth: youtubeAPIKey });
const infoFile = 'data/text/info.txt';
const subscriberGoalFile = 'data/text/subscriber_goal.txt';
const memberGoalFile = 'data/text/member_goal.txt';
const scheduleFile = 'data/text/schedule.txt';

// Utility function to get the latest video from YouTube
const getLatestVideo = () => {
    const channelId = youtubeChannelId;

    return youtube.search.list({
        channelId,
        maxResults: 1,
        order: 'date',
        part: 'snippet',
        type: 'video',
    })
        .then((response) => {
            const video = response.data.items[0];
            const title = video.snippet.title;
            const videoId = video.id.videoId;
            return { title, videoId };
        })
        .catch((error) => {
            console.error('Error retrieving latest video:', error);
            throw error;
        });
};

// Utility function to get the total number of subscribers from YouTube
const getSubscriberCount = () => {
    return youtube.channels.list({
        id: youtubeChannelId,
        part: 'statistics',
    })
        .then((response) => {
            const subscriberCount = response.data.items[0].statistics.subscriberCount;
            return subscriberCount;
        })
        .catch((error) => {
            console.error('Error retrieving subscriber count:', error);
            throw error;
        });
};

// Utility function to get the content of info.txt
const getInfoText = () => {
    return readFile(infoFile)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error reading info.txt:', error);
            throw error;
        });
};

// Utility function to get the content of subscriber_goal.txt
const getSubscriberGoalText = () => {
    return readFile(subscriberGoalFile)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error reading subscriber_goal.txt:', error);
            throw error;
        });
};

// Utility function to get the content of member_goal.txt
const getMemberGoalText = () => {
    return readFile(memberGoalFile)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error reading member_goal.txt:', error);
            throw error;
        });
};

// Utility function to get the content of schedule.txt
const getScheduleText = () => {
    return readFile(scheduleFile)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error reading schedule.txt:', error);
            throw error;
        });
};

// Games API Section
//----------------------------------------------------------

const gamesFile = 'data/games.json';

// Function to read the games list from the JSON file
function readGamesFile() {
    if (!fs.existsSync(gamesFile)) {
        // If the file doesn't exist, create it with an empty array
        fs.writeFileSync(gamesFile, '[]', 'utf8');
    }

    const data = fs.readFileSync(gamesFile, 'utf8');
    return JSON.parse(data);
}

// Function to save the games list to the JSON file
function saveGamesToFile(games) {
    fs.writeFileSync(gamesFile, JSON.stringify(games, null, 2), 'utf8');
}

// Load games list from the JSON file
let gamesList = readGamesFile();

if (fs.existsSync(gamesFile)) {
    const data = fs.readFileSync(gamesFile, 'utf8');
    gamesList = JSON.parse(data);
}

// Add a game to the games list
function addGame(game) {
    // Check if the game already exists in the list
    if (gamesList.includes(game)) {
        return;
    }

    // Add the game to the list
    gamesList.push(game);

    // Save the updated list to the file
    saveGamesToFile(gamesList);
}

function removeGame(game) {
    // Check if the game exists in the list
    const index = gamesList.indexOf(game);
    if (index !== -1) {
        // Remove the game from the list
        gamesList.splice(index, 1);
        // Save the updated list to the file
        saveGamesToFile(gamesList);
        return true; // Indicate that the game was successfully removed
    }
    return false; // Indicate that the game was not found in the list
}

// RPS (Rock, Paper, Scissors) Functions
//----------------------------------------------------------

const rpsChoices = ['rock', 'paper', 'scissors'];
const scoresFile = 'data/scores.json';

function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * rpsChoices.length);
    return rpsChoices[randomIndex];
}

function saveScores(scores) {
    fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2), 'utf8');
}

function getScores() {
    if (fs.existsSync(scoresFile)) {
        const data = fs.readFileSync(scoresFile, 'utf8');
        return JSON.parse(data);
    } else {
        return {};
    }
}

function resetScores() {
    // Reset scores for all players
    fs.writeFileSync(scoresFile, '{}', 'utf8');
}

function compareScores(a, b) {
    if (a[1].points > b[1].points) {
        return -1; // a has more points than b, so a comes first
    } else if (a[1].points < b[1].points) {
        return 1; // b has more points than a, so b comes first
    } else {
        // If points are equal, prioritize wins
        if (a[1].wins > b[1].wins) {
            return -1; // a has more wins than b, so a comes first
        } else if (a[1].wins < b[1].wins) {
            return 1; // b has more wins than a, so b comes first
        } else {
            // If wins are also equal, sort by user ID (arbitrary choice)
            return a[0].localeCompare(b[0]);
        }
    }
}

// Misc Functions
//----------------------------------------------------------

// Function to check if a user has any of the admin roles or is the server owner
function hasAdminRole(member) {
    
    if (member.guild.ownerID === member.id) {
        // User is the server owner, consider them an admin
        return true;
    }

    return member.roles.cache.some(role => adminRoles.includes(role.name.toLowerCase()));
}


// Utility function to read data from a file
const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};


// Exported functions and variables
//----------------------------------------------------------
module.exports = {
    // YouTube API functions
    getLatestVideo,
    getSubscriberCount,
    getInfoText,
    getSubscriberGoalText,
    getMemberGoalText,
    getScheduleText,

    // Games API functions
    addGame,
    removeGame,
    gamesList,

    // RPS functions
    getRandomChoice,
    rpsChoices,
    saveScores,
    getScores,
    compareScores,
    resetScores,

    // Misc functions
    hasAdminRole,

};
