const fs = require("fs")
let fileD = require("../files.json")
let request = require(`request`);
const { lookup } = require("dns");


module.exports = 
{
    async fileDown(name, client, interaction)
    {
        let fileBlocks
        let fileChannel
        for(const files in fileD)
        {
            console.log(fileD[files])
            if(fileD[files].fileName == name)
            {
                fileBlocks = fileD[files].blocks
                fileChannel = fileD[files].channelId
                break;
            } 
        }
        fs.rmSync(`${name} downloaded`)
        await interaction.reply(`downloading file ${name}`)
        
        let badErrCheck = false
        IDK: for(const blockId in fileBlocks)
        {
            message = await client.channels.cache.get(fileChannel).messages.fetch(fileBlocks[blockId])
            console.log(`downloading file: ${fileBlocks[blockId]} ${blockId} / ${fileBlocks.length}`)
            await interaction.editReply(`downloading file ${blockId} of ${fileBlocks.length}`)
            await request.get(message.attachments.first().url)
                .on('error', () => {badErrCheck = true})
                .pipe(fs.createWriteStream(`${name} downloaded`, {flags: 'a'}))
            if(badErrCheck) 
            {
                badErrCheck = false
                continue IDK;
            }
        }
        interaction.editReply("finished downloading file")
    }
}