const Discord = require('discord.js');
const client = new Discord.Client();
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

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
        return "Entered a wrong Language";
    }
};

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(!message.author.bot) {
		text = message.content.split('-')[0];
		target = message.content.split('-')[1].trim().toLocaleLowerCase();

		if(target == 'spanish')
			target = 'es'
		if(target == 'french')
			target = 'fr'

		translateText(text, target)
		.then((res) => {
			message.channel.send(res);
		})
		.catch((err) => {
			message.channel.send(err);
		});
	 }
});

client.login(CREDENTIALS.token);
