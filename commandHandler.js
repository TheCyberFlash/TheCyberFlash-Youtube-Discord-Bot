// commandHandler.js

// Import necessary modules and commands
const infoCommand = require('./commands/info');
const linkCommand = require('./commands/link');
const latestCommand = require('./commands/latest');
const subsCommand = require('./commands/subs');
const subgoalCommand = require('./commands/subgoal');
const memgoalCommand = require('./commands/memgoal');
const scheduleCommand = require('./commands/schedule');
const gamesCommand = require('./commands/games');
const rpsCommand = require('./commands/rps');
const rpsLeaderboardCommand = require('./commands/leaderboard');
const resetCommand = require('./commands/reset');

const defaultCommand = require('./commands/default');
const { commandCooldown, userCooldown, rpsCooldown } = require('./config');
const { hasAdminRole } = require('./utils');

// Define cooldowns object to store command and user cooldown timestamps
const cooldowns = {};

// Function to handle incoming commands
function handleCommand(message, command, args) {
    // Check if the user has any of the admin roles
    const userHasAdminRole = hasAdminRole(message.member);

    // Whitelist users with admin role
    const isWhitelisted = userHasAdminRole;

    // Generate cooldown key using the command name and user ID
    const cooldownKey = `${message.author.id}`;

    // Check user cooldown for the specific command (excluding RPS Command)
    if (!isWhitelisted && command !== '!rps' && cooldowns[command] && cooldowns[command][cooldownKey] && cooldowns[command][cooldownKey] > Date.now()) {
        const timeLeft = Math.ceil((cooldowns[command][cooldownKey] - Date.now()) / 1000);
        return message.channel.send(`User cooldown for this command. Please wait ${timeLeft} seconds before using this command again.`);
    }

    // Update user cooldown timestamp for the specific command
    if (!cooldowns[command]) {
        cooldowns[command] = {};
    }
    cooldowns[command][cooldownKey] = Date.now() + userCooldown;

    // Execute the appropriate command based on the user's input
    if (command === '!rps') {
        // Check command cooldown for rps command
        if (!isWhitelisted && cooldowns[command] && cooldowns[command][message.content] && cooldowns[command][message.content] > Date.now()) {
            const timeLeft = Math.ceil((cooldowns[command][message.content] - Date.now()) / 1000);
            return message.channel.send(`RPS command cooldown. Please wait ${timeLeft} seconds before playing again.`);
        }

        if (!cooldowns[command]) {
            cooldowns[command] = {};
        }
        cooldowns[command][message.content] = Date.now() + rpsCooldown;

        // Execute the RPS command
        rpsCommand.execute(message, args);
    } else {
        // Update command cooldown timestamp for all other commands
        cooldowns[command][message.content] = Date.now() + commandCooldown;

        // Execute other commands based on the input command
        if (command === '!info') {
            infoCommand.execute(message);
        } else if (command === '!link' || command === '!channel') {
            linkCommand.execute(message);
        } else if (command.startsWith('!latest')) {
            latestCommand.execute(message);
        } else if (command === '!subs') {
            subsCommand.execute(message);
        } else if (command === '!subgoal') {
            subgoalCommand.execute(message);
        } else if (command === '!memgoal') {
            memgoalCommand.execute(message);
        } else if (command === '!schedule') {
            scheduleCommand.execute(message);
        } else if (command === '!games') {
            gamesCommand.execute(message, args);
        } else if (command === '!leaderboard' || command === '!board') {
            rpsLeaderboardCommand.execute(message, args);
        } else if (command === '!reset') {
            resetCommand.execute(message, args);
        } else {
            defaultCommand.execute(message);
        }
    }
}

module.exports = {
    handleCommand,
};
