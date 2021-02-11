module.exports = {
    name: 'massdelete',
    description: 'Delete multiple messages in the channel',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
        if (isNaN(amount) || (amount <= 1 || amount > 50)) {
            return message.channel.send(`Invalid amount: ${amount}. Valid only from 2 to 50.`);
        }
        message.channel.bulkDelete(amount);
    },
};