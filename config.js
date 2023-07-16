module.exports = {
  // Discord Bot Token: The token of your Discord bot to authenticate with Discord.
  discordBotToken: 'YOUR_DISCORD_BOT_TOKEN',

  // Discord Channel ID: The ID of the Discord channel where the bot will operate.
  discordChannelId: 'YOUR_DISCORD_CHANNEL_ID',

  // Discord Channel ID 2: The ID of the Discord channel where the bot will post videos periodically.
  discordVideoChannelId: 'YOUR_DISCORD_VIDEO_CHANNEL_ID',

  // YouTube Channel ID: The ID of the YouTube channel from which to fetch the latest video.
  youtubeChannelId: 'YOUR_YOUTUBE_CHANNEL_ID',

  // YouTube API Key: The API key to access the YouTube Data API.
  youtubeAPIKey: 'YOUR_YOUTUBE_API_KEY',

  // YouTube Channel URL: The URL of your YouTube channel.
  youtubeChannelURL: 'YOUR_YOUTUBE_CHANNEL_URL',

  // Admin Roles: An array of role names that are considered as admin roles.
  adminRoles: ["admin", "mod"],

  // Command Cooldown: The cooldown period in milliseconds for commands (per command).
  commandCooldown: 60 * 1000, // 60 seconds => 60,000 milliseconds

  // User Cooldown: The cooldown period in milliseconds for commands (per user).
  userCooldown: 5 * 60 * 1000, // 5 minutes => 5 * 60,000 milliseconds

  // Video Cooldown: The cooldown period in milliseconds for fetching the latest video.
  videoCooldown: 2 * 60 * 60 * 1000, // 2 hours => 2 * 60 * 60 * 1000 milliseconds

  // RPS Cooldown: The cooldown period in milliseconds for playing RPS.
  rpsCooldown: 5 * 1000, // 5 seconds => 5000 milliseconds
};
