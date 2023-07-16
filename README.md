# Discord Bot - TheCyberFlash

![Discord Bot Logo](https://bezledastudios.com/wp-content/uploads/2023/07/BEZLEDA-STUDIOS-LOGO-BK-CODES-3.jpg)

## Description

TheCyberFlash's Discord Bot is a multi-functional bot designed to enhance your Discord server with various features and interactions. Whether you want to get the latest YouTube video updates, play games, or check out the upcoming streaming schedule, TheCyberFlash's bot has got you covered!

## Features

### YouTube Integration

- **Latest Video:** Get the link to the latest YouTube video on TheCyberFlash's channel.
- **Subscriber Count:** Display the total number of subscribers TheCyberFlash has on YouTube.
- **Subscriber Goal:** Shows the progress towards TheCyberFlash's subscriber goal.
- **Streaming Schedule:** Provides the streaming schedule for TheCyberFlash's YouTube channel.
- **YouTube Channel Link:** Provides a link to TheCyberFlash's YouTube channel.
- **Member Goal:** Shows the progress towards TheCyberFlash's member goal.

### Community Games

- **Games List:** View the list of games available for random selection.
- **Add Game:** Admins can add new games to the list.
- **Remove Game:** Admins can remove games from the list.
- **Random Game:** Get a random game from the list.

### Rock Paper Scissors (RPS)

- **Play RPS:** Challenge the bot to a game of Rock Paper Scissors.
- **Leaderboard:** Display the Rock Paper Scissors leaderboard, showing the top 10 players based on points, wins, and losses.

### Miscellaneous

- **Server Information:** Displays information about the bot and available commands.

## Usage

To use TheCyberFlash's Discord Bot, you need to set up your own instance of the bot by following these steps:

1. **Create a Discord bot:**
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in with your Discord account.
   - Click on "New Application" and provide a name for your bot.
   - Navigate to the "Bot" tab in the left sidebar and click on "Add Bot."
   - Click on "Yes, do it!" to confirm adding a bot to your application.

2. **Obtain your bot token:**
   - Under the "Bot" section, you'll find your bot's token. Click on "Copy" to copy the token to your clipboard. **Keep this token secure and do not share it publicly.**

3. **Clone this repository:**
   - Clone this GitHub repository to your local machine:

     ```
     git clone <repository_url>
     ```

4. **Install the required dependencies:**
   - Navigate to the bot's directory and install the necessary dependencies using npm:

     ```
     npm install
     ```

5. **Configure the bot:**
   - Open the `config.js` file in the root directory of the bot.
   - Replace `discordBotToken` with the bot token you obtained in step 2.
   - Set the appropriate `discordChannelId`, `discordVideoChannelId`, `youtubeChannelId`, and `youtubeAPIKey` values as per your requirements.
   - Adjust other configurations such as admin roles, cooldown periods, etc., to suit your server setup.

6. **Start the bot:**
   - Run the bot using the following command:

     ```
     node index.js
     ```

7. **Invite the bot to your Discord server:**
   - Go back to the [Discord Developer Portal](https://discord.com/developers/applications) and select your application.
   - Navigate to the "OAuth2" tab in the left sidebar.
   - Under "OAuth2 URL Generator," select the "bot" scope.
   - Select the required bot permissions based on the features you want to enable (e.g., "Read Messages," "Send Messages," "Manage Messages," etc.).
   - Copy the generated OAuth2 URL and paste it into your web browser.
   - Follow the on-screen instructions to invite the bot to your Discord server.

Once the bot is invited to your server and running, it will be active and ready to respond to the specified commands. Enjoy using TheCyberFlash's Discord Bot on your server! 🤖

## Contributing

Contributions are welcome! If you have any feature suggestions, bug reports, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or need further assistance, you can reach out to TheCyberFlash on [Discord](https://discord.gg/4reyQukWsJ).

Happy botting! 🤖
