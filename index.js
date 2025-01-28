import "dotenv/config"
import YoutubeApi from './utils/YoutubeApi.js'
// import {google} from 'googleapis'
// import {Client, Events, GatewayIntentBits} from 'discord.js'

// // Require the necessary discord.js classes
// // const { Client, Events, GatewayIntentBits } = require('discord.js');
// // const { token } = require('./config.json');

// // Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// // When the client is ready, run this code (only once).
// // The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// // It makes some properties non-nullable.
// client.once(Events.ClientReady, readyClient => {
// 	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
// });

// // Log in to Discord with your client's token
// client.login(process.env.DISCORD_TOKEN);

import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags, IntentsBitField, userMention } from 'discord.js';
// import { token } from './config.json' assert { type: 'json' };

// Get the current file's directory (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const yt = new YoutubeApi()

yt.search("Rush")

// Create a new client instance
const client = new Client({ 
	intents: 
		[
			GatewayIntentBits.Guilds,
			IntentsBitField.Flags.GuildMembers,
			IntentsBitField.Flags.GuildMessages,
			IntentsBitField.Flags.MessageContent

		] 
	});

// import commands (this can be done dynamically by looping through the command directory)
client.commands = new Collection();
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const { default: command } = await import(filePath); // Dynamic import
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.on('messageCreate', (message) => {
	if(message.mentions.users.size > 0) {
		message.mentions.users.forEach((user) => {
			console.log(user.username)
			if(user.id === client.user.id) { // or the client user id?
				// have the sludgebot respont with a message.
				message.channel.send("You rang?")
			}
		})
	}
})

client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;

    // Check if the message contains a link
    const linkRegex = /(https?:\/\/[^\s]+)/g; // Regex for detecting links
    if (linkRegex.test(message.content)) {
		message.channel.send(`I'll save this`)
        // console.log(`Link found: ${message.content}`);
        // You can save the link to a database or perform other actions here
    }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
