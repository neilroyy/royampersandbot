module.exports = {
    name: 'rules',
    description: "displays the RA Server Rules",
    execute(client, message, cmd, args, Discord, user){
       
            const embed = new Discord.MessageEmbed()
                    .setColor('#E539FF')
                    .setTitle('RA Server Rules')
                    .setDescription('Please read the rules carefully.')
                    .addFields(
                        {name: '#1' , value: 'No spamming chats including excessive posting of irrelevant images or taking up voice channels with white noise.'},
                        {name: '#2' , value: 'Abusive language, slangs or comments which might offend someone are prohibited from being used in any text channels or VC.'},
                        {name: '#3' , value: 'Posting of degraded, hate inspiring images/videos is strictly prohibited.'},
                        {name: '#4' , value: 'Do not argue with Moderators, their decision is final.'},
                        {name: '#5' , value: 'Do not impersonate another user.'},
                        {name: '#6' , value: 'DM RA Support Bot for concerns regarding the server.'}
                    )
                    .setImage('http://www.nightdramashorts.com/wp-content/uploads/2020/03/12_rules_of_simply_investing-1760w-1100h1.jpg')
                    .setFooter('Make sure to check out the rules in '+message.guild.channels.cache.get('696278316574834729').toString());
                    message.channel.send(embed);
            }
    
    
}