
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import * as LucideIcons from 'lucide-react';
import { Card, Button, EmptyStateView } from '../../ui';
import { useToastStore } from '../../stores/toastStore';
import { Search, SlidersHorizontal, Tag as TagIcon, X } from 'lucide-react';
import { clsx } from 'clsx';

const BATCH_SIZE = 100;
const DENYLIST = new Set(['createLucideIcon', 'Icon', 'lucide', 'default', 'icons', 'LucideIcon', 'LucideProps']);

// Heuristic Category Mapping
const CATEGORIES: Record<string, string[]> = {
  'Arrows': ['Arrow', 'Chevron', 'Corner', 'Move', 'Refresh', 'Rotate', 'Undo', 'Redo', 'Expand', 'Shrink', 'ExternalLink', 'FastForward', 'Rewind', 'Shuffle', 'Repeat'],
  'Communication': ['Mail', 'Message', 'Phone', 'Send', 'Share', 'Inbox', 'Bell', 'Chat', 'AtSign', 'Hash', 'Megaphone', 'Contact', 'Voicemail'],
  'Media': ['Play', 'Pause', 'Video', 'Image', 'Camera', 'Music', 'Film', 'Mic', 'Volume', 'Cast', 'Headphones', 'Radio', 'Speaker', 'Clapperboard', 'Disc'],
  'Editor': ['Text', 'Align', 'Bold', 'Italic', 'List', 'Link', 'Edit', 'Type', 'Heading', 'Underline', 'Copy', 'Paste', 'Scissors', 'Eraser', 'Highlighter', 'Quote'],
  'Interface': ['Menu', 'Grid', 'Layout', 'Settings', 'Search', 'User', 'Home', 'Loader', 'Trash', 'Check', 'X', 'Plus', 'Minus', 'More', 'Filter', 'Sort', 'Toggle', 'Switch', 'Login', 'Logout'],
  'Files': ['File', 'Folder', 'Save', 'Download', 'Upload', 'Archive', 'Clipboard', 'Sheet', 'Book', 'Box', 'Package', 'Printer', 'Briefcase'],
  'Development': ['Code', 'Git', 'Terminal', 'Database', 'Server', 'Bug', 'Cpu', 'Braces', 'Workflow', 'Command', 'Binary', 'Network', 'Webhook', 'Variable'],
  'Weather': ['Sun', 'Cloud', 'Rain', 'Wind', 'Moon', 'Snow', 'Thermometer', 'Umbrella', 'Sunset', 'Sunrise', 'Zap', 'Cloudy'],
  'Shapes': ['Circle', 'Square', 'Triangle', 'Hexagon', 'Octagon', 'Star', 'Heart', 'Diamond', 'Pentagon', 'Cone', 'Cylinder', 'Pyramid'],
  'Commerce': ['CreditCard', 'Dollar', 'Euro', 'Shopping', 'Wallet', 'Banknote', 'Percent', 'Tag', 'Calculator', 'Coins', 'Receipt', 'Store', 'Gift', 'Trophy', 'Award'],
  'Security': ['Lock', 'Unlock', 'Key', 'Shield', 'Eye', 'EyeOff', 'Fingerprint', 'Siren', 'Spy', 'Verified', 'Badge'],
  'Navigation': ['Map', 'Pin', 'Navigation', 'Compass', 'Globe', 'Locate', 'Flag', 'Anchor', 'Route', 'Signpost', 'Milestone', 'Car', 'Plane', 'Bus'],
  'Devices': ['Monitor', 'Smartphone', 'Tablet', 'Laptop', 'Watch', 'Tv', 'Wifi', 'Battery', 'Bluetooth', 'HardDrive', 'Keyboard', 'Mouse', 'Printer'],
  'Time': ['Clock', 'Calendar', 'Timer', 'Hourglass', 'Alarm', 'Watch', 'History', 'Sand', 'Stopwatch'],
  'Tools': ['Wrench', 'Hammer', 'Axe', 'Pen', 'Brush', 'Palette', 'Ruler', 'Gavel', 'Drill', 'Shovel', 'Construction', 'Nut', 'Bolt']
};

