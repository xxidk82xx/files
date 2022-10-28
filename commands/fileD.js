const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
//const { channel } = require('diagnostics_channel');
const fs = require("fs");
let filesD = require("../files.json")
let { fileDown } = require("../functions/fileDown")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('filed')
		.setDescription('downloads a file')
		.addStringOption(option => option.setName('input').setDescription('name of the file')),
	async execute(interaction, client) 
	{
		const string = interaction.options.getString('input');
		//interaction.reply("downloading")
        fileDown(string, client, interaction)
		
		fs.writeFileSync("files.json", JSON.stringify(filesD))
		console.log(`updated json with file ${JSON.stringify(filesD)}`)
	},
};