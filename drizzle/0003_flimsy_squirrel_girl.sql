CREATE TABLE `tedx_accounts` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text(255),
	`access_token` text(255),
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text(2048),
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `tedx_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `tedx_accounts` (`userId`);--> statement-breakpoint
CREATE INDEX `account_provider_idx` ON `tedx_accounts` (`provider`);--> statement-breakpoint
CREATE INDEX `account_providerAccountId_idx` ON `tedx_accounts` (`providerAccountId`);