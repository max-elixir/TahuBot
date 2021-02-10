module.exports = {
    name: 'ping',
    desc: 'Ping command',
    execute(message, args) {
        message.channel.send('Pong!');
    },
};