export const IconLibrarySection: React.FC = () => {
  // Search & Filter State
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  
  // Theming State
  const [size, setSize] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [showControls, setShowControls] = useState(false);

  const addToast = useToastStore(s => s.addToast);

  // Memoized Filtering
  const { filteredIcons, totalCount } = useMemo(() => {
    const query = search.toLowerCase().trim();
    
    // 1. Get Base Valid Icons
    const allEntries = Object.entries(LucideIcons).filter(([name, component]) => {
      if (!/^[A-Z]/.test(name)) return false;
      if (DENYLIST.has(name)) return false;
      const type = typeof component;
      return type === 'function' || (type === 'object' && component !== null);
    });

    // 2. Apply Filters
    const filtered = allEntries.filter(([name]) => {
      // Search Filter
      const matchesSearch = !query || name.toLowerCase().includes(query);
      
      // Category Filter
      let matchesCategory = true;
      if (activeCategory) {
        const keywords = CATEGORIES[activeCategory];
        matchesCategory = keywords.some(k => name.includes(k));
      }

      return matchesSearch && matchesCategory;
    });

    // 3. Sort
    filtered.sort((a, b) => a[0].localeCompare(b[0]));

    return { filteredIcons: filtered, totalCount: filtered.length };
  }, [search, activeCategory]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [search, activeCategory]);

  const displayedIcons = filteredIcons.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name);
    addToast({ message: `Copied: ${name}`, type: 'success' });
  }, [addToast]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + BATCH_SIZE, totalCount));
  };

  return (
    <section id="icons" className="space-y-6 scroll-mt-24 animate-in fade-in">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Icon Library</h2>
        <p className="text-base-content/70">
          Browse the full set of <strong>Lucide React</strong> icons. 
          Use the toolbar to customize the preview size and weight.
        </p>
      </div>

      <Card bordered className="min-h-[500px] overflow-visible">
        
        {/* Sticky Controls Header */}
        <div className="sticky top-0 z-20 bg-base-100 pb-2 border-b border-base-200 mb-4 pt-2 -mt-2 rounded-t-box">
          
          {/* Top Bar: Search & Toggle */}
          <div className="flex items-center gap-2 px-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input 
                type="text" 
                className="input input-bordered input-sm w-full pl-10" 
                placeholder={`Search ${totalCount} icons...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-xs btn-circle btn-ghost">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <button 
                className={clsx("btn btn-sm", showControls ? "btn-neutral" : "btn-ghost border-base-300")}
                onClick={() => setShowControls(!showControls)}
            >
                <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Theming Controls (Collapsible) */}
          {showControls && (
             <div className="px-4 py-4 bg-base-200/50 mt-2 border-y border-base-200 animate-in slide-in-from-top-2">
                <div className="flex flex-wrap gap-8 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-bold uppercase opacity-50">Size</span>
                            <span className="text-xs font-mono opacity-70">{size}px</span>
                        </div>
                        <input 
                            type="range" min="16" max="64" step="4" 
                            value={size} onChange={(e) => setSize(parseInt(e.target.value))}
                            className="range range-xs range-primary" 
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-bold uppercase opacity-50">Stroke</span>
                            <span className="text-xs font-mono opacity-70">{strokeWidth}px</span>
                        </div>
                        <input 
                            type="range" min="0.5" max="3" step="0.25" 
                            value={strokeWidth} onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                            className="range range-xs range-secondary" 
                        />
                    </div>
                </div>
             </div>
          )}

          {/* Tags Row */}
          <div className="flex gap-2 overflow-x-auto py-2 px-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
             <button 
                className={clsx("btn btn-xs rounded-full flex-shrink-0", !activeCategory ? "btn-neutral" : "btn-ghost border-base-300")}
                onClick={() => setActiveCategory(null)}
             >
                All
             </button>
             {Object.keys(CATEGORIES).map(cat => (
                 <button
                    key={cat}
                    className={clsx(
                        "btn btn-xs rounded-full flex-shrink-0", 
                        activeCategory === cat ? "btn-neutral" : "btn-ghost border-base-300"
                    )}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                 >
                    {activeCategory === cat && <TagIcon className="w-3 h-3 mr-1" />}
                    {cat}
                 </button>
             ))}
          </div>

          {/* Stats Bar */}
          <div className="text-[10px] opacity-40 px-3 pt-1 flex justify-between">
             <span>Showing {displayedIcons.length} of {totalCount}</span>
             <span>Lucide v0.378.0</span>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="p-2 min-h-[400px]">
            {displayedIcons.length === 0 ? (
            <EmptyStateView message="No icons found" subMessage="Try searching for another category." />
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {displayedIcons.map(([name, IconComponent]) => (
                <button
                    key={name}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-base-200 hover:text-primary transition-all border border-transparent hover:border-base-300 group active:scale-95 relative"
                    onClick={() => handleCopy(name)}
                    title={`Copy "${name}"`}
                    style={{ minHeight: `${size + 40}px` }}
                >
                    {/* @ts-ignore */}
                    <IconComponent 
                        size={size} 
                        strokeWidth={strokeWidth} 
                        className="text-base-content/80 group-hover:text-primary transition-colors duration-200" 
                    />
                    <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100 truncate w-full text-center select-all mt-2 absolute bottom-2 px-2">
                    {name}
                    </span>
                </button>
                ))}
            </div>
            )}
        </div>

        {/* Load More Trigger */}
        {hasMore && (
          <div className="flex justify-center py-6 border-t border-base-200">
            <Button variant="ghost" onClick={loadMore} className="w-full sm:w-auto">
              Load More Icons ({totalCount - visibleCount} remaining)
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};
