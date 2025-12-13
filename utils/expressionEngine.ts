
/**
 * Evaluates a simple JavaScript expression against a context object.
 * Uses `new Function` safe-guarded by strict mode and limited context injection.
 * 
 * @param expression e.g. "user.isLoggedIn && cart.total > 50"
 * @param context e.g. { user: { isLoggedIn: true }, cart: { total: 100 } }
 */
export const evaluateExpression = (expression: string, context: Record<string, any>): boolean => {
  if (!expression || !expression.trim()) return true;

  try {
    // Destructure context keys to make them available as top-level variables in the expression
    const keys = Object.keys(context);
    const values = Object.values(context);
    
    // Create a function that takes the context values as arguments
    // "return" is explicit to allow the expression to be evaluated
    const func = new Function(...keys, `
      "use strict";
      try { 
        return !!(${expression}); 
      } catch(e) { 
        return false; 
      }
    `);

    return func(...values);
  } catch (e) {
    console.warn(`[ExpressionEngine] Failed to evaluate: "${expression}"`, e);
    return false; // Default to hidden on error for safety
  }
};

/**
 * Replaces {{ variable.path }} patterns in a string with values from context.
 */
export const interpolateText = (text: string, context: Record<string, any>): string => {
  if (!text || !text.includes('{{')) return text;

  return text.replace(/\{\{([^}]+)\}\}/g, (_match, path) => {
    const trimmedPath = path.trim();
    try {
      // Simple deep get
      const parts = trimmedPath.split('.');
      let current = context;
      for (const part of parts) {
        if (current === undefined || current === null) return '';
        current = current[part];
      }
      return current !== undefined && current !== null ? String(current) : '';
    } catch (e) {
      return '';
    }
  });
};
