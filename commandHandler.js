class commandHandler
{
    constructor()
    {
        this.cmdarr = [" ", this.empty];
    }

    newCmd(name, fun)
    {
        this.cmdarr.push([name, fun]);
    }

    commands(command, args)
    {
        for(this.i = 0; this.i < this.cmdarr.length; this.i++)
        {
            if(this.cmdarr[this.i][0] === command) this.cmdarr[this.i][1](args[0], args[1]);
        }
        return;
    }
    empty()
    {
        return
    }
}
module.exports = commandHandler