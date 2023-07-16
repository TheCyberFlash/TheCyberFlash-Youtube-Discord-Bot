// video.js

// Import necessary modules
const fs = require('fs'); // File system module for reading files
const csvParser = require('csv-parser'); // CSV parser module for parsing CSV data
const { discordVideoChannelId } = require('./config'); // Import Discord video channel ID from the configuration file

// Define the CSV file path
const csvFile = 'data/youtube.csv';

// Function to retrieve a random video message from the CSV file
function getRandom(channel, callback) {
  const messages = []; // Initialize an array to store video messages retrieved from the CSV file

  // Read the CSV file using a stream and parse its data
  fs.createReadStream(csvFile)
    .pipe(csvParser())
    .on('data', (row) => {
      const youtubeURL = row['youtubeURL']; // Get the 'youtubeURL' column from the current CSV row
      const title = row['title']; // Get the 'title' column from the current CSV row
      const message = `Check out this video: [${title}] ${youtubeURL}!`; // Create a video message from the URL and title
      messages.push(message); // Add the video message to the 'messages' array
    })
    .on('end', () => {
      // Select a random video message from the list
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      // Execute the provided callback function with the random message and the specified channel
      callback(channel, randomMessage);
    })
    .on('error', (err) => {
      console.error(err); // Log any errors that occur while reading or parsing the CSV file
    });
}

// Function to send a random video link to the specified Discord channel
function sendVideoLink(bot) {
  const channel = bot.channels.cache.get(discordVideoChannelId); // Get the Discord channel object using the video channel ID

  // Check if the channel exists and is a text channel
  if (channel && channel.type === 'text') {
    // Get a random video message and send it to the channel
    getRandom(channel, (channel, message) => {
      channel.send(message) // Send the video message to the channel
        .then(() => console.log(`Message sent: ${message}`)) // Log a success message to the console
        .catch(console.error); // Log any errors that occur while sending the message
    });
  }
}

// Export the functions to use in other modules
module.exports = {
  sendVideoLink,
  getRandom,
};
