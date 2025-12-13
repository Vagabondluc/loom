
import { ThemeConfig } from '../types';

// Aesthetic Presets for DaisyUI Themes
export const THEME_PRESETS: Record<string, Partial<ThemeConfig>> = {
  // High Tech / Sharp
  cyberpunk: { fontFamily: 'Space Mono', fontType: 'mono', radius: 0, borderWidth: 2, animationDuration: 0.1, focusScale: 0.98 },
  wireframe: { fontFamily: 'Source Code Pro', fontType: 'mono', radius: 0, borderWidth: 2, animationDuration: 0 },
  synthwave: { fontFamily: 'Oswald', fontType: 'sans', radius: 0, borderWidth: 1, animationDuration: 0.2 },
  black: { fontFamily: 'Roboto Mono', fontType: 'mono', radius: 0, borderWidth: 1 },
  luxury: { fontFamily: 'Cinzel', fontType: 'serif', radius: 0.2, borderWidth: 0.5, animationDuration: 0.4 },
  
  // Soft / Rounded
  cupcake: { fontFamily: 'Lato', fontType: 'sans', radius: 1, borderWidth: 0, animationDuration: 0.3 },
  bumblebee: { fontFamily: 'Poppins', fontType: 'sans', radius: 1, borderWidth: 1 },
  valentine: { fontFamily: 'Lora', fontType: 'serif', radius: 1.5, borderWidth: 0 },
  pastel: { fontFamily: 'Montserrat', fontType: 'sans', radius: 1, borderWidth: 0 },
  lemonade: { fontFamily: 'Raleway', fontType: 'sans', radius: 0.75, borderWidth: 0 },
  
  // Retro / Serif
  retro: { fontFamily: 'Cormorant Garamond', fontType: 'serif', radius: 0.2, borderWidth: 1 },
  coffee: { fontFamily: 'Merriweather', fontType: 'serif', radius: 0.3, borderWidth: 0 },
  dim: { fontFamily: 'Lato', fontType: 'sans', radius: 0.2, borderWidth: 0 },
  
  // Professional / Standard
  corporate: { fontFamily: 'Roboto', fontType: 'sans', radius: 0.2, borderWidth: 1 },
  business: { fontFamily: 'Inter', fontType: 'sans', radius: 0.25, borderWidth: 1 },
  
  // Default fallback for others (light, dark, emerald, etc)
  default: { fontFamily: 'Inter', fontType: 'sans', radius: 0.5, borderWidth: 1, animationDuration: 0.2, focusScale: 0.95 }
};

export const themes = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 
    'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 
    'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 
    'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'
];
