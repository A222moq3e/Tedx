import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { registrations, events, users } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const eventRegistrationsRouter = createTRPCRouter({
  // Create registration
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        eventId: z.string(),
        status: z.string().optional().default("confirmed"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [registration] = await ctx.db
        .insert(registrations)
        .values({
          userId: input.userId,
          eventId: input.eventId,
          status: input.status,
        })
        .returning();
      return registration;
    }),

  // Get all registrations
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        userId: registrations.userId,
        eventId: registrations.eventId,
        registeredAt: registrations.registeredAt,
        status: registrations.status,
        userName: users.name,
        userEmail: users.email,
        eventName: events.name,
        eventType: events.type,
        eventDate: events.date,
      })
      .from(registrations)
      .leftJoin(users, eq(registrations.userId, users.id))
      .leftJoin(events, eq(registrations.eventId, events.id));
  }),

  // Get registration by user and event
  getByUserAndEvent: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        eventId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const [registration] = await ctx.db
        .select()
        .from(registrations)
        .where(
          and(
            eq(registrations.userId, input.userId),
            eq(registrations.eventId, input.eventId)
          )
        );
      return registration;
    }),

  // Get registrations by user
  getByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          userId: registrations.userId,
          eventId: registrations.eventId,
          registeredAt: registrations.registeredAt,
          status: registrations.status,
          eventName: events.name,
          eventType: events.type,
          eventDate: events.date,
          eventCapacity: events.capacity,
        })
        .from(registrations)
        .leftJoin(events, eq(registrations.eventId, events.id))
        .where(eq(registrations.userId, input.userId));
    }),

  // Get registrations by event
  getByEvent: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          userId: registrations.userId,
          eventId: registrations.eventId,
          registeredAt: registrations.registeredAt,
          status: registrations.status,
          userName: users.name,
          userEmail: users.email,
          userType: users.type,
        })
        .from(registrations)
        .leftJoin(users, eq(registrations.userId, users.id))
        .where(eq(registrations.eventId, input.eventId));
    }),

  // Update registration status
  update: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        eventId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedRegistration] = await ctx.db
        .update(registrations)
        .set({ status: input.status })
        .where(
          and(
            eq(registrations.userId, input.userId),
            eq(registrations.eventId, input.eventId)
          )
        )
        .returning();
      return updatedRegistration;
    }),

  // Delete registration
  delete: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(registrations)
        .where(
          and(
            eq(registrations.userId, input.userId),
            eq(registrations.eventId, input.eventId)
          )
        );
      return { success: true };
    }),
});