import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  pomodoroSettings: defineTable({
    userId: v.string(),
    focusMinutes: v.number(),
    shortBreakMinutes: v.number(),
    longBreakMinutes: v.number(),
    longBreakInterval: v.number(),
    autoAdvance: v.boolean(),
    soundEnabled: v.boolean(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  pomodoroSessions: defineTable({
    userId: v.string(),
    mode: v.union(
      v.literal("focus"),
      v.literal("shortBreak"),
      v.literal("longBreak"),
    ),
    startedAt: v.number(),
    endedAt: v.number(),
    plannedMs: v.number(),
    completed: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
