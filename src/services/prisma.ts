import {PrismaClient, Sound} from "@prisma/client";

export const prisma = new PrismaClient();

/**
 * Find a sound by name
 * @param name
 */
export function findSoundByName(name: string): Promise<Sound | null> {
  return prisma.sound.findFirst({
    where: {name},
  });
}
