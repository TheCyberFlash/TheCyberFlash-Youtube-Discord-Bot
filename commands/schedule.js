// schedule.js

const { getScheduleText } = require('../utils');

module.exports = {
  name: 'schedule',
  description: 'Provides the streaming schedule for TheCyberFlash\'s YouTube channel.',
  execute(message) {
    getScheduleText()
      .then((scheduleText) => {
        message.channel.send(scheduleText);
      })
      .catch((error) => {
        console.error('Error fetching schedule text:', error);
        message.channel.send(
          'An error occurred while fetching the streaming schedule. Please try again later.'
        );
      });
  },
};
