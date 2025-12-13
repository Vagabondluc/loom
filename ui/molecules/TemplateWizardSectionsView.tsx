import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { Badge } from '../atoms/Badge';
import TemplateWizardEmptyStateView from './TemplateWizardEmptyStateView';
import TemplateWizardSectionConfigView from './TemplateWizardSectionConfigView';

type SectionDef = { id: string; desc?: string };

type Props = {
  pageType: string;
  suggestions: Record<string, string[]>;
  selectedSections: Record<string, boolean>;
  expandedSection: string | null;
  onToggleSelect: (section: string, value: boolean) => void;
  onToggleExpand: (section: string) => void;
  sectionConfig: Record<string, any>;
  sectionInstructions?: Record<string, string>;
  onSectionConfigChange: (section: string, key: string, value: any) => void;
};

export const TemplateWizardSectionsView: React.FC<Props> = ({ pageType, suggestions, selectedSections, expandedSection, onToggleSelect, onToggleExpand, sectionConfig, sectionInstructions, onSectionConfigChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {suggestions[pageType]?.length > 0 ? (
        suggestions[pageType].map(section => {
          const isSelected = !!selectedSections[section];
          const isExpanded = expandedSection === section;
          const instructorTip = sectionInstructions?.[section] || null;

          return (
            <div key={section} className={clsx("card card-bordered card-compact transition-all", isSelected ? "bg-base-100 shadow-sm border-base-300" : "bg-transparent border-transparent opacity-50")}>
              <div className="card-body flex-row items-center gap-4 py-3">
                <label className="flex items-center gap-4 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                    checked={isSelected}
                    onChange={(e) => onToggleSelect(section, e.target.checked)}
                    aria-label={`Select ${section} section`}
                  />

                  <div className="flex-1" onClick={(e) => { e.stopPropagation(); isSelected && onToggleExpand(section); }}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{section}</span>
                      {instructorTip && <Badge variant="ghost" size="xs" className="font-normal opacity-70 hidden sm:inline-flex">Purpose</Badge>}
                    </div>
                    {instructorTip && <p className="text-xs opacity-60 mt-0.5">{instructorTip}</p>}
                  </div>
                </label>

                {isSelected && (
                  <button
                    className="btn btn-xs btn-ghost btn-square"
                    onClick={() => onToggleExpand(section)}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {isSelected && isExpanded && (
                <TemplateWizardSectionConfigView 
                  section={section} 
                  config={config} 
                  onChange={(key, value) => onSectionConfigChange(section, key, value)} 
                />
              )}
            </div>
          );
        })
      ) : (
        <TemplateWizardEmptyStateView message="No default sections for this archetype." />
      )}
    </div>
  );
};

export default TemplateWizardSectionsView;
