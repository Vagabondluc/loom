
import { marked } from 'marked';

// Configure marked options for safety and standard behavior
// Note: DOMPurify should be used on the output string if this were a production environment handling untrusted user input.
// For the builder, we assume internal trust but 'headerIds: false' helps keep output clean.
marked.use({
  gfm: true,
  breaks: true,
});

/**
 * Parses markdown text into an HTML string.
 */
export const parseMarkdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  return marked.parse(markdown) as string;
};

/**
 * Returns the Lexer tokens for structural analysis.
 * Useful for the Markdown Ingestion tab to identify blocks.
 */
export const getMarkdownTokens = (markdown: string) => {
  if (!markdown) return [];
  return marked.lexer(markdown);
};
