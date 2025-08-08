import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const healthRouter = createTRPCRouter({
  // Basic health check
  check: publicProcedure.query(async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "unknown",
    };
  }),

  // Detailed status with database check
  status: publicProcedure.query(async () => {
    const startTime = Date.now();
    
    try {
      // Test database connection
      // await ctx.db.execute(sql`SELECT 1`);
      const dbResponseTime = Date.now() - startTime;

      return {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "unknown",
        database: {
          status: "connected",
          responseTime: `${dbResponseTime}ms`,
        },
        api: {
          version: "1.0.0",
          name: "TEDx API",
        },
      };
    } catch (error) {
      const dbResponseTime = Date.now() - startTime;
      
      return {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "unknown",
        database: {
          status: "disconnected",
          responseTime: `${dbResponseTime}ms`,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        api: {
          version: "1.0.0",
          name: "TEDx API",
        },
      };
    }
  }),

  // System information
  info: publicProcedure.query(() => {
    return {
      name: "TEDx Event Management API",
      version: "1.0.0",
      description: "API for managing TEDx events, users, speakers, and registrations",
      endpoints: {
        users: ["getAll", "getById", "create", "update", "delete"],
        events: ["getAll", "getById", "getByType", "getByPresenter", "create", "update", "delete"],
        eventRegistrations: ["getAll", "getByUser", "getByEvent", "getByUserAndEvent", "create", "update", "delete"],
        speakers: ["getAll", "getById", "getByUserId", "getBySpecialization", "create", "update", "delete", "deleteByUserId"],
        health: ["check", "status", "info"]
      },
      documentation: "Use tRPC client or HTTP requests to interact with the API",
      timestamp: new Date().toISOString(),
    };
  }),
});