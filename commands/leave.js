module.exports  = {
    name : "leave",
    description : "Leaves voice channel.",
    async execute(client, message ,args, Discord){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel)return message.reply('You need to be in the voice channel to stop the music!');

        await voiceChannel.leave();
        await message.channel.send("Leaving channel! :smiling_face_with_tear:").then(msg => {
            msg.delete({timeout: 1500});
        });
    }
}