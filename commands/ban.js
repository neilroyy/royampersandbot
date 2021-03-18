module.exports = {
    name : 'ban',
    description : 'ban members moderation command',
    execute(client, message ,args, Discord, user){
        const member = message.mentions.users.first();

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send('User has been banned.');
        }
        else{
            message.channel.send('You could not ban that member');
        }
    }
}