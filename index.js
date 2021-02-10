const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { prefix, token } = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});
client.login(token);

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message=> {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return message.reply('Invalid command');
    const command = client.commands.get(commandName);
    if(!args.length) {
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('ERROR:')
            .setDescription(`No arguments for command: ${command.name}`)
            .setFooter('Bot Error Log')
            .addField('Code', '000xp', true)
            .addFields(
                { name: 'Name', value: 'value', inline: true },
                { name: 'Name2', value: 'value2', inline: true },
            )
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/759192495782625292/809149383588446268/156dfhdfdf7274163966.gif')
            .setThumbnail('https://snz04pap002files.storage.live.com/y4mFicz3CTkgJbCD75iiYO-sEnIJ8EAKVfGtdAVci6qc5z-TYgIV5enIAfsDNU6BS3qnz1E2fkaF01ZVwwiYD1xda7TGSWKL-x2TbBCwZ8QSZ5QQtuFt1mA5h_8dQwPj8Scou8gmuuc8Fy_LhHeP_fF8Ghe-vTZef0_RndrMbFMPGkbKvODI4IcwmgkyxgblYmD?width=166&height=142&cropmode=none');
        return message.channel.send(embed);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Invalid command');
    }

    /* if (command === 'args') {
        if (!args.length) {
            return message.channel.send(`${message.author} - No arguments submiited for command: ${command}`);
        } else if (args[0] === 'cat') {
            return message.channel.send('Meoew');
        }
    } else if (command === 'ban') {
        const tagged = message.mentions.users.first();
        message.channel.send(`\`\`\`Ban user ${tagged.username}?\`\`\``);
        return;
    } else {
        return message.channel.send(`${message.author} - Invalid argument`);
    }

    message.channel.send(`${command} ${args}`);*/
});