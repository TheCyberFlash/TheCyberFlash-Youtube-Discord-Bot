// subgoal.js

const { getSubscriberGoalText } = require('../utils');

module.exports = {
  name: 'subgoal',
  description: 'Shows the progress towards the subscriber goal.',
  execute(message) {
    getSubscriberGoalText()
      .then((subGoalText) => {
        message.channel.send(subGoalText);
      })
      .catch((error) => {
        console.error('Error fetching subscriber goal text:', error);
        message.channel.send(
          'An error occurred while fetching the subscriber goal information. Please try again later.'
        );
      });
  },
};
