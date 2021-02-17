const Discord = require('discord.js');
const client = new Discord.Client();
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const target = 'es';

const translateText = async (text) => {
    try {
        let [response] = await translate.translate(text, target);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(!message.author.bot) {
		translateText(message.content)
		.then((res) => {
			message.channel.send(res);
		})
		.catch((err) => {
			message.channel.send(err);
		});
	 }
});

client.login(CREDENTIALS.token);
