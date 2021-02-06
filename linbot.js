const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const axios = require('axios');
const client = new Discord.Client();

const translate = (_message, original) => {

	const config = {
		headers: {
			'Ocp-Apim-Subscription-Key': '398d6dd6a9a84dc7b8df5a4295224d3e',
			'Content-Type': 'application/json',
		}
	}

	const body = `[{'Text':'${original}'}]`;

	axios.post(
		'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es', 
		body,
		config,)
  .then((response) => {
	_message.channel.send('done');
   
  });
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.toLowerCase() === `hello`) {
		message.channel.send(`Hey ${message.author} how's it going guys?`);
		translate(message);
	}
});

client.login(token);
