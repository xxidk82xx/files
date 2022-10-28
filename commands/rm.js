const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
let filesD = require("../files.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('removes a file')
        .addStringOption(option => option.setName('input').setDescription('name of the file')),
	async execute(interaction, client) 
	{
        const string = interaction.options.getString('input');
		for(i in filesD)
        {
            if(filesD[i].fileName == string)
            {
                client.channels.cache.get(filesD[i].channelId).delete()
                break;
            }
        }
        interaction.reply(`successfully deleted ${string}`)
	},
};