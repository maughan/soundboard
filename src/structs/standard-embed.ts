import {MessageEmbed, MessageEmbedOptions} from "discord.js";

export class StandardEmbed extends MessageEmbed {
  constructor(data?: StandardEmbed | MessageEmbedOptions) {
    super(data);

    this.setTimestamp()
      .setColor("#36393F")
      .setFooter("SoundByter")
      .setAuthor("SoundByter", "https://cdn.discordapp.com/embed/avatars/0.png");
  }
}
