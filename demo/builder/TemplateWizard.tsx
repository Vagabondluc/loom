
import React, { useState } from 'react';
import { useBuilderStore } from './store';
import { useToastStore } from '../../stores/toastStore';
import { aiGeneratedTemplateSchema } from '../../services/aiTemplateSchema';
import { buildTemplateWizardPrompt, ContentStrategy, SectionConfig } from '../../services/promptBuilder';
import { COMPONENT_REGISTRY } from './registries';
import { ai } from '../../services/ai';
import { Type as GenAiType } from '@google/genai';
import { FileText, AlignLeft, Heading, Ban, Image as ImageIcon, Box, Link as LinkIcon, Check, Sparkles, ChevronDown, ChevronUp, Layout } from 'lucide-react';
import TemplateWizardHeaderView from '../../ui/molecules/TemplateWizardHeaderView';
import PageTypeCardView from '../../ui/molecules/PageTypeCardView';
import TemplateWizardContentStrategyView from '../../ui/molecules/TemplateWizardContentStrategyView';
import VisualStyleSelectorView from '../../ui/molecules/VisualStyleSelectorView';
import TemplateWizardSectionsView from '../../ui/molecules/TemplateWizardSectionsView';
import TemplateWizardFooterView from '../../ui/molecules/TemplateWizardFooterView';
import TemplateWizardStepHeaderView from '../../ui/molecules/TemplateWizardStepHeaderView';
import { clsx } from 'clsx';
import TemplateWizardContextView from '../../ui/molecules/TemplateWizardContextView';
import TemplateWizardErrorAlertView from '../../ui/molecules/TemplateWizardErrorAlertView';
import TemplateWizardSectionConfigView from '../../ui/molecules/TemplateWizardSectionConfigView';

interface TemplateWizardProps {
  open: boolean;
  onClose: () => void;
}

// --- Constants & Data ---

const PAGE_TYPES = [
  { id: "Landing Page", desc: "High conversion, hero-focused layout." },
  { id: "Blog Post", desc: "Optimized for readability and content flow." },
  { id: "Portfolio", desc: "Showcase work samples and contact info." },
  { id: "Documentation", desc: "Structured hierarchy for technical content." },
  { id: "E-commerce Product", desc: "Product details, reviews, and related items." },
  { id: "Dashboard", desc: "Data density with sidebar navigation." },
  { id: "Empty Page", desc: "Start from a clean slate." }
];

const VISUAL_STYLES = [
  { id: "Minimalist", desc: "Clean, ample whitespace." },
  { id: "Corporate", desc: "Professional, trustworthy." },
  { id: "Bold & Vibrant", desc: "High contrast, energetic." },
  { id: "Dark & Moody", desc: "Sleek, modern dark mode." },
  { id: "Playful", desc: "Rounded, friendly vibes." },
  { id: "Default", desc: "Standard DaisyUI neutral." }
];

const SECTION_SUGGESTIONS: Record<string, string[]> = {
  "Landing Page": ["Header", "Hero", "Feature Grid", "Testimonials", "Call to Action", "Footer"],
  "Blog Post": ["Header", "Article Body", "Author Bio", "Comments Section", "Footer"],
  "Portfolio": ["Header", "Hero", "Project Gallery", "About Me", "Contact Form", "Footer"],
  "Documentation": ["Header", "Sidebar Navigation", "Main Content Area", "API Reference", "Footer"],
  "E-commerce Product": ["Header", "Product Image Gallery", "Product Details", "Reviews", "Related Products", "Footer"],
  "Dashboard": ["Sidebar", "Header", "Stats Grid", "Recent Activity Table", "Chart Area"],
  "Empty Page": []
};

const SECTION_INSTRUCTION: Record<string, string> = {
    "Header": "Anchors the user experience with identity & navigation.",
    "Hero": "First impressions matter. State your value proposition immediately.",
    "Feature Grid": "Break down complex benefits into digestible chunks.",
    "Testimonials": "Social proof builds trust and reduces friction.",
    "Call to Action": "The primary goal. Make the next step obvious.",
    "Footer": "Closure, legal links, and secondary navigation.",
    "Sidebar": "Critical for deep navigation in apps or docs.",
    "Article Body": "The main content. Focus on typography and readability.",
    "Stats Grid": "Key performance indicators at a glance."
};

