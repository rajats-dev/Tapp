import { z } from "zod";

export const createGropupSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Group title must be 4 characters long" }),
  })
  .required();

export type createGropupSchemaType = z.infer<typeof createGropupSchema>;
