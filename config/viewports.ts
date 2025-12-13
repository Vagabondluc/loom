
export const viewportMap: Record<string, Record<string, {
    width: string;
    height?: string;
    aspectRatio?: string;
    maxWidth?: string;
}>> = {
    mobile: { 
      // User request: "1366 x 768 for cellphone"
      portrait: { width: '768px', height: '1366px' }, 
      landscape: { width: '1366px', height: '768px' } 
    },
    tablet: { 
      // Standard Tablet (Reference)
      portrait: { width: '800px', height: '1280px' }, 
      landscape: { width: '1280px', height: '800px' } 
    },
    desktop: { 
      // User request: "16:10, 1080p for computer"
      // 1920px width (1080p std) x 1200px height = 16:10 Aspect Ratio
      portrait: { width: '1200px', height: '1920px' },
      landscape: { width: '100%', aspectRatio: '16 / 10', maxWidth: '1920px' } 
    }
};