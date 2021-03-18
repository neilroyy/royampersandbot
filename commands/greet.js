module.exports = {
    name: 'greet',
    description: "this is a greet command!",
    execute(client, message ,args, Discord, user){
        message.channel.send("Hey! "+user);
    } 
}