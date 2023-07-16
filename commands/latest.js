// latest.js

const { getLatestVideo } = require('../utils');

module.exports = {
  name: 'latest',
  description: "Retrieves the link to the latest YouTube video on TheCyberFlash's channel.",
  async execute(message) {
    try {
      // Use the getLatestVideo function to retrieve information about the latest video
      const video = await getLatestVideo();

      // Extract the title and URL of the latest video
      const title = video.title;
      const url = `https://www.youtube.com/watch?v=${video.videoId}`;

      // Send a message to the Discord channel with the latest video details
      message.channel.send(`Latest video: ${title}\n${url}`);
    } catch (error) {
      // If there is an error while retrieving the latest video, handle the error
      console.error('Error retrieving latest video:', error);
      message.channel.send('An error occurred while retrieving the latest video. Please try again later.');
    }
  },
};
