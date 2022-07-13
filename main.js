// Require the necessary discord.js classes
const {
  Client,
  Intents,
  MessageManager,
  MessageAttachment,
  MessageEmbed,
} = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Assign a prefix for commands
const prefix = '!';

// Create array of images
const allImages = [
  './images/angry-seen.png',
  './images/drawn-seen.jpg',
  './images/pished-seen.jpg',
  './images/ali-seen.jpg',
  './images/calum-seen.jpg',
  './images/original-seen.jpeg',
  './images/ali-shower-seen.jpg',
  './images/cammy-seen.png',
  './images/face-mangled-seen.png',
  './images/hagrid-seen.png',
  './images/high-impact-sexual-seen.png',
  './images/jake-outside-seen.jpg',
  './images/ali-disgusted-seen.jpg',
  './images/ali-super-seen.jpeg',
  './images/calum-prison-shower-seen.jpg',
  './images/cammy-toe-seen.jpg',
  './images/jake-hobo-seen.jpeg',
  './images/jamie-gummy-seen.jpeg',
  './images/jamie-hand-seen.jpeg',
  './images/sad-ryan-seen.jpg',
  './images/young-ewan-seen.jpeg',
  './images/young-jake-seen.jpeg',
];

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
    const num = randomInt(0, allImages.length - 1);

    // Assign image file and embed based on number
    imageFile = new MessageAttachment(allImages[num]);
    imageEmbed = new MessageEmbed().setImage(
      `attachment://${removeStringBeginning(allImages[num], 9)}`
    );

    // Send image embed
    message.channel.send({ embeds: [imageEmbed], files: [imageFile] });
  }
});

// Login to Discord with your client's token
client.login(token);
