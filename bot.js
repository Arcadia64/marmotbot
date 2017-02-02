const Discord = require("discord.js");
const bot = new Discord.Client();

var opus = require('node-opus');
var ytdl = require('ytdl-core');

var currentVoiceChannel = "";
var dispatcher = null;
var MarmotWorldChannel = "";

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`);
  MarmotWorldChannel = bot.channels.get("257694889238724608");
});

/* -------- Basic Template ---------
bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
*/

bot.on('message', msg => {
  // ------------ Youtube Stuff ----------
  const streamOptions = { seek: 0, volume: 1 };

  if (msg.content.startsWith('-play')) {
    // Only play song if the user is in voice a channel
    if(msg.member.voiceChannelID !== null){
      msg.member.voiceChannel.join()
      .then(connection => {
        // Once we're in the channel, play the audio stream
        currentVoiceChannel = msg.member.voiceChannel;
        try{
          let youtubeURL = msg.content.slice(7);
          let stream = ytdl(youtubeURL, {filter : 'audioonly'});
          dispatcher = connection.playStream(stream, streamOptions);
          let infoTxt = "";
          ytdl.getInfo(youtubeURL, (error, info)=>{
              MarmotWorldChannel.sendMessage("Now playing: " + info.title);
              msg.delete();
            });
        }catch(error){
          console.log("Invalid Youtube video");
        }
      })
      .catch(console.error);
    }
  }
  // ---------- End Youtube Stuff --------


  // --------- Leave Voice Channel -------
  if (msg.content.startsWith('-leave')) {
    if (bot.voiceChannelID !== null){
      currentVoiceChannel.leave();
    }
  }

});

bot.login('bot token goes here');
