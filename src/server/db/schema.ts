import { relations, sql } from "drizzle-orm";
import { index, primaryKey, sqliteTableCreator } from "drizzle-orm/sqlite-core";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `tedx_${name}`);

// Users table - updated with ERD design + NextAuth compatibility
export const users = createTable("users", (d) => ({
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
  "events",
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
  "eventRegistrations",
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
  "speakers",
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



// NextAuth required tables (keeping only sessions and verificationTokens)

export const sessions = createTable(
  "sessions",
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
  "verificationTokens",
  (d) => ({
    identifier: d.text({ length: 255 }).notNull(),
    token: d.text({ length: 255 }).notNull(),
    expires: d.integer({ mode: "timestamp" }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);
