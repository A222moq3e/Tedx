DROP INDEX "account_userId_idx";--> statement-breakpoint
DROP INDEX "account_provider_idx";--> statement-breakpoint
DROP INDEX "account_providerAccountId_idx";--> statement-breakpoint
DROP INDEX "event_date_idx";--> statement-breakpoint
DROP INDEX "event_presenter_idx";--> statement-breakpoint
DROP INDEX "event_type_idx";--> statement-breakpoint
DROP INDEX "registration_user_idx";--> statement-breakpoint
DROP INDEX "registration_event_idx";--> statement-breakpoint
DROP INDEX "registration_status_idx";--> statement-breakpoint
DROP INDEX "session_userId_idx";--> statement-breakpoint
DROP INDEX "speaker_user_idx";--> statement-breakpoint
ALTER TABLE `tedx_users` ALTER COLUMN "type" TO "type" text(7) DEFAULT 'visitor';--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `tedx_accounts` (`userId`);--> statement-breakpoint
CREATE INDEX `account_provider_idx` ON `tedx_accounts` (`provider`);--> statement-breakpoint
CREATE INDEX `account_providerAccountId_idx` ON `tedx_accounts` (`providerAccountId`);--> statement-breakpoint
CREATE INDEX `event_date_idx` ON `tedx_events` (`date`);--> statement-breakpoint
CREATE INDEX `event_presenter_idx` ON `tedx_events` (`presenterId`);--> statement-breakpoint
CREATE INDEX `event_type_idx` ON `tedx_events` (`type`);--> statement-breakpoint
CREATE INDEX `registration_user_idx` ON `tedx_eventRegistrations` (`userId`);--> statement-breakpoint
CREATE INDEX `registration_event_idx` ON `tedx_eventRegistrations` (`eventId`);--> statement-breakpoint
CREATE INDEX `registration_status_idx` ON `tedx_eventRegistrations` (`status`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `tedx_sessions` (`userId`);--> statement-breakpoint
CREATE INDEX `speaker_user_idx` ON `tedx_speakers` (`userId`);