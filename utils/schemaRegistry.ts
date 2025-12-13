import { z } from 'zod';

export type SchemaId = string;

export interface SchemaDefinition {
  id: string;
  label: string;
  schema: z.ZodObject<any>;
}

export const SCHEMAS: Record<string, SchemaDefinition> = {
  'login': {
    id: 'login',
    label: 'Login Form',
    schema: z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(8, { message: "Password must be at least 8 characters" }),
      rememberMe: z.boolean().optional()
    })
  },
  'registration': {
    id: 'registration',
    label: 'Registration Form',
    schema: z.object({
      fullName: z.string().min(2, { message: "Name is too short" }),
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
      acceptTerms: z.boolean().refine(val => val === true, { message: "Must accept terms" })
    })
  },
  'contact': {
    id: 'contact',
    label: 'Contact Support',
    schema: z.object({
      subject: z.enum(['sales', 'support', 'billing']),
      message: z.string().min(20, { message: "Message must be detailed" }).max(1000),
      email: z.string().email()
    })
  },
  'profile': {
    id: 'profile',
    label: 'User Profile',
    schema: z.object({
      username: z.string().min(3),
      bio: z.string().max(160).optional(),
      website: z.string().url().optional(),
      notifications: z.boolean()
    })
  }
};

export const getSchemaFields = (schemaId: string): string[] => {
  const definition = SCHEMAS[schemaId];
  if (!definition) return [];
  // Extract keys from Zod Object
  return Object.keys(definition.schema.shape);
};