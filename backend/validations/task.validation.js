import { z } from "zod";

const emptyToUndefined = (value) =>
  value === "" || value === undefined ? undefined : value;

export const taskListQuerySchema = z.object({
  page: z.preprocess(
    (value) => emptyToUndefined(value) ?? 1,
    z.coerce.number().int().min(1, "Page must be at least 1"),
  ),

  limit: z.preprocess(
    (value) => emptyToUndefined(value) ?? 10,
    z.coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(100, "Limit cannot exceed 100"),
  ),

  status: z.preprocess(
    emptyToUndefined,
    z.enum(["pending", "in_progress", "completed"]).optional(),
  ),

  priority: z.preprocess(
    emptyToUndefined,
    z.enum(["low", "medium", "high"]).optional(),
  ),

  search: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(100, "Search cannot exceed 100 characters")
      .optional(),
  ),
});
