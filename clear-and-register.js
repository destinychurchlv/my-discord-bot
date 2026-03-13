const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config(); // ✅ Load environment variables from .env

// ================= CONFIG =================

// Load sensitive data from environment variables
const TOKEN = process.env.DISCORD_TOKEN;       // Bot token
const CLIENT_ID = process.env.CLIENT_ID;       // Bot application ID
const GUILD_ID = process.env.GUILD_ID;         // Your Discord server ID

// ==========================================

// Define only the commands you want
const commands = [
  new SlashCommandBuilder()
    .setName('botpost')
    .setDescription('Send a bot message as an embed')
    .addStringOption(o => o.setName('title').setDescription('Title of the embed').setRequired(true))
    .addStringOption(o => o.setName('description').setDescription('Primary description (multi-line allowed)').setRequired(true))
    .addStringOption(o => o.setName('description2').setDescription('Secondary description (optional)').setRequired(false))
    .addStringOption(o => o.setName('link').setDescription('Optional website link').setRequired(false))
    .addRoleOption(o => o.setName('ping').setDescription('Optional role to ping').setRequired(false)),

  new SlashCommandBuilder()
    .setName('anonlookup')
    .setDescription('Lookup the sender of an anonymous message')
    .addStringOption(o => o.setName('message_id').setDescription('ID of the anonymous message').setRequired(true))
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    // Clear all guild commands
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] });
    console.log('✅ Cleared all guild commands');

    // Clear all global commands
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });
    console.log('✅ Cleared all global commands');

    // Register only the current commands in the guild
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('✅ Registered only /botpost and /anonlookup in the guild');
  } catch (err) {
    console.error('❌ Error clearing/registering commands:', err);
  }
})();