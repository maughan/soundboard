import {EmbedField} from "discord.js";
import {prisma} from "../../services/prisma";
import {StandardEmbed} from "../../structs/standard-embed";
import {Command} from "../../types/command";

export const list: Command = {
  aliases: ["list", "li", "l"],
  description: "List all sounds on your soundboard",
  syntax: "<message>",
  inhibitors: [],
  async run(message) {
    if (!message.guild) {
      return;
    }

    // todo: regex for valid youtube link
    const sounds = await prisma.sound.findMany({
      where: {
        guild_id: message.guild.id,
      },
    });

    const fields: EmbedField[] = sounds.map(sound => {
      return {
        name: sound.name,
        value: `Played ${sound.play_count} times. Added by <@${sound.added_by}>.`,
        inline: true,
      };
    });

    await message.reply(new StandardEmbed().addFields(fields));
  },
};
