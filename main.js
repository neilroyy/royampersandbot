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

client.once('ready', () => {
    console.log('Roy Ampersand is online!')
    client.user.setActivity('The RA Community',{type: "LISTENING"}).catch(console.error);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot)return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const user = "<@"+message.author.id+">"+"!";

    if(command === "ping"){
        client.commands.get('ping').execute(message, args);
    }
    else if(command === "greet"){
        client.commands.get('greet').execute(message, user);
    }
    else if(command === "rules"){
        client.commands.get('rules').execute(message, Discord);
    }
    else if(command === "kick"){
        client.commands.get('kick').execute(message, args);
    }
    else if(command === "ban"){
        client.commands.get('ban').execute(message, args);
    }
    else if(command === "help"){
        client.commands.get('help').execute(message, Discord);   
    }

});


client.login('ODE5NzAxNzI4NzM5NzIxMjM3.YEqcuQ.qJnW_v9EIdtFpatGiEU-7Ci-oXc')