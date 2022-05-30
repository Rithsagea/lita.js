import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client, Collection, Intents } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandsPath = path.join(fileURLToPath(path.dirname(import.meta.url)), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = pathToFileURL(path.join(commandsPath, file));
	const command = (await import(filePath)).default;
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(config.token);