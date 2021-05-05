import {Command} from "../../types/command";

export const stop: Command = {
  aliases: ["stop", "fuckoff", "pause"],
  description: "Stop a sound that is playing from your soundboard",
  syntax: "<message>",
  inhibitors: [],
  async run(message) {
    if (!message.guild) {
      return;
    }

    if (!message.guild.voice?.connection) {
      throw new Error("No sound currently playing.");
    } else {
      message.guild.voice.connection.disconnect();
    }
  },
};
