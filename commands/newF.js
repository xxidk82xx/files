const { SlashCommandBuilder } = require('@discordjs/builders');
//const { channel } = require('diagnostics_channel');
const fs = require("fs");
let filesD = require("../files.json")
let { fileUp } = require("../functions/fileUp")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newf')
		.setDescription('makes a new file')
		.addStringOption(option => option.setName('input').setDescription('name of the file')),
	async execute(interaction) 
	{
		const string = interaction.options.getString('input');
        channel = await interaction.guild.channels.create({ name: string})
			
		interaction.reply(`successfully made channel: "${string}"`)
		fileIds = await fileUp(string, channel, interaction)
		//interaction.reply("uploaded file to channel")

		filesD.push
		(
			{
				fileName: string,
				channelId: channel.id,
				blocks:fileIds
			}
		) 
		fs.writeFileSync("files.json", JSON.stringify(filesD))
		console.log(`updated json with file ${JSON.stringify(filesD)}`)
		interaction.editReply("uploaded file successfully")
	},
};