// --- Components ---

export const TemplateWizard: React.FC<TemplateWizardProps> = ({ open, onClose }) => {
  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [pageType, setPageType] = useState(PAGE_TYPES[0].id);
  const [visualStyle, setVisualStyle] = useState(VISUAL_STYLES[0].id);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [contentStrategy, setContentStrategy] = useState<ContentStrategy>({
    textMode: 'realistic',
    imageMode: 'picsum'
  });
  
  const [selectedSections, setSelectedSections] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    SECTION_SUGGESTIONS[PAGE_TYPES[0].id].forEach(s => defaults[s] = true);
    return defaults;
  });

  const [sectionConfig, setSectionConfig] = useState<Record<string, SectionConfig>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const loadProject = useBuilderStore(s => s.loadProject);
  const addToast = useToastStore(s => s.addToast);

  // Handlers
  const handlePageTypeChange = (type: string) => {
    setPageType(type);
    const defaults: Record<string, boolean> = {};
    (SECTION_SUGGESTIONS[type] || []).forEach(s => defaults[s] = true);
    setSelectedSections(defaults);
    setSectionConfig({});
  };

  const updateSectionConfig = (section: string, key: string, value: any) => {
    setSectionConfig(prev => ({
        ...prev,
        [section]: { ...prev[section], [key]: value }
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
        const activeSections = Object.entries(selectedSections).filter(([, val]) => val).map(([key]) => key);
        
        const systemInstruction = buildTemplateWizardPrompt({ 
            pageType, 
            visualStyle, 
            description, 
            sections: activeSections,
            contentStrategy,
            sectionConfig
        }, Object.keys(COMPONENT_REGISTRY));
        
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Request timed out. Please try again.")), 60000)
        );

        const apiCallPromise = ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Generate the page structure.",
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: GenAiType.OBJECT,
                    properties: {
                        rootId: { type: GenAiType.STRING },
                        nodes: {
                            type: GenAiType.ARRAY,
                            items: {
                                type: GenAiType.OBJECT,
                                properties: {
                                    id: { type: GenAiType.STRING },
                                    type: { type: GenAiType.STRING },
                                    data: { 
                                      type: GenAiType.OBJECT,
                                      properties: {
                                        label: { type: GenAiType.STRING },
                                        className: { type: GenAiType.STRING },
                                        iconName: { type: GenAiType.STRING },
                                        loremConfig: {
                                            type: GenAiType.OBJECT,
                                            properties: { mode: { type: GenAiType.STRING } }
                                        },
                                        picsumConfig: {
                                            type: GenAiType.OBJECT,
                                            properties: {
                                                width: { type: GenAiType.NUMBER },
                                                height: { type: GenAiType.NUMBER },
                                                seed: { type: GenAiType.STRING },
                                                grayscale: { type: GenAiType.BOOLEAN },
                                                blur: { type: GenAiType.NUMBER }
                                            }
                                        },
                                        props: {
                                          type: GenAiType.OBJECT,
                                          properties: {
                                            src: { type: GenAiType.STRING },
                                            alt: { type: GenAiType.STRING },
                                            placeholder: { type: GenAiType.STRING },
                                            type: { type: GenAiType.STRING },
                                            name: { type: GenAiType.STRING },
                                            href: { type: GenAiType.STRING },
                                            target: { type: GenAiType.STRING },
                                            value: { type: GenAiType.STRING },
                                            checked: { type: GenAiType.BOOLEAN },
                                            ariaLabel: { type: GenAiType.STRING }
                                          }
                                        }
                                      }
                                    },
                                    layout: { 
                                      type: GenAiType.OBJECT,
                                      properties: {
                                        mode: { type: GenAiType.STRING },
                                        direction: { type: GenAiType.STRING },
                                        gap: { type: GenAiType.NUMBER },
                                        cols: { type: GenAiType.NUMBER },
                                        rows: { type: GenAiType.NUMBER },
                                        align: { type: GenAiType.STRING },
                                        justify: { type: GenAiType.STRING },
                                        wrap: { type: GenAiType.STRING }
                                      }
                                    },
                                    children: { type: GenAiType.ARRAY, items: { type: GenAiType.STRING } },
                                    parentId: { type: GenAiType.STRING, nullable: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        const response: any = await Promise.race([apiCallPromise, timeoutPromise]);
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        const validationResult = aiGeneratedTemplateSchema.safeParse(parsedJson);

        if (validationResult.success) {
            const { rootId, nodes: nodesArray } = validationResult.data;
            const nodesRecord = nodesArray.reduce((acc, node) => {
                acc[node.id] = { ...node, parentId: node.parentId || null };
                return acc;
            }, {} as Record<string, any>);
            
            loadProject(nodesRecord, rootId);
            addToast({ message: "Layout generated successfully!", type: 'success' });
            onClose();
        } else {
            console.error("AI Response Validation Error:", validationResult.error);
            setError(`AI returned an invalid data format.`);
        }
    } catch (e: any) {
        console.error("AI Generation Error:", e);
        setError(e.message || "An unknown error occurred.");
    } finally {
        setIsGenerating(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-base-100 flex flex-col animate-in fade-in duration-200">
      
      <TemplateWizardHeaderView title="Procedural Page Wizard" subtitle="Define your intent, and AI will construct the structure." isGenerating={isGenerating} onClose={onClose} />

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto bg-base-200/50">
         <div className="max-w-4xl mx-auto py-8 px-6 space-y-10">
            
            {/* 1. Page Archetype */}
            <section>
                <TemplateWizardStepHeaderView index={1} title="Page Archetype" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {PAGE_TYPES.map(type => (
                        <PageTypeCardView key={type.id} id={type.id} desc={type.desc} selected={pageType === type.id} onSelect={handlePageTypeChange} />
                    ))}
                </div>
            </section>

            {/* 2. Content Strategy */}
            <section>
                <TemplateWizardStepHeaderView index={2} title="Content Strategy" bg="bg-info/10" text="text-info" />
                <TemplateWizardContentStrategyView
                    textMode={contentStrategy.textMode}
                    imageMode={contentStrategy.imageMode}
                    onChangeTextMode={(m) => setContentStrategy(s => ({ ...s, textMode: m as any }))}
                    onChangeImageMode={(m) => setContentStrategy(s => ({ ...s, imageMode: m as any }))}
                />
                
            </section>

            {/* 3. Visual Style */}
            <section>
                <TemplateWizardStepHeaderView index={3} title="Visual Style" bg="bg-secondary/10" text="text-secondary" />
                <VisualStyleSelectorView options={VISUAL_STYLES} selected={visualStyle} onSelect={setVisualStyle} />
            </section>

            {/* 4. Sections & Overrides */}
            <section>
                <TemplateWizardStepHeaderView index={4} title="Structure & Overrides" bg="bg-accent/10" text="text-accent" />
                
                <TemplateWizardSectionsView
                    pageType={pageType}
                    suggestions={SECTION_SUGGESTIONS}
                    selectedSections={selectedSections}
                    expandedSection={expandedSection}
                    onToggleSelect={(sec, val) => {
                        setSelectedSections(prev => ({ ...prev, [sec]: val }));
                        if (!val && expandedSection === sec) setExpandedSection(null);
                    }}
                    onToggleExpand={(sec) => setExpandedSection(expandedSection === sec ? null : sec)}
                    sectionConfig={sectionConfig}
                    sectionInstructions={SECTION_INSTRUCTION}
                />
                {expandedSection && selectedSections[expandedSection] && (
                    <TemplateWizardSectionConfigView section={expandedSection} config={sectionConfig[expandedSection]} onChange={(key, val) => updateSectionConfig(expandedSection, key, val)} />
                )}
            </section>
                </div>

            {/* 5. Context */}
            <section>
                <TemplateWizardStepHeaderView index={5} title="Additional Context" bg="bg-base-300" text="text-base-content" />
                <TemplateWizardContextView value={description} placeholder={"e.g., A minimalist portfolio for a landscape photographer focusing on nature shots."} onChange={(v) => setDescription(v)} />
            </section>
            <TemplateWizardErrorAlertView message={error} onClose={() => setError(null)} />

         </div>
      </div>

        {/* Footer */}
        <TemplateWizardFooterView isGenerating={isGenerating} onCancel={onClose} onGenerate={handleGenerate} />

    </div>
  );
};
