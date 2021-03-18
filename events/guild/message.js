module.exports = (Discord, client, message) => {
    const prefix = 'ra!';

    if(!message.content.startsWith(prefix) || message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);
    const user = "<@"+message.author.id+">"+"!";

    if(command) command.execute(client, message ,args, Discord, user);


}