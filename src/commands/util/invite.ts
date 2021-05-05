import {Command} from "../../types/command";

export const invite: Command = {
  aliases: ["invite"],
  description: "Get a link to invite the bot!",
  syntax: "",
  inhibitors: [],
  async run(message) {
    await message.reply(
      `https://discord.com/oauth2/authorize?scope=bot&client_id=${message.client.user?.id}`
    );
  },
};
