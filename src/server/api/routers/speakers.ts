import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { speakers, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const speakersRouter = createTRPCRouter({
  // Create speaker
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        position: z.string().optional(),
        specialization: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [speaker] = await ctx.db
        .insert(speakers)
        .values({
          userId: input.userId,
          position: input.position,
          specialization: input.specialization,
        })
        .returning();
      return speaker;
    }),

  // Get all speakers
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: speakers.id,
        userId: speakers.userId,
        position: speakers.position,
        specialization: speakers.specialization,
        userName: users.name,
        userEmail: users.email,
        userType: users.type,
      })
      .from(speakers)
      .leftJoin(users, eq(speakers.userId, users.id));
  }),

  // Get speaker by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [speaker] = await ctx.db
        .select({
          id: speakers.id,
          userId: speakers.userId,
          position: speakers.position,
          specialization: speakers.specialization,
          userName: users.name,
          userEmail: users.email,
          userType: users.type,
        })
        .from(speakers)
        .leftJoin(users, eq(speakers.userId, users.id))
        .where(eq(speakers.id, input.id));
      return speaker;
    }),

  // Get speaker by user ID
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [speaker] = await ctx.db
        .select({
          id: speakers.id,
          userId: speakers.userId,
          position: speakers.position,
          specialization: speakers.specialization,
          userName: users.name,
          userEmail: users.email,
          userType: users.type,
        })
        .from(speakers)
        .leftJoin(users, eq(speakers.userId, users.id))
        .where(eq(speakers.userId, input.userId));
      return speaker;
    }),

  // Get speakers by specialization
  getBySpecialization: publicProcedure
    .input(z.object({ specialization: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: speakers.id,
          userId: speakers.userId,
          position: speakers.position,
          specialization: speakers.specialization,
          userName: users.name,
          userEmail: users.email,
          userType: users.type,
        })
        .from(speakers)
        .leftJoin(users, eq(speakers.userId, users.id))
        .where(eq(speakers.specialization, input.specialization));
    }),

  // Update speaker
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        position: z.string().optional(),
        specialization: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const [updatedSpeaker] = await ctx.db
        .update(speakers)
        .set(updateData)
        .where(eq(speakers.id, id))
        .returning();
      return updatedSpeaker;
    }),

  // Delete speaker
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(speakers).where(eq(speakers.id, input.id));
      return { success: true };
    }),

  // Delete speaker by user ID
  deleteByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(speakers).where(eq(speakers.userId, input.userId));
      return { success: true };
    }),
});