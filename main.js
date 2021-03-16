const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'ra!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('The RA Community',{type: "LISTENING"}).catch(console.error);
});



client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const user = "<@"+message.author.id+">"+"!";

    if(command === "ping"){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
    else if(command === "greet"){
        client.commands.get('greet').execute(message, user);
    }
    else if(command === "rules"){
        client.commands.get('rules').execute(message, Discord);
    }
    else if(command === "clear"){
        client.commands.get('clear').execute(message, args);
    }
    else if(command === "kick"){
        if(message.member.roles.cache.find(r => r.name === "HyperVisor") || message.member.roles.cache.find(r => r.name === "Moderator")){
            client.commands.get('kick').execute(message, args);
        }else{
            message.channel.send("You are not a Moderator or an Admin, contact the staff for concerns.")
        }
    }
    else if(command === "ban"){
        if(message.member.roles.cache.find(r => r.name === "HyperVisor")|| message.member.roles.cache.find(r => r.name === "Moderator")){
            client.commands.get('ban').execute(message, args);
        }else{
            message.channel.send("You are not a Moderator or an Admin, contact the staff for concerns.")
        }
    }
    else if(command === "help"){
        client.commands.get('help').execute(message, Discord);
    }

});


client.login('ODE5NzAxNzI4NzM5NzIxMjM3.YEqcuQ.pTAaHsEm26xrFKB3ZOEb3f0_q6M')