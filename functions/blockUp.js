

module.exports = 
{
    async blockUp(channel, block)
    {
        block = await channel.send({ files: [block] })
        return block.id;
    }
}