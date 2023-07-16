// link.js

const { youtubeChannelURL } = require('../config');

module.exports = {
  name: 'link',
  description: 'Provides a link to TheCyberFlash\'s YouTube channel.',
  execute(message) {
    // Send the link to TheCyberFlash's YouTube channel as a message
    message.channel.send('Link to YouTube Channel: ' + youtubeChannelURL);
  },
};
