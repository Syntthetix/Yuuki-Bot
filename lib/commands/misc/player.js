const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class PlayCommand extends Command {
  constructor (client) {
    super (client, {
      name: "play",
      group: "misc",
      memberName: "play",
      description: "Plays a youtube video in the current voice channel, with some premade arguments",
      guildOnly: true,
      details: "",
      args: [
        {
          key: "video",
          prompt: "What video would you like to play in the VC? (Can be a youtube URL or one of the *super secret preset videos oooooooooo*)",
          type: "string"
        }
      ],
      examples: [".yu play <YouTube URL>", ".yu play nut", ".yu play dc (disconnect from VC)"]
    })
  };



  async run(msg, { video, vol }) {
    const streamOptions = { seek: 0, volume: 0.2 };
    const vc = msg.member.voiceChannel;

    if (!vc) {
      return msg.reply("Join a voice channel and try again!");
    }

    if (video === "nut") {
      vc.join()
        .then(connection => {
          const stream = ytdl('https://www.youtube.com/watch?v=zvo4wy-FgiU', { filter: 'audioonly' });
          const dispatcher = connection.playStream(stream, streamOptions);
        }).catch(console.error);

    } else if (video === "dc") {
      vc.leave();
      msg.reply("Bye!");

    } else {
      vc.join()
        .then(connection => {
          const stream = ytdl(video, { filter: 'audioonly' });
          const dispatcher = connection.playStream(stream, streamOptions);
        }).catch(console.error);
    }
  }
}