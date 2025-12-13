export const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const generateLorem = (mode: 'short' | 'medium' | 'long' | 'paragraph', paragraphs = 1): string => {
  const words = LOREM_IPSUM.split(' ');
  
  if (mode === 'short') {
    return words.slice(0, 5).join(' ') + '.';
  }
  
  if (mode === 'medium') {
    return words.slice(0, 15).join(' ') + '.';
  }
  
  if (mode === 'long') {
    return LOREM_IPSUM;
  }

  // Paragraph mode
  return Array(paragraphs).fill(LOREM_IPSUM).join('\n\n');
};
