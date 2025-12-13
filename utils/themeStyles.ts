
import { ThemeConfig } from '../types';

export const getThemeStyles = (config: ThemeConfig): Record<string, string> => {
  const fontVal = config.fontFamily.includes(' ') ? `"${config.fontFamily}"` : config.fontFamily;

  return {
    '--font-theme': fontVal,
    
    // Shape
    '--rounded-box': `${config.radius}rem`,
    '--rounded-btn': `${config.radius}rem`,
    '--rounded-badge': `${config.radius}rem`,
    
    // Border
    '--border-btn': `${config.borderWidth}px`,
    '--tab-border': `${config.borderWidth}px`,

    // Animation & Interaction
    '--animation-btn': `${config.animationDuration}s`,
    '--animation-input': `${config.animationDuration}s`,
    '--btn-focus-scale': `${config.focusScale}`,
  };
};
