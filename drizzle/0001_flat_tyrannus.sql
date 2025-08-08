ALTER TABLE `tedx_event` RENAME TO `tedx_events`;--> statement-breakpoint
ALTER TABLE `tedx_registration` RENAME TO `tedx_registrations`;--> statement-breakpoint
ALTER TABLE `tedx_session` RENAME TO `tedx_sessions`;--> statement-breakpoint
ALTER TABLE `tedx_speaker` RENAME TO `tedx_speakers`;--> statement-breakpoint
ALTER TABLE `tedx_user` RENAME TO `tedx_users`;--> statement-breakpoint
ALTER TABLE `tedx_verification_token` RENAME TO `tedx_verificationTokens`;--> statement-breakpoint
DROP TABLE `tedx_account`;--> statement-breakpoint
DROP TABLE `tedx_post`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tedx_events` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`description` text,
	`type` text(100) NOT NULL,
	`date` integer NOT NULL,
	`capacity` integer NOT NULL,
	`presenterId` text(255),
	FOREIGN KEY (`presenterId`) REFERENCES `tedx_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tedx_events`("id", "name", "description", "type", "date", "capacity", "presenterId") SELECT "id", "name", "description", "type", "date", "capacity", "presenterId" FROM `tedx_events`;--> statement-breakpoint
DROP TABLE `tedx_events`;--> statement-breakpoint
ALTER TABLE `__new_tedx_events` RENAME TO `tedx_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `event_date_idx` ON `tedx_events` (`date`);--> statement-breakpoint
CREATE INDEX `event_presenter_idx` ON `tedx_events` (`presenterId`);--> statement-breakpoint
CREATE INDEX `event_type_idx` ON `tedx_events` (`type`);--> statement-breakpoint
CREATE TABLE `__new_tedx_registrations` (
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL,
	`registeredAt` integer DEFAULT (unixepoch()) NOT NULL,
	`status` text(50) DEFAULT 'confirmed',
	PRIMARY KEY(`userId`, `eventId`),
	FOREIGN KEY (`userId`) REFERENCES `tedx_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`eventId`) REFERENCES `tedx_events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tedx_registrations`("userId", "eventId", "registeredAt", "status") SELECT "userId", "eventId", "registeredAt", "status" FROM `tedx_registrations`;--> statement-breakpoint
DROP TABLE `tedx_registrations`;--> statement-breakpoint
ALTER TABLE `__new_tedx_registrations` RENAME TO `tedx_registrations`;--> statement-breakpoint
CREATE INDEX `registration_user_idx` ON `tedx_registrations` (`userId`);--> statement-breakpoint
CREATE INDEX `registration_event_idx` ON `tedx_registrations` (`eventId`);--> statement-breakpoint
CREATE INDEX `registration_status_idx` ON `tedx_registrations` (`status`);--> statement-breakpoint
CREATE TABLE `__new_tedx_sessions` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `tedx_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tedx_sessions`("sessionToken", "userId", "expires") SELECT "sessionToken", "userId", "expires" FROM `tedx_sessions`;--> statement-breakpoint
DROP TABLE `tedx_sessions`;--> statement-breakpoint
ALTER TABLE `__new_tedx_sessions` RENAME TO `tedx_sessions`;--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `tedx_sessions` (`userId`);--> statement-breakpoint
CREATE TABLE `__new_tedx_speakers` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`position` text(255),
	`specialization` text(255),
	FOREIGN KEY (`userId`) REFERENCES `tedx_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tedx_speakers`("id", "userId", "position", "specialization") SELECT "id", "userId", "position", "specialization" FROM `tedx_speakers`;--> statement-breakpoint
DROP TABLE `tedx_speakers`;--> statement-breakpoint
ALTER TABLE `__new_tedx_speakers` RENAME TO `tedx_speakers`;--> statement-breakpoint
CREATE INDEX `speaker_user_idx` ON `tedx_speakers` (`userId`);