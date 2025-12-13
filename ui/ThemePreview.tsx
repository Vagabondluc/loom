import React from 'react';
import { Card, CardTitle, Badge, Toggle } from '.';
import { Box, Copy } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { ThemeColors, generateThemeConfig } from '../utils/themeGenerator';
import { getThemeStyles } from '../utils/themeStyles';

interface ThemePreviewProps {
    colors: ThemeColors;
    themeName: string;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ colors, themeName }) => {
    const config = useThemeStore(s => s.config);

    // Generate variables for the preview scope
    const styles = getThemeStyles(config);

    return (
        <div className="space-y-6">
            <Card className="bg-base-200 border-2 border-base-300 sticky top-24">
                <CardTitle className="flex items-center gap-2">
                    <Box className="w-5 h-5" /> Live Preview
                </CardTitle>
                <div className="text-xs opacity-60 mb-4">
                    Components below use the generated palette and global tokens.
                </div>

                {/* Preview Container simulating the theme */}
                <div 
                    className={`p-8 rounded-box shadow-xl border border-base-300 space-y-8 transition-all duration-300`}
                    style={{
                        backgroundColor: colors['base-100'],
                        color: colors['base-content'],
                        ...styles // Inject all theme variables here
                    }}
                >
                    {/* Interaction Demo */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <button className="btn btn-primary" style={{ backgroundColor: colors.primary, color: colors['base-100'] }}>Click Me!</button>
                        <button className="btn btn-outline" style={{ borderColor: colors.secondary, color: colors.secondary, borderWidth: `${config.borderWidth}px` }}>Outline</button>
                        <Toggle variant="primary" defaultChecked />
                    </div>

                    {/* Depth Demo */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-box text-center text-xs font-bold" style={{ backgroundColor: colors['base-200'] }}>
                            Base 200 (Surface)
                        </div>
                        <div className="p-4 rounded-box text-center text-xs font-bold" style={{ backgroundColor: colors['base-300'] }}>
                            Base 300 (Deep)
                        </div>
                    </div>

                    {/* Typography Demo */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold">Typography</h1>
                        <p className="opacity-80 leading-relaxed text-sm">
                            The quick brown fox jumps over the lazy dog. 
                            <br/>
                            Current Font: <span className="font-mono opacity-60">{config.fontFamily}</span> <Badge size="sm" variant="ghost">{config.fontType}</Badge>
                        </p>
                    </div>

                    {/* Status Colors */}
                    <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.info }} title="Info" />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.success }} title="Success" />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.warning }} title="Warning" />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.error }} title="Error" />
                    </div>

                    <div className="card shadow-sm border" style={{ borderColor: colors.neutral, backgroundColor: colors['base-100'], borderRadius: `${config.radius}rem` }}>
                        <div className="card-body p-4">
                            <h3 className="card-title text-sm" style={{ color: colors.primary }}>Card Component</h3>
                            <p className="text-xs">Inherits radius <strong>{config.radius}rem</strong> and interaction settings.</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card bordered>
                <CardTitle>Config Output</CardTitle>
                <div className="relative">
                    <textarea 
                        className="textarea textarea-bordered w-full h-48 font-mono text-xs" 
                        readOnly 
                        value={generateThemeConfig(config, colors, themeName)}
                    />
                    <button 
                        className="btn btn-xs btn-circle absolute top-2 right-2"
                        onClick={() => navigator.clipboard.writeText(generateThemeConfig(config, colors, themeName))}
                        title="Copy to clipboard"
                    >
                        <Copy className="w-3 h-3" />
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default ThemePreview;
