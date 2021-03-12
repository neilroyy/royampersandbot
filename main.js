const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Roy Ampersand is online!')
    client.user.setActivity('The RA Community',{type: "LISTENING"}).catch(console.error);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel){
        console.log("Channel Not Found");
        return;
    };

    channel.send('Welcome to Roy Ampersand, $(member), please read the rules before proceeding!')
})


client.login('ODE5NzAxNzI4NzM5NzIxMjM3.YEqcuQ.qJnW_v9EIdtFpatGiEU-7Ci-oXc');
