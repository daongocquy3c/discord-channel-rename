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
const TARGET_CHANNEL_ID = "1452220713636462734"; // đổi nếu cần

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

    // Bỏ qua bot
    if (message.author.bot) return;

    // Chỉ hoạt động trong channel chỉ định
    if (message.channel.id !== TARGET_CHANNEL_ID) return;

    // Phải có nội dung hoặc có ảnh
    if (message.content.length === 0 && message.attachments.size === 0) return;

    const channel = message.channel;
    const currentName = channel.name;

    // Tìm số ở cuối tên kênh (không quan tâm phía trước là gì)
    const match = currentName.match(/(\d+)$/);
    if (!match) return;

    const number = parseInt(match[1]);

    // Lấy toàn bộ phần trước số
    const baseName = currentName.slice(0, -match[1].length);

    const newName = `${baseName}${number + 1}`;

    try {
        await channel.setName(newName);
        console.log(`✅ Renamed to ${newName}`);
    } catch (err) {
        console.error("❌ Rename failed:", err);
    }
});

client.login(TOKEN);