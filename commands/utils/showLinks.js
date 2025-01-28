import { SlashCommandBuilder } from "discord.js";


export default {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('Show a youtube link'),
    async execute(interaction) {
        await interaction.reply("Showing youtube link")
    }
}