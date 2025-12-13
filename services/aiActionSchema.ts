import { z } from 'zod';

// Schema for the 'data' part of a new component
const componentDataSchema = z.object({
  label: z.string().optional(),
  className: z.string().optional(),
}).passthrough(); // Allow other properties

// Schema for a new component to be added
const componentSchema = z.object({
  type: z.string(), // e.g., 'btn', 'container'
  data: componentDataSchema,
});

// Individual Action Schemas
const updateNodeSchema = z.object({
  action: z.literal('UPDATE_NODE'),
  nodeId: z.string(),
  updates: z.object({
    label: z.string().optional(),
    className: z.string().optional(),
  }).passthrough(),
});

const addNodeSchema = z.object({
  action: z.literal('ADD_NODE'),
  parentId: z.string(),
  component: componentSchema,
  index: z.number().optional(),
});

const moveNodeSchema = z.object({
  action: z.literal('MOVE_NODE'),
  nodeId: z.string(),
  newParentId: z.string(),
  index: z.number().optional(),
});

const deleteNodeSchema = z.object({
  action: z.literal('DELETE_NODE'),
  nodeId: z.string(),
});

// Discriminated union of all possible actions
const aiActionSchema = z.discriminatedUnion('action', [
  updateNodeSchema,
  addNodeSchema,
  moveNodeSchema,
  deleteNodeSchema,
]);

// The final schema for the AI's response: an array of actions.
export const aiActionsResponseSchema = z.array(aiActionSchema);

// Exporting individual types for convenience
export type AiAction = z.infer<typeof aiActionSchema>;
