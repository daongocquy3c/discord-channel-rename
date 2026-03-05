require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.TOKEN;
const YOUR_USER_ID = "932528153354698753";
const TARGET_CHANNEL_ID = "1452220713636462734";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (message.author.id !== YOUR_USER_ID) return;
    if (message.channel.id !== TARGET_CHANNEL_ID) return;
    if (message.attachments.size === 0) return;

    const channel = message.channel;
    const currentName = channel.name;

    const match = currentName.match(/(.*-)(\d+)$/);
    if (!match) return;

    const baseName = match[1];
    const number = parseInt(match[2]);

    const newName = `${baseName}${number + 1}`;

    try {
        await channel.setName(newName);
        console.log(`Renamed to ${newName}`);
    } catch (err) {
        console.error(err);
    }
});

client.login(process.env.TOKEN);