// leaderboard.js

const { MessageEmbed } = require('discord.js');
const { getScores, compareScores } = require('../utils');

module.exports = {
    name: 'leaderboard',
    description: 'Display the Rock Paper Scissors leaderboard.',
    execute(message, args) {
        // Retrieve the scores data
        const scores = getScores();
        
        // Sort the scores in descending order based on points, wins, and losses
        const sortedScores = Object.entries(scores).sort(compareScores);

        // Create the leaderboard as an embedded message
        const leaderboardEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Rock Paper Scissors Leaderboard')
            .setDescription('Top 10 players based on points, wins, and losses');

        // Loop through the sorted scores and add the top 10 players to the leaderboard
        sortedScores.slice(0, 10).forEach((entry, index) => {
            const [userId, userData] = entry;
            const { wins, ties, losses, points } = userData;

            // Fetch the user from the Discord guild based on their ID
            const user = message.guild.members.cache.get(userId);

            // Make sure the user exists in the guild
            if (user) {
                // Determine the user's position in the leaderboard
                const position = index + 1;

                // Truncate the player's name to fit in the leaderboard if it's too long
                const playerName = user.displayName.length > 14 ? user.displayName.slice(0, 11) + '...' : user.displayName;

                // Add the player's details to the leaderboard as a new field in the embed
                leaderboardEmbed.addField(
                    `${position}. ${playerName}`,
                    `Wins: ${wins}, Draws: ${ties}, Losses: ${losses}, Points: ${points}`,
                    true
                );
            }
        });

        // Send the leaderboard as an embedded message to the channel
        message.channel.send(leaderboardEmbed);
    }
};
