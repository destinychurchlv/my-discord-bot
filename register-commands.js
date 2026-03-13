const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID; // Your bot’s application ID
const GUILD_ID = process.env.GUILD_ID;   // Your server ID

const commands = [
  new SlashCommandBuilder()
    .setName('botpost')
    .setDescription('Send a bot message as an embed')
    .addStringOption(o => o.setName('title').setDescription('Title of the embed').setRequired(true))
    .addStringOption(o => o.setName('description').setDescription('Primary description').setRequired(true))
    .addStringOption(o => o.setName('description2').setDescription('Secondary description').setRequired(false))
    .addStringOption(o => o.setName('link').setDescription('Optional website link').setRequired(false))
    .addRoleOption(o => o.setName('ping').setDescription('Optional role to ping').setRequired(false)),

  new SlashCommandBuilder()
    .setName('anonlookup')
    .setDescription('Lookup the sender of an anonymous message')
    .addStringOption(o => o.setName('message_id').setDescription('ID of the anonymous message').setRequired(true)),

  new SlashCommandBuilder()
    .setName('previewwelcome')
    .setDescription('Preview the welcome message embed'),

  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  new SlashCommandBuilder()
    .setName('testyoutube')
    .setDescription('Send a test YouTube notification')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Clearing and registering commands...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('✅ Commands cleared & registered successfully.');
  } catch (err) {
    console.error('Error clearing/registering commands:', err);
  }
})();
