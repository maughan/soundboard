/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Sound" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "added_by" TEXT NOT NULL,
    "play_count" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);
