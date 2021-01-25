const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.toLowerCase() === `hello`) {
		message.channel.send(`Hey ${message.author} how's it going?`);
	}
});

client.login(token);

//https://discord.com/api/oauth2/authorize?client_id=801952651860115496&scope=bot