import {Command} from "../types/command";

import {ping} from "./util/ping";
import {add} from "./sounds/add";
import {remove} from "./sounds/remove";
import {play} from "./sounds/play";
import {redisExample} from "./util/redis-example";
import {stop} from "./sounds/stop";
import {list} from "./sounds/list";
import {rank} from "./sounds/rank";
import {invite} from "./util/invite";

/**
 * An array of all commands available for the bot.
 * To register a command, all you have to do is place it in this array
 */
export const commands: Command[] = [
  ping,
  redisExample,
  add,
  remove,
  play,
  stop,
  list,
  invite,
  rank,
];

const commandsWithAliases = commands.reduce((all, command) => {
  // Dedupe aliases
  const aliases = [...new Set(command.aliases)];

  return aliases.reduce((previous, commandName) => {
    return {...previous, [commandName]: command};
  }, all);
}, {} as Record<string, Command>);

export const aliases = new Map<string, Command>(Object.entries(commandsWithAliases));

const allCommandAliases = commands.map(c => c.aliases).flat();

const duplicateAliases = allCommandAliases.filter((c, i, a) => a.indexOf(c) !== i);

if (duplicateAliases.length > 0) {
  throw new Error(`Encountered duplicate aliases: ${duplicateAliases.join(", ")}`);
}
