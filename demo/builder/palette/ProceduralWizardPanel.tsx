
import React, { useState } from 'react';
import { Button, Checkbox, FormField } from '../../../ui';
import { generateProceduralTemplate } from '../../../services/proceduralGenerator';
import { useBuilderStore } from '../store';
import { Wand2, Layout } from 'lucide-react';

const ARCHETYPES = ['Landing Page', 'Blog', 'Portfolio', 'Dashboard'];
const STYLES = ['Default', 'Corporate', 'Playful'];
const SECTIONS = ['Header', 'Hero', 'Features', 'Footer'];

export const ProceduralWizardPanel: React.FC = () => {
  const [archetype, setArchetype] = useState(ARCHETYPES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [selectedSections, setSelectedSections] = useState<Record<string, boolean>>({
    'Header': true,
    'Hero': true,
    'Features': true,
    'Footer': true
  });

  const loadProject = useBuilderStore(s => s.loadProject);

  const handleGenerate = () => {
    const activeSections = SECTIONS.filter(s => selectedSections[s]);
    const template = generateProceduralTemplate({
        archetype,
        style,
        sections: activeSections
    });
    
    // Auto-load the generated template
    loadProject(template.nodes, template.rootId);
  };

  return (
    <div className="p-4 space-y-6 bg-base-100 h-full overflow-y-auto">
        <div className="text-xs opacity-70 mb-2">
            Configure parameters to procedurally generate a page layout. No AI required.
        </div>

        <FormField label="Archetype">
            <select 
                className="select select-bordered select-sm w-full" 
                value={archetype}
                onChange={e => setArchetype(e.target.value)}
            >
                {ARCHETYPES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
        </FormField>

        <FormField label="Visual Style">
            <select 
                className="select select-bordered select-sm w-full"
                value={style}
                onChange={e => setStyle(e.target.value)}
            >
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </FormField>

        <div className="form-control">
            <label className="label text-xs font-bold opacity-70">Included Sections</label>
            <div className="flex flex-col gap-2 bg-base-200 p-2 rounded-box">
                {SECTIONS.map(section => (
                    <label key={section} className="label cursor-pointer justify-start gap-2 py-1">
                        <Checkbox 
                            size="xs"
                            checked={!!selectedSections[section]} 
                            onChange={e => setSelectedSections(s => ({...s, [section]: e.target.checked}))}
                        />
                        <span className="label-text text-xs">{section}</span>
                    </label>
                ))}
            </div>
        </div>

        <Button 
            variant="accent" 
            className="w-full gap-2 mt-4" 
            onClick={handleGenerate}
        >
            <Wand2 className="w-4 h-4" /> Generate Layout
        </Button>
    </div>
  );
};
