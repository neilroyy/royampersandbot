module.exports = {
    name : "clear",
    description: "clears messages",
    async execute(message, args){
        if(!args[0])return message.reply("Please enter the no. of texts to be cleared.");
        if(isNaN(args[0]))return message.reply("Please enter a real number");
        if(args[0]> 101)return message.reply("Max limit is 100");
        if(args[0]< 1)return message.reply("Seriously?");
        await message.channel.messages.fetch({limit : args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
            message.channel.send("Deleted successfully!").then(msg => {
                msg.delete({timeout: 1500});
            });
        });
    }
}