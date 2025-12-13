import React from 'react';
import { ChevronDown, ChevronUp, Layout } from 'lucide-react';
import { clsx } from 'clsx';
import { Badge } from '../atoms/Badge';
import TemplateWizardEmptyStateView from './TemplateWizardEmptyStateView';

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
};

export const TemplateWizardSectionsView: React.FC<Props> = ({ pageType, suggestions, selectedSections, expandedSection, onToggleSelect, onToggleExpand, sectionConfig, sectionInstructions }) => {
  return (
    <div className="flex flex-col gap-2">
      {suggestions[pageType]?.length > 0 ? (
        suggestions[pageType].map(section => {
          const isSelected = !!selectedSections[section];
          const isExpanded = expandedSection === section;
          const config = sectionConfig[section] || {};
          const instructorTip = sectionInstructions?.[section] || null;

          return (
            <div key={section} className={clsx("card card-bordered card-compact transition-all", isSelected ? "bg-base-100 shadow-sm border-base-300" : "bg-transparent border-transparent opacity-50")}>
              <div className="card-body flex-row items-center gap-4 py-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={isSelected}
                  onChange={(e) => onToggleSelect(section, e.target.checked)}
                />

                  <div className="flex-1 cursor-pointer" onClick={() => isSelected && onToggleExpand(section)}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{section}</span>
                    {instructorTip && <Badge variant="ghost" size="xs" className="font-normal opacity-70 hidden sm:inline-flex">Purpose</Badge>}
                  </div>
                  {instructorTip && <p className="text-xs opacity-60 mt-0.5">{instructorTip}</p>}
                </div>

                {isSelected && (
                  <button
                    className="btn btn-xs btn-ghost btn-square"
                    onClick={() => onToggleExpand(section)}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${section} configuration`}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {isSelected && isExpanded && (
                <div className="bg-base-200/50 p-4 border-t border-base-200 rounded-b-xl animate-in slide-in-from-top-1">
                  <div className="text-[10px] font-bold uppercase opacity-40 mb-3 tracking-wider flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Section Configuration
                  </div>
                  <div className="text-xs opacity-50 italic">No specific overrides available for this section.</div>
                </div>
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
