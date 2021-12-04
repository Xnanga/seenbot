// Require the necessary discord.js classes
const {
  Client,
  Intents,
  MessageManager,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Assign a prefix for commands
const prefix = "!";

// Create array of images
const imageFile = new MessageAttachment("./images/angry-seen.png");
const imageEmbed = new MessageEmbed().setImage("attachment://angry-seen.png");

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Test command
  if (command === "ping") {
    message.channel.send("pong!");
  }

  // Help command
  if (command === "help") {
    message.channel.send(
      'Just type the "!seen" command to have SeenBot post a seen meme.'
    );
  }

  // Send random image
  if (command === "seen") {
    message.channel.send({ embeds: [imageEmbed], files: [imageFile] });
  }
});

// Login to Discord with your client's token
client.login(token);
