
import React from 'react';
import { useBuilderStore } from '../store';
import { PageSettings } from '../../../types';
import { PageSettingsEditorView } from '../../../ui/molecules/properties/PageSettingsEditorView';

export const PageSettingsEditor: React.FC = () => {
    const { pageSettings, updatePageSettings } = useBuilderStore(s => ({
        pageSettings: s.pageSettings,
        updatePageSettings: s.updatePageSettings
    }));

    const handleUpdate = (key: keyof PageSettings, value: string) => {
        updatePageSettings({ [key]: value });
    };

    return (
        <PageSettingsEditorView pageSettings={pageSettings} onUpdate={handleUpdate} />
    );
};
