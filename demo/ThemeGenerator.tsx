
import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { ThemeColors } from '../utils/themeGenerator';
import { ThemeControls } from './theme/ThemeControls';
import { ThemePreview } from './theme/ThemePreview';

const DEFAULT_COLORS: ThemeColors = {
  primary: '#570df8',
  secondary: '#f000b8',
  accent: '#37cdbe',
  neutral: '#3d4451',
  'base-100': '#ffffff',
  'base-200': '#f2f2f2',
  'base-300': '#e5e6e6',
  'base-content': '#1f2937',
  info: '#3abff8',
  success: '#36d399',
  warning: '#fbbd23',
  error: '#f87272',
};

const AVAILABLE_FONTS: { name: string; type: 'sans' | 'serif' | 'mono' }[] = [
  // Sans
  { name: 'Inter', type: 'sans' },
  { name: 'Roboto', type: 'sans' },
  { name: 'Open Sans', type: 'sans' },
  { name: 'Lato', type: 'sans' },
  { name: 'Montserrat', type: 'sans' },
  { name: 'Poppins', type: 'sans' },
  { name: 'Oswald', type: 'sans' },
  { name: 'Raleway', type: 'sans' },
  // Serif
  { name: 'Playfair Display', type: 'serif' },
  { name: 'Merriweather', type: 'serif' },
  { name: 'Lora', type: 'serif' },
  { name: 'PT Serif', type: 'serif' },
  { name: 'Cinzel', type: 'serif' },
  { name: 'Cormorant Garamond', type: 'serif' },
  // Mono
  { name: 'Fira Code', type: 'mono' },
  { name: 'Roboto Mono', type: 'mono' },
  { name: 'Source Code Pro', type: 'mono' },
  { name: 'Ubuntu Mono', type: 'mono' },
  { name: 'Space Mono', type: 'mono' },
];

export const ThemeGenerator: React.FC = () => {
  const [colors, setColors] = useState<ThemeColors>(DEFAULT_COLORS);
  const [themeName, setThemeName] = useState('my-theme');
  const config = useThemeStore(s => s.config);

  // Filter fonts based on selected type
  const filteredFonts = AVAILABLE_FONTS.filter(f => f.type === config.fontType);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
      
      {/* LEFT COLUMN: Controls */}
      <ThemeControls 
        colors={colors}
        setColors={setColors}
        themeName={themeName}
        setThemeName={setThemeName}
        filteredFonts={filteredFonts}
      />

      {/* RIGHT COLUMN: Preview & Output */}
      <ThemePreview 
        colors={colors}
        themeName={themeName}
      />

    </div>
  );
};