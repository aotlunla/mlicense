-- Create Database (Optional)
CREATE DATABASE IF NOT EXISTS mlicense_db;
USE mlicense_db;

-- Table: Admin
CREATE TABLE IF NOT EXISTS `Admin` (
    `id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Admin_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table: License
CREATE TABLE IF NOT EXISTS `License` (
    `id` VARCHAR(36) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `maxSites` INTEGER NOT NULL DEFAULT 1,
    `validFrom` DATETIME(3) NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `License_key_key`(`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table: RegisteredSite
CREATE TABLE IF NOT EXISTS `RegisteredSite` (
    `id` VARCHAR(36) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `licenseId` VARCHAR(36) NOT NULL,
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastCheckedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `RegisteredSite_licenseId_url_key`(`licenseId`, `url`),
    CONSTRAINT `RegisteredSite_licenseId_fkey` FOREIGN KEY (`licenseId`) REFERENCES `License`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed Data: Default Admin (admin / password123)
-- The password hash is for 'password123' generated via bcrypt
INSERT INTO `Admin` (`id`, `username`, `passwordHash`, `createdAt`)
VALUES (
    UUID(), 
    'admin', 
    '$2b$10$Gd/aMDKbhDJuA63E/lJMyuN27g0.qhy2m0A0m4TwRxHKxB7sEDFhy', -- Hash for 'password123'
    NOW()
);

-- Note: The hash for 'password123' used in the Node.js seed script was:
-- $2b$10$YourActualHashHere
-- Since we can't easily generate a bcrypt hash in SQL, here is a command to run if you have the Node app:
-- npm run prisma db seed
