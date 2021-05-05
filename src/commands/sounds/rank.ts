import {EmbedField} from "discord.js";
import {prisma} from "../../services/prisma";
import {StandardEmbed} from "../../structs/standard-embed";
import {Command} from "../../types/command";

export const rank: Command = {
  aliases: ["rank", "top"],
  description: "Shows the top 3 sounds on your soundboard",
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

    const fields: EmbedField[] = sounds
      .sort((a, b) => a.play_count - b.play_count)
      .reverse()
      .slice(0, 3)
      .map((sound, index) => {
        return {
          name: `:${index === 0 ? "first" : index === 1 ? "second" : "third"}_place: ${sound.name}`,
          value: `Played ${sound.play_count} times. Added by <@${sound.added_by}>.`,
          inline: false,
        };
      });

    await message.reply(new StandardEmbed().addFields(fields));
  },
};
