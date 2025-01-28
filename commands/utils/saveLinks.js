import { SlashCommandBuilder } from "discord.js";


export default {
    data: new SlashCommandBuilder()
        .setName('save')
        .setDescription('Save a youtube link'),
    async execute(interaction) {
        await interaction.reply("Saving youtube link")
    }
}