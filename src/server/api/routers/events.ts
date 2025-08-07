import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { events } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const eventsRouter = createTRPCRouter({
  // Create event
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        type: z.string().min(1),
        date: z.date(),
        capacity: z.number().positive(),
        presenterId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [event] = await ctx.db
        .insert(events)
        .values({
          name: input.name,
          description: input.description,
          type: input.type,
          date: input.date,
          capacity: input.capacity,
          presenterId: input.presenterId,
        })
        .returning();
      return event;
    }),

  // Get all events
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(events);
  }),

  // Get event by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [event] = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.id));
      return event;
    }),

  // Get events by type
  getByType: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(events)
        .where(eq(events.type, input.type));
    }),

  // Get events by presenter
  getByPresenter: publicProcedure
    .input(z.object({ presenterId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(events)
        .where(eq(events.presenterId, input.presenterId));
    }),

  // Update event
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        type: z.string().min(1).optional(),
        date: z.date().optional(),
        capacity: z.number().positive().optional(),
        presenterId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const [updatedEvent] = await ctx.db
        .update(events)
        .set(updateData)
        .where(eq(events.id, id))
        .returning();
      return updatedEvent;
    }),

  // Delete event
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(events).where(eq(events.id, input.id));
      return { success: true };
    }),
}); 