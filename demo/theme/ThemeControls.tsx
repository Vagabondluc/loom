import React from 'react';
import { Card, CardTitle, Button, Input, FormField } from '../../ui';
import { Palette, SlidersHorizontal } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { ThemeColors } from '../../utils/themeGenerator';

interface ThemeControlsProps {
    colors: ThemeColors;
    setColors: React.Dispatch<React.SetStateAction<ThemeColors>>;
    themeName: string;
    setThemeName: React.Dispatch<React.SetStateAction<string>>;
    filteredFonts: { name: string; type: 'sans' | 'serif' | 'mono' }[];
}

export const ThemeControls: React.FC<ThemeControlsProps> = ({ 
    colors, setColors, themeName, setThemeName, filteredFonts 
}) => {
    const { config, updateConfig, resetConfig } = useThemeStore();

    const handleColorChange = (key: keyof ThemeColors, value: string) => {
        setColors(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-6">
            <div className="prose">
                <h1>Theme Generator</h1>
                <p>Customize global design tokens. Controls affect the entire app live.</p>
            </div>

            {/* Global Tokens */}
            <Card bordered className="border-l-4 border-l-secondary">
                <CardTitle className="flex gap-2 items-center">
                    <SlidersHorizontal className="w-5 h-5"/> Global Design Tokens
                </CardTitle>
                <div className="space-y-8">
                    {/* Typography */}
                    <div>
                        <label className="label font-bold text-xs uppercase opacity-60">Typography</label>
                        
                        {/* Font Type Selector */}
                        <div className="join w-full mb-4">
                            {['sans', 'serif', 'mono'].map((type) => (
                                <button
                                    key={type}
                                    className={`join-item btn btn-sm flex-1 ${config.fontType === type ? 'btn-active btn-primary' : ''}`}
                                    onClick={() => updateConfig({ fontType: type as any })}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Preset Fonts (Filtered) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                            {filteredFonts.map(f => (
                                <button 
                                    key={f.name}
                                    className={`btn btn-xs ${config.fontFamily === f.name ? 'btn-neutral' : 'btn-ghost border-base-300'}`}
                                    onClick={() => updateConfig({ fontFamily: f.name, fontType: f.type })}
                                    style={{ fontFamily: f.name }}
                                >
                                    {f.name}
                                </button>
                            ))}
                        </div>

                        {/* Custom Font Input */}
                        <FormField label="Custom Font Family">
                          <Input 
                              size="sm"
                              value={config.fontFamily}
                              onChange={(e) => updateConfig({ fontFamily: e.target.value })}
                              placeholder="e.g. Open Sans"
                          />
                        </FormField>
                    </div>

                    <div className="divider"></div>

                    {/* Shapes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="label font-bold text-xs uppercase opacity-60">
                                Border Radius: {config.radius}rem
                            </label>
                            <input 
                                type="range" min="0" max="2" step="0.1" 
                                value={config.radius}
                                onChange={(e) => updateConfig({ radius: parseFloat(e.target.value) })}
                                className="range range-xs range-secondary" 
                            />
                        </div>
                        <div>
                            <label className="label font-bold text-xs uppercase opacity-60">
                                Border Width: {config.borderWidth}px
                            </label>
                            <input 
                                type="range" min="0" max="8" step="1" 
                                value={config.borderWidth}
                                onChange={(e) => updateConfig({ borderWidth: parseInt(e.target.value) })}
                                className="range range-xs range-accent" 
                            />
                        </div>
                    </div>

                    {/* Interaction */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="label font-bold text-xs uppercase opacity-60 flex justify-between">
                                <span>Animation Speed</span>
                                <span className="font-mono text-[10px] opacity-70">{config.animationDuration}s</span>
                            </label>
                            <input 
                                type="range" min="0" max="1" step="0.05" 
                                value={config.animationDuration}
                                onChange={(e) => updateConfig({ animationDuration: parseFloat(e.target.value) })}
                                className="range range-xs range-info" 
                            />
                            <div className="flex justify-between text-[10px] opacity-50 px-1 mt-1">
                                <span>Fast</span>
                                <span>Slow</span>
                            </div>
                        </div>
                        <div>
                            <label className="label font-bold text-xs uppercase opacity-60 flex justify-between">
                                <span>Click Bounce</span>
                                <span className="font-mono text-[10px] opacity-70">Scale {config.focusScale}</span>
                            </label>
                            <input 
                                type="range" min="0.8" max="1" step="0.01" 
                                value={config.focusScale}
                                onChange={(e) => updateConfig({ focusScale: parseFloat(e.target.value) })}
                                className="range range-xs range-success" 
                            />
                            <div className="flex justify-between text-[10px] opacity-50 px-1 mt-1">
                                <span>Bouncy</span>
                                <span>Flat</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <Button size="xs" variant="ghost" onClick={resetConfig}>Reset Globals</Button>
                    </div>
                </div>
            </Card>

            {/* Color Palette */}
            <Card bordered>
                <CardTitle className="flex gap-2 items-center"><Palette className="w-5 h-5"/> Color Palette</CardTitle>
                <FormField className="col-span-full mb-2" label="Theme Name">
                  <Input 
                      value={themeName} 
                      onChange={(e) => setThemeName(e.target.value)} 
                  />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4">
                    {Object.entries(colors).map(([key, value]) => (
                        <div key={key} className="form-control">
                            <label className="label py-1">
                                <span className="label-text capitalize text-xs opacity-70">{key}</span>
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    value={value} 
                                    onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                                    className="h-8 w-8 rounded cursor-pointer border border-base-300 flex-shrink-0" 
                                />
                                <input 
                                    type="text" 
                                    value={value} 
                                    onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                                    className="input input-sm input-bordered w-full uppercase font-mono text-xs" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};