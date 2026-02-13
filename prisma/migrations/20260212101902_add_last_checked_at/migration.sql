-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegisteredSite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastCheckedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RegisteredSite_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RegisteredSite" ("id", "licenseId", "registeredAt", "url") SELECT "id", "licenseId", "registeredAt", "url" FROM "RegisteredSite";
DROP TABLE "RegisteredSite";
ALTER TABLE "new_RegisteredSite" RENAME TO "RegisteredSite";
CREATE UNIQUE INDEX "RegisteredSite_licenseId_url_key" ON "RegisteredSite"("licenseId", "url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
