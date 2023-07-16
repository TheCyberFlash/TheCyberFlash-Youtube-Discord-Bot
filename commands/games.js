// games.js

// Import necessary modules and functions from the utils.js file
const { gamesList, addGame, removeGame, hasAdminRole } = require('../utils');

module.exports = {
  name: 'games',
  description: 'Handles the games list and random selection.',
  execute(message, args) {
    // Check if the user has admin/mod role
    const isAdminOrMod = hasAdminRole(message.member);

    // If the user only typed "!games" without any parameters, set the action to be 'list'
    if (args.length === 0) {
      args.push('list');
    }

    const [action, ...gameName] = args;

    if (action === 'add') {
      // Handle adding a game to the list
      if (!isAdminOrMod) {
        return message.channel.send('You do not have permission to add games to the list.');
      }

      if (gameName.length === 0) {
        return message.channel.send('Please provide a game name after `add`.');
      }

      const game = gameName.join(' ');
      addGame(game);
      return message.channel.send(`Game "${game}" has been added to the list.`);
    } else if (action === 'list') {
      // Handle listing all games in the games list
      if (gamesList.length === 0) {
        return message.channel.send('The games list is empty. Add some games using `!games add -gamename`.');
      }

      // Format the games list
      const formattedGamesList = gamesList.map((game, index) => `* ${game}`).join('\n');

      return message.channel.send(`\`\`\` Games List:\n${formattedGamesList} \`\`\``);
    } else if (action === 'random') {
      // Handle selecting a random game from the games list
      const randomGame = gamesList[Math.floor(Math.random() * gamesList.length)];
      if (!randomGame) {
        return message.channel.send('The games list is empty. Add some games using `!games add -gamename`.');
      }
      return message.channel.send(`Random game: ${randomGame}`);
    } else if (action === 'remove') {
      // Handle removing a game from the games list
      if (!isAdminOrMod) {
        return message.channel.send('You do not have permission to remove games from the list.');
      }

      if (gameName.length === 0) {
        return message.channel.send('Please provide a game name after `remove`.');
      }

      const game = gameName.join(' ');
      const removed = removeGame(game);
      if (removed) {
        return message.channel.send(`Game "${game}" has been removed from the list.`);
      } else {
        return message.channel.send(`Game "${game}" was not found in the list.`);
      }
    } else {
      // Handle invalid command
      return message.channel.send(
        'Invalid command. Use `!games list` to view the list of games, `!games random` to get a random game, or `!games add -gamename` to add a game (admin only).'
      );
    }
  },
};
