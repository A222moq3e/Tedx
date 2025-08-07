CREATE TABLE `tedx_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `tedx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `tedx_account` (`userId`);--> statement-breakpoint
CREATE TABLE `tedx_event` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`description` text,
	`type` text(100) NOT NULL,
	`date` integer NOT NULL,
	`capacity` integer NOT NULL,
	`presenterId` text(255),
	FOREIGN KEY (`presenterId`) REFERENCES `tedx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `event_date_idx` ON `tedx_event` (`date`);--> statement-breakpoint
CREATE INDEX `event_presenter_idx` ON `tedx_event` (`presenterId`);--> statement-breakpoint
CREATE INDEX `event_type_idx` ON `tedx_event` (`type`);--> statement-breakpoint
CREATE TABLE `tedx_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdById` text(255) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`createdById`) REFERENCES `tedx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `tedx_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `tedx_post` (`name`);--> statement-breakpoint
CREATE TABLE `tedx_registration` (
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL,
	`registeredAt` integer DEFAULT (unixepoch()) NOT NULL,
	`status` text(50) DEFAULT 'confirmed',
	PRIMARY KEY(`userId`, `eventId`),
	FOREIGN KEY (`userId`) REFERENCES `tedx_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`eventId`) REFERENCES `tedx_event`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `registration_user_idx` ON `tedx_registration` (`userId`);--> statement-breakpoint
CREATE INDEX `registration_event_idx` ON `tedx_registration` (`eventId`);--> statement-breakpoint
CREATE INDEX `registration_status_idx` ON `tedx_registration` (`status`);--> statement-breakpoint
CREATE TABLE `tedx_session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `tedx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `tedx_session` (`userId`);--> statement-breakpoint
CREATE TABLE `tedx_speaker` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`position` text(255),
	`specialization` text(255),
	FOREIGN KEY (`userId`) REFERENCES `tedx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `speaker_user_idx` ON `tedx_speaker` (`userId`);--> statement-breakpoint
CREATE TABLE `tedx_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`type` text(50) DEFAULT 'normal',
	`joiningAt` integer DEFAULT (unixepoch()) NOT NULL,
	`emailVerified` integer DEFAULT (unixepoch()),
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `tedx_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
