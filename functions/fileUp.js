const fs = require("fs")

module.exports =
{
    async fileUp(filename, channel)
    {
        let fileRaw = fs.readFileSync("testFile.mkv")
        let fileStats = fs.statSync("testFile.mkv")
        const chunkSize = 5000000
        console.log("sending file", filename)
        console.log( fileStats.isFile())
        for(i = 0; i < fileStats.size; i+= chunkSize)
        {
            console.log("sending block", i / chunkSize)
            let block = fileRaw.subarray(i,i+chunkSize);
            await channel.send({ files: [block] })
        }
    }
}