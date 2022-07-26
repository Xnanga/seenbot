const {
  Client,
  Intents,
  MessageManager,
  MessageAttachment,
  MessageEmbed,
} = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Assign a prefix for commands
const prefix = '!';

// Create array of images
let allImages = [];
fs.readdir('./images', (err, files) => {
  if (err) {
    return console.err(`Unable to read directory: ${err}`);
  }
  files.forEach((image) => {
    allImages.push(`./images/${image}`);
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

// Check if an object is empty
const checkIfObjectIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

// When a message is deleted, cache it
let lastDeletedMessageData = {};
client.on('messageDelete', (deletedMessage) => {
  lastDeletedMessageData = deletedMessage;
});

// When a message is posted, take an action
client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Help command
  if (command === 'help') {
    message.channel.send(
      `Type the "!seen" command to have SeenBot post a seen meme.
       Type the "!snipe" command to have SeenBot post the last message that was deleted.`
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

  // Send last deleted message
  if (command === 'snipe') {
    // Check that there is a deleted message available
    const deletedMessageDataIsEmpty = checkIfObjectIsEmpty(
      lastDeletedMessageData
    );
    // If there is not a deleted message, post an error message in the channel
    if (deletedMessageDataIsEmpty) {
      message.channel.send('No messages in the delete queue...');
      return;
    }

    // If there is a deleted message, post an embed with all values (URl optional)
    deletedMessageEmbed = new MessageEmbed()
      .setAuthor(lastDeletedMessageData.author.username)
      .setThumbnail(lastDeletedMessageData.author.avatarURL())
      .setTimestamp(lastDeletedMessageData.createdTimestamp)
      .setDescription(lastDeletedMessageData.content)
      ?.setImage(lastDeletedMessageData.attachments.first()?.url);

    // Send the embed to the channel
    message.channel.send({ embeds: [deletedMessageEmbed] });
  }
});

// Login to Discord with your client's token
client.login(token);
