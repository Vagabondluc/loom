
import React from 'react';
import { useBuilderStore } from '../store';
import { PageSettings } from '../../../types';
import { Maximize, Columns, FileText } from 'lucide-react';

export const PageSettingsEditor: React.FC = () => {
    const { pageSettings, updatePageSettings } = useBuilderStore(s => ({
        pageSettings: s.pageSettings,
        updatePageSettings: s.updatePageSettings
    }));

    const handleUpdate = (key: keyof PageSettings, value: string) => {
        updatePageSettings({ [key]: value });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Page Layout
            </h3>

            <div className="form-control">
                <label className="label text-xs font-bold opacity-70">Height Mode</label>
                <div className="join w-full grid grid-cols-2">
                    <input 
                        className="join-item btn btn-xs" 
                        type="radio" 
                        name="heightMode" 
                        aria-label="Grow"
                        checked={pageSettings.heightMode === 'grow'}
                        onChange={() => handleUpdate('heightMode', 'grow')}
                        title="Page grows with content (Browser Scroll)"
                    />
                    <input 
                        className="join-item btn btn-xs" 
                        type="radio" 
                        name="heightMode" 
                        aria-label="Fit"
                        checked={pageSettings.heightMode === 'fit'}
                        onChange={() => handleUpdate('heightMode', 'fit')}
                        title="Fit to viewport (Internal Scroll)"
                    />
                </div>
            </div>

            <div className="form-control">
                <label className="label text-xs font-bold opacity-70">Max Content Width</label>
                <div className="join w-full grid grid-cols-4">
                    <input className="join-item btn btn-xs" type="radio" name="maxWidth" aria-label="Full" checked={pageSettings.maxWidth === 'full'} onChange={() => handleUpdate('maxWidth', 'full')} />
                    <input className="join-item btn btn-xs" type="radio" name="maxWidth" aria-label="7XL" checked={pageSettings.maxWidth === '7xl'} onChange={() => handleUpdate('maxWidth', '7xl')} />
                    <input className="join-item btn btn-xs" type="radio" name="maxWidth" aria-label="5XL" checked={pageSettings.maxWidth === '5xl'} onChange={() => handleUpdate('maxWidth', '5xl')} />
                    <input className="join-item btn btn-xs" type="radio" name="maxWidth" aria-label="3XL" checked={pageSettings.maxWidth === '3xl'} onChange={() => handleUpdate('maxWidth', '3xl')} />
                </div>
            </div>
        </div>
    );
};
