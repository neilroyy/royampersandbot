const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const message = require('../events/guild/message');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'queue', 'q', 'p', 'n', 'np'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(client, message, cmd, args, Discord, user){


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play'|| cmd === 'p'){
            if (!args.length) return message.channel.send('You need to send the second argument!');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0], Discord);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`__*${song.title}*__ added to queue!`)
                return message.channel.send(embed);
            }
        }

        else if(cmd === 'skip' || cmd === 'n') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'queue'|| cmd === 'q') display_queue(message, server_queue, Discord);
        else if(cmd === 'np') now_playing(message, server_queue, Discord);
    }
    
}

const now_playing = async (message, server_queue, Discord) => {
    const song_queue = queue.get(message.guild.id);
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Now Playing')
    .setDescription(`${song_queue.songs[0].title}`);
    message.channel.send(embed);
}

const display_queue = async (message, server_queue, Discord) => {
    var count = 1;
    var string = "";
    for (const song in server_queue.songs){
        var str = (count+'> '+server_queue.songs[song].title+'\n');
        count++;
        string += str;
    }
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(string);

    message.channel.send(embed);

}

const video_player = async (guild, song, Discord) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0], Discord);
    });
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Now Playing')
    .setDescription(`${song_queue.songs[0].title}`);
    await song_queue.text_channel.send(embed);
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}