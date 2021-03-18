module.exports = {
    name : 'ping',
    description : 'Displays API Latency',
    execute(client, message ,args, Discord, user){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}