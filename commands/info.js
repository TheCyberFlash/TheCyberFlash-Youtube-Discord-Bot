// info.js

const fs = require('fs');
const { getInfoText } = require('../utils');

module.exports = {
  name: 'info',
  description: 'Displays information about the bot and available commands.',
  execute(message) {
    // Call the getInfoText function to fetch the information text
    getInfoText()
      .then((infoText) => {
        // Once the information text is retrieved, send it to the Discord channel
        message.channel.send(infoText);
      })
      .catch((error) => {
        // If there is an error while fetching the information text, handle the error
        console.error('Error fetching info text:', error);
        message.channel.send(
          'An error occurred while fetching the information. Please try again later.'
        );
      });
  },
};
