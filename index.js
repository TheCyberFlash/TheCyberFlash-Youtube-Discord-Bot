// index.js

// Import necessary modules
const Discord = require('discord.js');
const { sendVideoLink } = require('./video');
const { discordBotToken, videoCooldown, discordChannelId } = require('./config');
const { handleCommand } = require('./commandHandler');

// Create a new Discord bot instance
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

/* Youtube Video Timer (Bot Start) */
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);

    // Send the first video link immediately after the bot starts
    sendVideoLink(bot);

    // Set up an interval to send video links every 2 hours
    setInterval(() => {
        sendVideoLink(bot);
    }, videoCooldown);
});

// Event listener for incoming messages
bot.on('message', (message) => {
    // Ignore messages from other bots
    if (message.author.bot) return;

    // Check if the message is sent in the correct channel
    if (message.channel.id != discordChannelId) return;

    // Extract the command and arguments from the message content
    const command = message.content.toLowerCase();
    
    // Check if the message starts with a command prefix
    if (!command.startsWith('!') || command === '!') return;

    // Split the message content into command and arguments
    const args = command.split(' ');
    const commandName = args.shift().toLowerCase();

    // Pass the incoming message to the command handler along with the arguments
    handleCommand(message, commandName, args);
});

// Log in to Discord with the provided token
bot.login(discordBotToken);
