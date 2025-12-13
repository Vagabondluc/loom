
import React, { useEffect, useState } from 'react';
import { Navbar, NavItem, ToastContainer } from './ui';
import { KitchenSink } from './demo/KitchenSink';
import { LogicLab } from './demo/LogicLab';
import { StoryCreator } from './demo/StoryCreator';
import { ThemeGenerator } from './demo/ThemeGenerator';
import { VisualBuilder } from './demo/VisualBuilder';
import { Inspector } from './demo/Inspector';
import { RuntimeWorkbench } from './demo/RuntimeWorkbench';
import { useThemeStore } from './stores/themeStore';
import { useBuilderStore } from './demo/builder/store';
import { getThemeStyles } from './utils/themeStyles';
import { DemoView } from './types';
import { Palette, Github, Hammer, Search, Codesandbox, Library, Network, BookText } from 'lucide-react';
import { clsx } from 'clsx';
import { THEME_PRESETS, themes } from './config/themes';

const App: React.FC = () => {
  const [view, setView] = useState<DemoView>('material-library');
  const { theme, setTheme, config, updateConfig } = useThemeStore();
  
  // Conditionally get page settings only when the visual builder is active
  const pageSettings = useBuilderStore(s => (view === 'design-canvas' ? s.pageSettings : null));

  // Apply Theme & Design Tokens
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    const styles = getThemeStyles(config);
    Object.entries(styles).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
    
  }, [theme, config]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    const preset = THEME_PRESETS[newTheme] || THEME_PRESETS['default'];
    updateConfig(preset);
  };

  // Dynamic font class based on selection
  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }[config.fontType] || 'font-sans';
  
  const isGrowMode = view === 'design-canvas' && pageSettings?.heightMode === 'grow';

  return (
    <div className={clsx("min-h-screen bg-base-100 text-base-content transition-all duration-200 flex flex-col", fontClass)}>
      <Navbar 
        title="Loom"
        endAction={
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <Palette className="w-5 h-5" />
                <span className="hidden sm:inline">Theme</span>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto">
                {themes.map(t => (
                  <li key={t}>
                    <a 
                      className={theme === t ? 'active' : ''} 
                      onClick={() => handleThemeChange(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a href="https://github.com/saadeghi/daisyui" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost">
              <Github className="w-5 h-5" />
            </a>
          </div>
        }
      >
        <NavItem active={view === 'material-library'} onClick={() => setView('material-library')}>
          <div className="flex items-center gap-1">
            <Library className="w-4 h-4" /> Material Library
          </div>
        </NavItem>
        <NavItem active={view === 'design-canvas'} onClick={() => setView('design-canvas')}>
          <div className="flex items-center gap-1">
             <Hammer className="w-4 h-4" /> Design Canvas
          </div>
        </NavItem>
        <NavItem active={view === 'behavior-engine'} onClick={() => setView('behavior-engine')}>
          <div className="flex items-center gap-1">
            <Network className="w-4 h-4" /> Behavior Engine
          </div>
        </NavItem>
        <NavItem active={view === 'narrative-weaver'} onClick={() => setView('narrative-weaver')}>
           <div className="flex items-center gap-1">
             <BookText className="w-4 h-4" /> Narrative Weaver
           </div>
        </NavItem>
        <NavItem active={view === 'color-mill'} onClick={() => setView('color-mill')}>
           <div className="flex items-center gap-1">
             <Palette className="w-4 h-4" /> Color Mill
           </div>
        </NavItem>
        <NavItem active={view === 'inspector'} onClick={() => setView('inspector')}>
          <div className="flex items-center gap-1">
             <Search className="w-4 h-4" /> Inspector
          </div>
        </NavItem>
        <NavItem active={view === 'runtime-workbench'} onClick={() => setView('runtime-workbench')}>
          <div className="flex items-center gap-1">
             <Codesandbox className="w-4 h-4" /> Workbench
          </div>
        </NavItem>
      </Navbar>

      <main className={clsx(
        "transition-all",
        view === 'design-canvas' ? {
          "flex-1 flex flex-col": true,
          "overflow-hidden h-[calc(100vh-4rem)]": !isGrowMode,
          "overflow-auto": isGrowMode,
        }
        : view === 'color-mill'
          ? "w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1"
          : view === 'runtime-workbench' // Use full height for workbench
            ? "w-full flex-1"
            : "container mx-auto py-8 px-4 flex-1"
      )}>
        {view === 'material-library' && <KitchenSink setView={setView} />}
        {view === 'design-canvas' && <VisualBuilder />}
        {view === 'behavior-engine' && <LogicLab />}
        {view === 'narrative-weaver' && <StoryCreator />}
        {view === 'color-mill' && <ThemeGenerator />}
        {view === 'inspector' && <Inspector />}
        {view === 'runtime-workbench' && <RuntimeWorkbench />}
      </main>

      <ToastContainer />
    </div>
  );
};
export default App;
