import { z } from 'zod';

export const validateWithSchema = (schema: z.ZodTypeAny, data: Record<string, any>) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  return { success: true, errors: {} };
};

export const generateMockData = (schema: z.ZodTypeAny) => {
  const mock: Record<string, any> = {};
  // Best effort based on shape if it's an object
  const shape = (schema as any).shape || {};
  Object.keys(shape).forEach((field) => {
    if (field.includes('email')) mock[field] = 'demo@example.com';
    else if (field.includes('password')) mock[field] = 'secret123';
    else if (field === 'age') mock[field] = 25;
    else if (field === 'terms' || field === 'accept') mock[field] = true;
    else mock[field] = 'Sample Text';
  });
  return mock;
};

export default {
  validateWithSchema,
  generateMockData
};
