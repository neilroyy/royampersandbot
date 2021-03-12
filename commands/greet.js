module.exports = {
    name: 'greet',
    description: "this is a greet command!",
    execute(message, user){
        message.channel.send("Hey! "+user);
    } 
}