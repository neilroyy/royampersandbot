module.exports = (Discord, client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('The RA Community',{type: "LISTENING"}).catch(console.error);

}