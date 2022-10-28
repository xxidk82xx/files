const fs = require("fs")

module.exports =
{
    async fileUp(filename, channel, interaction)
    {
        let fileRaw = fs.readFileSync(filename)
        let fileStats = fs.statSync(filename)
        let fileIds = [];
        const chunkSize = 5000000
        console.log("sending file", filename)
        console.log( fileStats.isFile())
        for(i = 0; i < fileStats.size; i+= chunkSize)
        {
            console.log("sending block", i / chunkSize)
            interaction.editReply(`sending block ${i/chunkSize} of ${fileStats.size/chunkSize} `)
            let block = fileRaw.subarray(i,i+chunkSize);
            upBlock = await channel.send({ files: [block] })
            fileIds.push(upBlock.id);
        }
        return fileIds
    }
}