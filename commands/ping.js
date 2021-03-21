module.exports = {
    name : 'ping',
    cooldown: 10,
    description : 'Displays API Latency',
    execute(client, message, cmd, args, Discord, user){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}