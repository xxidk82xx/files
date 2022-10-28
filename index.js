
const discord = require ("discord.js")
const path = require('node:path');
const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const {token} = require('./config.json');
const client = new Client({ intents: ["Guilds", "GuildMessages"] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => 
{
	console.log('Ready!');
	
});

//client.on("messageCreate", async message =>
//{
//	if(message.channel.id == textInput[1] && message.author.id == textInput[0]) textInput[2] = message
//})

client.on('interactionCreate', async interaction => 
{
	
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction, client);
	} catch (error) {
        console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	
});
client.login(token);