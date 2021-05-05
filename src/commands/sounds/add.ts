import {manageMessages} from "../../inhibitors/permissions/manage-messages";
import {prisma} from "../../services/prisma";
import {Command} from "../../types/command";

export const add: Command = {
  aliases: ["add"],
  description: "Add a sound to your soundboard",
  syntax: "<message>",
  inhibitors: [manageMessages],
  async run(message, args) {
    if (args.length > 2 || args.length === 0 || !args[1]) {
      throw new Error('message syntax incorrect. Please retry using ".add <name> <youtube link>"');
    }

    if (!message.guild) {
      return;
    }

    if (!!/https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9\-_]{11}/gm.test(args[2])) {
      throw new Error("invalid youtube link. Please try again.");
    }

    const sound = await prisma.sound.findFirst({
      where: {
        guild_id: message.guild.id,
        name: args[0],
      },
    });

    if (sound) {
      throw new Error("sound with that name already exists. Try again with another name.");
    }

    await prisma.sound.create({
      data: {
        guild_id: message.guild.id,
        name: args[0],
        added_by: message.author.id,
        url: args[1],
      },
    });
    await message.reply(`successfully added ${args[0]} to your soundboard.`);
  },
};
