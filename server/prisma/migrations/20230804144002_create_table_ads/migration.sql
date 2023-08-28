-- CreateTable
CREATE TABLE "Ad" (
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
