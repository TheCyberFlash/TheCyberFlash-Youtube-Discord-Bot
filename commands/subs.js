// subs.js

const { getSubscriberCount } = require('../utils');

module.exports = {
  name: 'subs',
  description: 'Displays the total number of subscribers TheCyberFlash has on YouTube.',
  async execute(message) {
    try {
      const subscriberCount = await getSubscriberCount();
      message.channel.send(`Total subscribers: ${subscriberCount}`);
    } catch (error) {
      console.error('Error retrieving subscriber count:', error);
      message.channel.send(
        'An error occurred while fetching the subscriber count. Please try again later.'
      );
    }
  },
};
