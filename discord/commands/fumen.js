import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('fumen')
		.setDescription('Returns an image of the fumen'),
	async execute(interaction) {
		await interaction.reply('hello');
	}
};