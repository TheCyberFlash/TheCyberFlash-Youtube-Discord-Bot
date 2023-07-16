// rps.js

const { getRandomChoice, rpsChoices, saveScores, getScores } = require('../utils');

module.exports = {
    name: 'rps',
    description: 'Play Rock Paper Scissors with the bot.',
    execute(message, args) {

        // Check if the user has played before (retrieve scores from the JSON file)
        let scores = getScores();
        const userId = message.author.id;
        if (!scores[userId]) {
            scores[userId] = { wins: 0, ties: 0, losses: 0, points: 0 };
        }

        const userChoice = args[0]?.toLowerCase();
        if (!userChoice || !rpsChoices.includes(userChoice)) {
            return message.channel.send(
                'Invalid command. Please use `!rps rock`, `!rps paper`, or `!rps scissors`.'
            );
        }

        const botChoice = getRandomChoice();
        scores[userId].lastPlayed = Date.now(); // Update last played timestamp

        let resultMessage = `**${message.author.username} chose \`${userChoice}\`**\n\n`;
        resultMessage += `**and I chose \`${botChoice}\`**\n\n`;

        if (userChoice === botChoice) {
            resultMessage += '## It\'s a tie! (1 pt)';
            scores[userId].ties++;
            scores[userId].points++;
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            resultMessage += '## Congratulations! You won! (3 pts)';
            scores[userId].wins++;
            scores[userId].points += 3;
        } else {
            resultMessage += '## Oops! You lost! (0 pts)';
            scores[userId].losses++;
        }

        saveScores(scores); // Save scores to the JSON file

        return message.channel.send(resultMessage);
    },
};
