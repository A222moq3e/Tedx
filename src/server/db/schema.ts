import { relations, sql } from "drizzle-orm";
import { index, primaryKey, sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `tedx_${name}`);

// Users table - updated with ERD design + NextAuth compatibility
export const users = createTable("user", (d) => ({
  id: d
    .text({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text({ length: 255 }),
  email: d.text({ length: 255 }).notNull(),
  type: d.text({ length: 50 }).default("normal"), // normal user in most time
  joiningAt: d
    .integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  // NextAuth required fields
  emailVerified: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
  image: d.text({ length: 255 }),
}));

// Events table
export const events = createTable(
  "event",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: d.text({ length: 255 }).notNull(),
    description: d.text(),
    type: d.text({ length: 100 }).notNull(), // e.g., Talk, VR experience, Advice
    date: d.integer({ mode: "timestamp" }).notNull(),
    capacity: d.integer().notNull(),
    presenterId: d
      .text({ length: 255 })
      .references(() => users.id), // nullable
  }),
  (t) => [
    index("event_date_idx").on(t.date),
    index("event_presenter_idx").on(t.presenterId),
    index("event_type_idx").on(t.type),
  ]
);

// Registrations table
export const registrations = createTable(
  "registration",
  (d) => ({
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    eventId: d
      .text({ length: 255 })
      .notNull()
      .references(() => events.id),
    registeredAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    status: d.text({ length: 50 }).default("confirmed"), // confirmed, cancelled, waitlisted
  }),
  (t) => [
    primaryKey({ columns: [t.userId, t.eventId] }),
    index("registration_user_idx").on(t.userId),
    index("registration_event_idx").on(t.eventId),
    index("registration_status_idx").on(t.status),
  ]
);

// Speakers table
export const speakers = createTable(
  "speaker",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    position: d.text({ length: 255 }),
    specialization: d.text({ length: 255 }),
  }),
  (t) => [
    index("speaker_user_idx").on(t.userId),
  ]
);

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  registrations: many(registrations),
  speakerProfile: one(speakers, { fields: [users.id], references: [speakers.userId] }),
  presentedEvents: many(events, { relationName: "presenter" }),
}));

export const eventsRelations = relations(events, ({ many, one }) => ({
  registrations: many(registrations),
  presenter: one(users, { 
    fields: [events.presenterId], 
    references: [users.id],
    relationName: "presenter"
  }),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
  user: one(users, { fields: [registrations.userId], references: [users.id] }),
  event: one(events, { fields: [registrations.eventId], references: [events.id] }),
}));

export const speakersRelations = relations(speakers, ({ one }) => ({
  user: one(users, { fields: [speakers.userId], references: [users.id] }),
}));

// Legacy posts table (keeping for existing functionality)
export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    createdById: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ]
);

// NextAuth required tables
export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.text({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.text({ length: 255 }).notNull(),
    providerAccountId: d.text({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.text({ length: 255 }),
    scope: d.text({ length: 255 }),
    id_token: d.text(),
    session_state: d.text({ length: 255 }),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
    index("account_user_id_idx").on(t.userId),
  ]
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.text({ length: 255 }).notNull().primaryKey(),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.integer({ mode: "timestamp" }).notNull(),
  }),
  (t) => [index("session_userId_idx").on(t.userId)]
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.text({ length: 255 }).notNull(),
    token: d.text({ length: 255 }).notNull(),
    expires: d.integer({ mode: "timestamp" }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);
