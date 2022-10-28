const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const fs = require("fs");
let filesD = require("../files.json")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('lists each file'),
	async execute(interaction, client) 
	{
        let replycache;
		for(i in filesD)
        {
            replycache += `${filesD[i].fileName} \n`
        }
        interaction.reply(replycache)
	},
};