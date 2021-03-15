module.exports = {
    name: 'help',
    description: "displays the command help for this bot",
    execute(message, Discord){
       
            const embed = new Discord.MessageEmbed()
                    .setColor('#E539FF')
                    .setTitle('RA Bot Commands')
                    .setDescription('This bot is under development.')
                    .addFields(
                        {name: 'greet' , value: 'A simple greeting from us.'},
                        {name: 'kick/ban' , value: 'Basic moderation tools.'},
                        {name: 'ping' , value: 'Displays API Latency.'},
                        {name: 'rules' , value: 'Displays the rules of the server.'},
                    )
                    .setImage('https://contenthub-static.grammarly.com/blog/wp-content/uploads/2018/05/how-to-ask-for-help.jpg');
                    message.channel.send(embed);
            }
    
    
}