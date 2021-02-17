const Discord = require('discord.js');
const client = new Discord.Client();
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const settings = [];

const translate = new Translate({
	credentials: CREDENTIALS,
	projectId: CREDENTIALS.project_id
});

const translateText = async (text, target) => {
	try {
		let [response] = await translate.translate(text, target);
		return response;
	} catch (error) {
		console.log(`Error at translateText --> ${error}`);
		return 'Entered a wrong Language';
	}
};

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.author.bot) {
		// if user enters linstop
		// erase setting entry
		if (message.content.toLocaleLowerCase() === 'linbot stop') {
			delete settings[message.author];
			message.channel.send('Linbot has stopped');
			return;
		}

		// if user enters - language
		// add language setting
		if ((message.content.toLocaleLowerCase().indexOf('linbot ') >= 0)) {
			target = message.content.split(' ')[1].trim().toLocaleLowerCase();
			settings[message.author] = target;
			message.channel.send(`Language set to [${settings[message.author]}]`);
			return;
		}

		// if user does not have a setting, return
		if (!settings[message.author]) {
			return;
		}

		// translate 
		translateText(message.content, settings[message.author])
			.then((res) => {
				message.channel.send(res);
			})
			.catch((err) => {
				message.channel.send(err);
			});
	}
});

client.login(CREDENTIALS.token);
