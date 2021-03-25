require('dotenv').config();
module.exports = (Discord, client, member) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome To ${member.guild.name}`)
    .setAuthor("Roy Ampersand", "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/124546598/original/8c50012ce1a9add1ce367141bfce829e96d0063b/draw-a-cute-anime-manga-girl-face.png")
    .setColor("RANDOM")
    .setDescription(`Hello <@${member.user.id}>, Welcome to *${member.guild.name}*. Thanks For Joining Our Server.
    Please Read ${member.guild.channels.cache.get(process.env.RULES_CHID).toString()}. Have a Nice Time.
    You can chat with server members in <#`+ process.env.CHAT_CHID + '>')
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
    .setFooter('Thank You for joining the server')
    .setImage("https://media.giphy.com/media/2Y6pKnIBJ7UxAvQ2VD/giphy.gif");

    member.guild.channels.cache.get(process.env.WELCOME_CHID).send(embed); 
}





