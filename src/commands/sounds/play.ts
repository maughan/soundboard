import {Command} from "../../types/command";
import ytdl from "ytdl-core";
import {prisma} from "../../services/prisma";

export const play: Command = {
  aliases: ["play"],
  description: "Play a sound from your soundboard",
  syntax: "<message>",
  inhibitors: [],
  async run(message, args) {
    let servers: any = {};
    if (!message.guild) {
      return;
    }

    if (args.length > 2 || !args.length) {
      throw new Error('message syntax incorrect. Please retry using ".play <name>"');
    }

    if (!message.member?.voice.channel) {
      throw new Error("you must be in a voice channel to play sounds.");
    }

    const sound = await prisma.sound.findFirst({
      where: {
        guild_id: message.guild.id,
        name: args[0],
      },
    });

    if (!sound) {
      throw new Error("could not find sound with that name. Please try again.");
    }

    if (!servers[message.guild.id])
      servers[message.guild.id] = {
        queue: [],
      };

    if (!message.guild.voice?.connection) {
      message.member.voice.channel?.join().then(async function (connection) {
        connection.play(ytdl(sound.url, {filter: "audioonly"}));
        await prisma.sound.update({
          where: {
            id: sound.id,
          },
          data: {
            ...sound,
            play_count: sound.play_count + 1,
          },
        });
        await message.reply(
          `playing ${sound.name}! ${sound.name} has been played ${sound.play_count + 1} times!`
        );
      });
    } else {
      message.guild.voice?.connection.play(ytdl(sound.url, {filter: "audioonly"}));
      await prisma.sound.update({
        where: {
          id: sound.id,
        },
        data: {
          ...sound,
          play_count: sound.play_count + 1,
        },
      });
      await message.reply(
        `playing ${sound.name}! ${sound.name} has been played ${sound.play_count + 1} times!`
      );
    }
  },
};
