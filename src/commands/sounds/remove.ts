import {manageMessages} from "../../inhibitors/permissions/manage-messages";
import {prisma} from "../../services/prisma";
import {Command} from "../../types/command";

export const remove: Command = {
  aliases: ["remove", "rem"],
  description: "Remove a sound from your soundboard",
  syntax: "<message>",
  inhibitors: [manageMessages],
  async run(message, args) {
    if (!args[0] || args.length > 1) {
      throw new Error('message syntax incorrect. Please retry using ".remove <name>".');
    }

    if (!message.guild) {
      return;
    }

    const sound = await prisma.sound.findFirst({
      where: {
        guild_id: message.guild.id,
        name: args[0],
      },
    });

    if (!sound) {
      throw new Error("could not find sound with that name! Please try again.");
    }

    await prisma.sound.delete({where: {id: sound.id}});
    await message.reply(`successfully removed ${sound.name} from your soundboard.`);
  },
};
