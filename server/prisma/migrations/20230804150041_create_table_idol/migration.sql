-- CreateTable
CREATE TABLE "Idol" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stanTime" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ad_idolId_fkey" FOREIGN KEY ("idolId") REFERENCES "Idol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("createdAt", "discord", "hourEnd", "hourStart", "id", "idolId", "name", "stanTime", "useVoiceChannel", "weekDays") SELECT "createdAt", "discord", "hourEnd", "hourStart", "id", "idolId", "name", "stanTime", "useVoiceChannel", "weekDays" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
