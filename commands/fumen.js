const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fumen')
		.setDescription('Returns an image of the fumen'),
	async execute(interaction) {
		await interaction.reply('hello');
	}
};