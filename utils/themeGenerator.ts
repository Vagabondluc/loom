
import { ThemeConfig } from '../types';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  'base-100': string;
  'base-200': string;
  'base-300': string;
  'base-content': string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

export const generateThemeConfig = (
    config: ThemeConfig, 
    colors: ThemeColors, 
    themeName: string
) => {
    const fontKey = config.fontType;
    const fallback = config.fontType === 'mono' ? 'monospace' : (config.fontType === 'serif' ? 'serif' : 'sans-serif');

    return `
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Overriding '${fontKey}' to use custom font
        ${fontKey}: ['"${config.fontFamily}"', '${fallback}'],
      },
      borderRadius: {
        box: '${config.radius}rem',
        btn: '${config.radius}rem',
        badge: '${config.radius}rem',
      },
      borderWidth: {
        btn: '${config.borderWidth}px',
      }
    }
  },
  daisyui: {
    themes: [
      {
        "${themeName}": {
          "primary": "${colors.primary}",
          "secondary": "${colors.secondary}",
          "accent": "${colors.accent}",
          "neutral": "${colors.neutral}",
          "base-100": "${colors['base-100']}",
          "base-200": "${colors['base-200']}",
          "base-300": "${colors['base-300']}",
          "base-content": "${colors['base-content']}",
          "info": "${colors.info}",
          "success": "${colors.success}",
          "warning": "${colors.warning}",
          "error": "${colors.error}",
          
          "--rounded-box": "${config.radius}rem",
          "--rounded-btn": "${config.radius}rem",
          "--border-btn": "${config.borderWidth}px",
          "--animation-btn": "${config.animationDuration}s",
          "--animation-input": "${config.animationDuration}s",
          "--btn-focus-scale": "${config.focusScale}",
        }
      }
    ]
  }
}`.trim();
};
