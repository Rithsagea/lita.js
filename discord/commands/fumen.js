import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('fumen')
		.setDescription('Returns an image of the fumen')
		.addStringOption(option =>
			option.setName('fumen')
				.setDescription('The fumen code to display')
				.setRequired(true)),
	async execute(interaction) {
		let fumen = interaction.options.getString('fumen');
		await interaction.reply(fumen);
	}
};