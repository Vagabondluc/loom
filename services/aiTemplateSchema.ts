
import { z } from 'zod';

// Zod Schema for a single BuilderNode
// Note: It's defined loosely and recursively to handle the tree structure.
const baseNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  // FIX: z.record expects 2 arguments: key schema and value schema.
  data: z.record(z.string(), z.any()),
  // FIX: z.record expects 2 arguments: key schema and value schema.
  layout: z.record(z.string(), z.any()).optional(),
  // FIX: z.record expects 2 arguments: key schema and value schema.
  responsive: z.record(z.string(), z.any()).optional(),
  // FIX: z.record expects 2 arguments: key schema and value schema.
  events: z.record(z.string(), z.any()).optional(),
  // FIX: z.record expects 2 arguments: key schema and value schema.
  logic: z.record(z.string(), z.any()).optional(),
  children: z.array(z.string()),
  parentId: z.string().nullable(),
});

// Zod Schema for the entire Template object that the AI should generate.
// We expect the AI to return an array of nodes, which we will convert to a record.
export const aiGeneratedTemplateSchema = z.object({
  rootId: z.string(),
  nodes: z.array(baseNodeSchema),
});

export const templateSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: z.string(),
  rootId: z.string(),
  // FIX: z.record expects 2 arguments: key schema and value schema.
  nodes: z.record(z.string(), baseNodeSchema),
});

export type AIGeneratedTemplate = z.infer<typeof aiGeneratedTemplateSchema>;
