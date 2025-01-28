import "dotenv/config"

// they import some node utility functions for reading files and directories

// they import the requirements from discord js

import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

// they then initialize the directory stuff

const client = new Client({intents: [GatewayIntentBits.Guilds]});  // this is creatsing a new discord client(bot) instance with a gateway to a server

client.commands = new Collection() //this will be the collection of commands I believe

// they then create a variable that is directed at a "commands" folder, and then do something with readdirSync which sounds like something about reading folders

// they then loop through the commands folder to set commands to the client.commands collection
    // client.commands.set('<PING>') for example



// logs in the bot
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return; 

    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.log(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.execute(interaction);
    } catch {
        console.error(error)
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral})
        } else {
            await interaction.replay({content: "There was an error executing this command!", flags: MessageFlags.Ephemeral})
        }
    }
});

client.login(process.env.DISCORD_TOKEN)