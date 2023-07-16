// default.js

/**
 * Function to handle invalid commands and send a default response.
 * @param {Object} message - The Discord message object that triggered the command.
 */
function execute(message) {
  // Send a response indicating the command is invalid.
  message.channel.send("Invalid command. Please check `!info` for the list of available commands.");
}

/**
 * Export the default command object.
 */
module.exports = {
  name: 'default', // The command name, used for identifying the command.
  description: 'Handles invalid commands and sends a default response.', // A brief description of what the command does.
  execute, // The function that will be executed when the command is called.
};
