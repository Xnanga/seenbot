const {
  Client,
  Intents,
  MessageManager,
  MessageAttachment,
  MessageEmbed,
} = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('path');

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Assign a prefix for commands
const prefix = '!';

// Create array of images
let allImages = [];
const imagesDirPath = path.join(__dirname, 'images');
fs.readdir(imagesDirPath, (err, files) => {
  if (err) {
    return console.err(`Unable to read directory: ${err}`);
  }
  files.forEach((image) => {
    allImages.push(`./${image}`);
  });
});

// Generate random number
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Remove string characters at beginning
const removeStringBeginning = function (stringToEdit, charactersToRemove) {
  const editedString = stringToEdit.slice(charactersToRemove);
  return editedString;
};

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

// When a message is posted, take an action
client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Help command
  if (command === 'help') {
    message.channel.send(
      'Just type the "!seen" command to have SeenBot post a seen meme.'
    );
  }

  // Send random image
  if (command === 'seen') {
    // Generate random number
    const randomNum = randomInt(0, allImages.length - 1);
    const numOfCharactersToRemoveFromImagePath = 9;

    // Assign image file and embed based on number
    imageFile = new MessageAttachment(allImages[randomNum]);
    imageEmbed = new MessageEmbed().setImage(
      `attachment://${removeStringBeginning(
        allImages[randomNum],
        numOfCharactersToRemoveFromImagePath
      )}`
    );

    // Send image embed
    message.channel.send({ embeds: [imageEmbed], files: [imageFile] });
  }
});

// Login to Discord with your client's token
client.login(token);
