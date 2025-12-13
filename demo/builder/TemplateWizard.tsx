
import React, { useState } from 'react';
import { useBuilderStore } from './store';
import { useToastStore } from '../../stores/toastStore';
import { aiGeneratedTemplateSchema } from '../../services/aiTemplateSchema';
import { buildTemplateWizardPrompt, ContentStrategy, SectionConfig } from '../../services/promptBuilder';
import { COMPONENT_REGISTRY } from './registries';
import { ai } from '../../services/ai';
import { Type as GenAiType } from '@google/genai';
import { 
  Wand2, X, LayoutTemplate, Palette, Type, 
  FileText, AlignLeft, Heading, Ban, Image as ImageIcon, Box, Link as LinkIcon,
  Check, AlertCircle, Sparkles, ChevronDown, ChevronUp, Layout
} from 'lucide-react';
import { clsx } from 'clsx';

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
      
      {/* Header */}
      <div className="navbar border-b border-base-200 px-6 h-16 flex-shrink-0 bg-base-100">
        <div className="flex-1 flex flex-col items-start justify-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" /> Procedural Page Wizard
            </h2>
            <p className="text-xs text-base-content/60">Define your intent, and AI will construct the structure.</p>
        </div>
        <div className="flex-none">
            <button className="btn btn-ghost btn-circle" onClick={onClose} disabled={isGenerating}>
                <X className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto bg-base-200/50">
         <div className="max-w-4xl mx-auto py-8 px-6 space-y-10">
            
            {/* 1. Page Archetype */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <h3 className="text-lg font-bold">Page Archetype</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {PAGE_TYPES.map(type => (
                        <div 
                            key={type.id}
                            className={clsx(
                                "card card-bordered cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]",
                                pageType === type.id ? "border-primary ring-1 ring-primary bg-base-100" : "bg-base-100 border-base-300 hover:border-base-content/30"
                            )}
                            onClick={() => handlePageTypeChange(type.id)}
                        >
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-sm">{type.id}</h4>
                                    {pageType === type.id && <Check className="w-4 h-4 text-primary" />}
                                </div>
                                <p className="text-xs text-base-content/70">{type.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Content Strategy */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info font-bold">2</div>
                    <h3 className="text-lg font-bold">Content Strategy</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                    {/* Text Mode */}
                    <div className="form-control w-full">
                        <label className="label text-sm font-bold opacity-70">Text Placeholders</label>
                        <div className="join w-full">
                            {[
                                { id: 'realistic', label: 'Realistic', icon: FileText },
                                { id: 'lorem', label: 'Lorem', icon: AlignLeft },
                                { id: 'headings', label: 'Heads', icon: Heading },
                                { id: 'empty', label: 'None', icon: Ban }
                            ].map(opt => (
                                <input
                                    key={opt.id}
                                    className="join-item btn btn-sm flex-1"
                                    type="radio"
                                    name="textMode"
                                    aria-label={opt.label}
                                    checked={contentStrategy.textMode === opt.id}
                                    onChange={() => setContentStrategy(s => ({ ...s, textMode: opt.id as any }))}
                                />
                            ))}
                        </div>
                        <div className="label">
                            <span className="label-text-alt opacity-60">
                                {contentStrategy.textMode === 'realistic' && 'Context-aware marketing copy.'}
                                {contentStrategy.textMode === 'lorem' && 'Standard Latin filler text.'}
                                {contentStrategy.textMode === 'headings' && 'Headlines only, no body text.'}
                                {contentStrategy.textMode === 'empty' && 'Structural skeleton only.'}
                            </span>
                        </div>
                    </div>

                    {/* Image Mode */}
                    <div className="form-control w-full">
                        <label className="label text-sm font-bold opacity-70">Image Placeholders</label>
                        <div className="join w-full">
                            {[
                                { id: 'picsum', label: 'Picsum', icon: ImageIcon },
                                { id: 'solid', label: 'Solid', icon: Box },
                                { id: 'custom', label: 'URL', icon: LinkIcon },
                                { id: 'none', label: 'None', icon: Ban }
                            ].map(opt => (
                                <input
                                    key={opt.id}
                                    className="join-item btn btn-sm flex-1"
                                    type="radio"
                                    name="imageMode"
                                    aria-label={opt.label}
                                    checked={contentStrategy.imageMode === opt.id}
                                    onChange={() => setContentStrategy(s => ({ ...s, imageMode: opt.id as any }))}
                                />
                            ))}
                        </div>
                        <div className="label">
                            <span className="label-text-alt opacity-60">
                                {contentStrategy.imageMode === 'picsum' && 'Random stock photography.'}
                                {contentStrategy.imageMode === 'solid' && 'Neutral colored blocks.'}
                                {contentStrategy.imageMode === 'custom' && 'Static placeholder URL.'}
                                {contentStrategy.imageMode === 'none' && 'Layout containers only.'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Visual Style */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">3</div>
                    <h3 className="text-lg font-bold">Visual Style</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {VISUAL_STYLES.map(style => (
                        <button
                            key={style.id}
                            className={clsx(
                                "btn btn-sm",
                                visualStyle === style.id ? "btn-secondary" : "btn-ghost border-base-300"
                            )}
                            onClick={() => setVisualStyle(style.id)}
                        >
                            {style.id}
                        </button>
                    ))}
                </div>
            </section>

            {/* 4. Sections & Overrides */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">4</div>
                    <h3 className="text-lg font-bold">Structure & Overrides</h3>
                </div>
                
                <div className="flex flex-col gap-2">
                    {SECTION_SUGGESTIONS[pageType]?.length > 0 ? (
                        SECTION_SUGGESTIONS[pageType].map(section => {
                            const isSelected = !!selectedSections[section];
                            const isExpanded = expandedSection === section;
                            const config = sectionConfig[section] || {};
                            const instructorTip = SECTION_INSTRUCTION[section];

                            return (
                                <div key={section} className={clsx("card card-bordered card-compact transition-all", isSelected ? "bg-base-100 shadow-sm border-base-300" : "bg-transparent border-transparent opacity-50")}>
                                    <div className="card-body flex-row items-center gap-4 py-3">
                                        <input 
                                            type="checkbox" 
                                            className="checkbox checkbox-sm checkbox-primary"
                                            checked={isSelected}
                                            onChange={(e) => {
                                                setSelectedSections(prev => ({ ...prev, [section]: e.target.checked }));
                                                if (!e.target.checked && expandedSection === section) setExpandedSection(null);
                                            }}
                                        />
                                        
                                        <div className="flex-1 cursor-pointer" onClick={() => isSelected && setExpandedSection(isExpanded ? null : section)}>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm">{section}</span>
                                                {instructorTip && <span className="badge badge-ghost badge-xs font-normal opacity-70 hidden sm:inline-flex">Purpose</span>}
                                            </div>
                                            {instructorTip && <p className="text-xs opacity-60 mt-0.5">{instructorTip}</p>}
                                        </div>

                                        {isSelected && (
                                            <button 
                                                className="btn btn-xs btn-ghost btn-square"
                                                onClick={() => setExpandedSection(isExpanded ? null : section)}
                                            >
                                                {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                            </button>
                                        )}
                                    </div>

                                    {/* Config Panel */}
                                    {isSelected && isExpanded && (
                                        <div className="bg-base-200/50 p-4 border-t border-base-200 rounded-b-xl animate-in slide-in-from-top-1">
                                            <div className="text-[10px] font-bold uppercase opacity-40 mb-3 tracking-wider flex items-center gap-2">
                                                <Layout className="w-3 h-3" /> Section Configuration
                                            </div>
                                            
                                            {section === 'Hero' && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="form-control">
                                                        <label className="label text-xs py-1">Layout</label>
                                                        <select className="select select-bordered select-xs" value={config.layout || 'split'} onChange={(e) => updateSectionConfig(section, 'layout', e.target.value)}>
                                                            <option value="split">Split (Left/Right)</option>
                                                            <option value="centered">Centered</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label text-xs py-1">Media</label>
                                                        <select className="select select-bordered select-xs" value={config.image || 'default'} onChange={(e) => updateSectionConfig(section, 'image', e.target.value)}>
                                                            <option value="default">Image</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            {(section === 'Feature Grid' || section === 'Features') && (
                                                <div className="form-control">
                                                    <label className="label text-xs py-1">Count</label>
                                                    <div className="join">
                                                        {[3, 4, 6].map(n => (
                                                            <button key={n} className={`join-item btn btn-xs ${config.count === n ? 'btn-active' : ''}`} onClick={() => updateSectionConfig(section, 'count', n)}>{n}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {section === 'Footer' && (
                                                <div className="form-control">
                                                    <label className="label text-xs py-1">Complexity</label>
                                                    <div className="join">
                                                        <button className={`join-item btn btn-xs ${config.style === 'simple' ? 'btn-active' : ''}`} onClick={() => updateSectionConfig(section, 'style', 'simple')}>Simple</button>
                                                        <button className={`join-item btn btn-xs ${config.style === 'complex' ? 'btn-active' : ''}`} onClick={() => updateSectionConfig(section, 'style', 'complex')}>Multi-Column</button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Generic / Fallback */}
                                            {section !== 'Hero' && section !== 'Feature Grid' && section !== 'Features' && section !== 'Footer' && (
                                                <div className="text-xs opacity-50 italic">No specific overrides available for this section.</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center opacity-50 border border-dashed border-base-300 rounded-lg">
                            <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-50" />
                            No default sections for this archetype.
                        </div>
                    )}
                </div>
            </section>

            {/* 5. Context */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center font-bold">5</div>
                    <h3 className="text-lg font-bold">Additional Context</h3>
                </div>
                <textarea 
                    className="textarea textarea-bordered w-full h-24"
                    placeholder="e.g., A minimalist portfolio for a landscape photographer focusing on nature shots."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </section>

            {error && (
                <div className="alert alert-error shadow-lg">
                    <AlertCircle className="w-6 h-6" />
                    <span>{error}</span>
                </div>
            )}

         </div>
      </div>

      {/* Footer */}
      <div className="border-t border-base-200 p-4 bg-base-100 flex items-center justify-between flex-shrink-0">
         <div className="text-xs opacity-50 hidden sm:block">
            Generates static, editable nodes. No runtime JS.
         </div>
         <div className="flex gap-3">
             <button className="btn btn-ghost" onClick={onClose} disabled={isGenerating}>Cancel</button>
             <button className="btn btn-primary min-w-[160px]" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? <span className="loading loading-spinner loading-xs"></span> : <Sparkles className="w-4 h-4 mr-2" />}
                {isGenerating ? 'Weaving...' : 'Generate Page'}
             </button>
         </div>
      </div>

    </div>
  );
};
