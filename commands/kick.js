module.exports = {
    name : 'kick',
    description : 'kick members moderation command',
    execute(client, message ,args, Discord){

        const member = message.mentions.users.first();

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send('User has been kicked.');
        }
        else{
            message.channel.send('You could not kick that member');
        }
    }
}