ALTER TABLE `tedx_registrations` RENAME TO `tedx_eventRegistrations`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tedx_eventRegistrations` (
	`userId` text(255) NOT NULL,
	`eventId` text(255) NOT NULL,
	`registeredAt` integer DEFAULT (unixepoch()) NOT NULL,
	`status` text(50) DEFAULT 'confirmed',
	PRIMARY KEY(`userId`, `eventId`),
	FOREIGN KEY (`userId`) REFERENCES `tedx_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`eventId`) REFERENCES `tedx_events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tedx_eventRegistrations`("userId", "eventId", "registeredAt", "status") SELECT "userId", "eventId", "registeredAt", "status" FROM `tedx_eventRegistrations`;--> statement-breakpoint
DROP TABLE `tedx_eventRegistrations`;--> statement-breakpoint
ALTER TABLE `__new_tedx_eventRegistrations` RENAME TO `tedx_eventRegistrations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `registration_user_idx` ON `tedx_eventRegistrations` (`userId`);--> statement-breakpoint
CREATE INDEX `registration_event_idx` ON `tedx_eventRegistrations` (`eventId`);--> statement-breakpoint
CREATE INDEX `registration_status_idx` ON `tedx_eventRegistrations` (`status`);