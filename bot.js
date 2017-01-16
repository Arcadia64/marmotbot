const Discord = require("discord.js");
const bot = new Discord.Client();

var ytdl = require('ytdl-core');



bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login('MjU1NDgzNDg1NTg4OTQ2OTQ0.C1y-cQ.0OEf-lPm5Ya0gFyICrRqbpO9qpA');
