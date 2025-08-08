import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users, speakers } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  // Create user
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        type: z.string().optional().default("visitor"),
        // Speaker-specific fields (only required when type is "speaker")
        position: z.string().optional(),
        specialization: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Creating user:", input);
      
      // Create user first
      const [user] = await ctx.db
        .insert(users)
        .values({
          name: input.name,
          email: input.email,
          type: input.type,
        })
        .returning();

      // If user is a speaker, create speaker profile
      if (input.type === "speaker") {
        await ctx.db
          .insert(speakers)
          .values({
            userId: user.id,
            position: input.position || null,
            specialization: input.specialization || null,
          });
        
        console.log("Created speaker profile for user:", user.id);
      }

      return user;
    }),

  // Get all users
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(users);
  }),

  // Get user by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, input.id));
      return user;
    }),

  // Update user
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        type: z.string().optional(),
        // Speaker-specific fields
        position: z.string().optional(),
        specialization: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, position, specialization, ...updateData } = input;
      
      // Get current user to check type changes
      const [currentUser] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, id));

      // Update user
      const [updatedUser] = await ctx.db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();

      // Handle speaker profile changes
      if (updatedUser.type === "speaker") {
        // Check if speaker profile exists
        const [existingSpeaker] = await ctx.db
          .select()
          .from(speakers)
          .where(eq(speakers.userId, id));

        if (existingSpeaker) {
          // Update existing speaker profile
          await ctx.db
            .update(speakers)
            .set({
              position: position || existingSpeaker.position,
              specialization: specialization || existingSpeaker.specialization,
            })
            .where(eq(speakers.userId, id));
        } else {
          // Create new speaker profile
          await ctx.db
            .insert(speakers)
            .values({
              userId: id,
              position: position || null,
              specialization: specialization || null,
            });
        }
      } else if (currentUser?.type === "speaker" && updatedUser.type !== "speaker") {
        // User was a speaker but no longer is - remove speaker profile
        await ctx.db
          .delete(speakers)
          .where(eq(speakers.userId, id));
      }

      return updatedUser;
    }),

  // Delete user
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Delete speaker profile first (if exists)
      await ctx.db
        .delete(speakers)
        .where(eq(speakers.userId, input.id));
      
      // Then delete user
      await ctx.db
        .delete(users)
        .where(eq(users.id, input.id));
      
      return { success: true };
    }),
});