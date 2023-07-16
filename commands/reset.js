// reset.js

const fs = require('fs');
const { hasAdminRole, saveScores, getScores, resetScores } = require('../utils');

module.exports = {
    name: 'reset',
    description: 'Reset scores for all players or a specific player (Admin Only).',
    async execute(message, args) {
        if (!hasAdminRole(message.member)) {
            return message.channel.send('You do not have permission to use this command.');
        }

        if (args.length === 0) {
            // Ask for confirmation before resetting all scores
            const confirmMessage = await message.channel.send('Are you sure you want to reset everyone\'s score? Type `yes` to confirm.');

            // Await a response from the user
            const filter = (response) => response.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { time: 10000 }); // Set a timeout of 10 seconds

            collector.on('collect', async (response) => {
                const answer = response.content.toLowerCase();
                if (answer === 'yes') {
                    // Proceed with resetting all scores
                    resetScores();
                    message.channel.send('All scores have been reset.');
                } else {
                    message.channel.send('Score reset cancelled.');
                }

                // Stop the collector after the first response
                collector.stop();
            });

            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    message.channel.send('Score reset confirmation timed out.');
                }
            });
        } else {
            // Reset scores for a specific player
            const memberId = args[0].replace(/[<@!>]/g, ''); // Extract the user ID from the mention
            const scores = getScores();

            if (!scores[memberId]) {
                return message.channel.send('User not found in the scores.');
            }

            delete scores[memberId];
            saveScores(scores);

            return message.channel.send(`Scores have been reset for the user with ID: ${memberId}.`);
        }

    },
};
