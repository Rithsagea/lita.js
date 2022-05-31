import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const { clientId, guildId, token } = JSON.parse(
	await readFile(
		new URL('../config.json', import.meta.url)
	)
);

const commands = [];
const commandsPath = path.join(fileURLToPath(path.dirname(import.meta.url)), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for (const file of commandFiles) {
	const filePath = pathToFileURL(path.join(commandsPath, file));
	const command = (await import(filePath)).default;
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);