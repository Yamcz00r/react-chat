-- AlterTable
ALTER TABLE `Message` ADD COLUMN `chatRoomId` INTEGER NULL;

-- CreateTable
CREATE TABLE `ChatRoom` (
    `roomId` INTEGER NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChatRoomToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChatRoomToUser_AB_unique`(`A`, `B`),
    INDEX `_ChatRoomToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `ChatRoom`(`roomId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatRoomToUser` ADD CONSTRAINT `_ChatRoomToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChatRoom`(`roomId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatRoomToUser` ADD CONSTRAINT `_ChatRoomToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
