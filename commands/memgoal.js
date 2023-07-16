// memgoal.js

const { getMemberGoalText } = require('../utils');

module.exports = {
  name: 'memgoal',
  description: 'Shows the progress towards the member goal.',
  execute(message) {
    // Call the getMemberGoalText function to fetch the member goal information
    getMemberGoalText()
      .then((memGoalText) => {
        // Send the member goal information as a message in the Discord channel
        message.channel.send(memGoalText);
      })
      .catch((error) => {
        console.error('Error fetching member goal text:', error);
        // Send an error message if there was an issue fetching the member goal information
        message.channel.send(
          'An error occurred while fetching the member goal information. Please try again later.'
        );
      });
  },
};
