
import React, { useEffect, useState, useRef } from 'react';
import { useBuilderStore } from './store';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';
import { useCommands } from './commands/useCommands';
import { CommandAction } from './commands/types';

interface CommandPaletteProps {
  onExport: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onExport }) => {
  const isOpen = useBuilderStore(s => s.isCommandPaletteOpen);
  const setOpen = useBuilderStore(s => s.setCommandPaletteOpen);
  
  const commands = useCommands(onExport);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredActions = commands.filter(action => {
    const q = query.toLowerCase();
    return (
      action.label.toLowerCase().includes(q) ||
      action.keywords?.some(k => k.includes(q))
    );
  });

  const executeAction = (action: CommandAction) => {
    action.perform();
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        executeAction(filteredActions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200" onClick={() => setOpen(false)}>
      <div 
        className="modal-box p-0 max-w-lg bg-base-100 shadow-2xl overflow-hidden ring-1 ring-base-content/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center border-b border-base-200 px-4 py-3 gap-3">
          <Search className="w-5 h-5 opacity-50" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-base placeholder:opacity-50 h-6"
            placeholder="Type a command or search..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="kbd kbd-sm text-xs">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredActions.length === 0 ? (
              <EmptyStateView message="No commands found." className="py-2 text-sm" />
          ) : (
            <ul className="menu menu-sm w-full p-0">
              {filteredActions.map((action, idx) => (
                <li key={action.id}>
                  <a 
                    className={clsx(
                      "flex justify-between gap-3 active:bg-primary active:text-primary-content",
                      idx === selectedIndex && "bg-base-200 focus"
                    )}
                    onClick={() => executeAction(action)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="opacity-70">{action.icon}</span>
                      <span className={action.id === 'delete-node' ? 'text-error' : ''}>{action.label}</span>
                    </div>
                    {action.shortcut && (
                      <div className="flex gap-1">
                          {action.shortcut.split('+').map(k => <kbd key={k} className="kbd kbd-xs">{k}</kbd>)}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="bg-base-200/50 p-2 border-t border-base-200 text-[10px] text-center opacity-50 flex justify-between px-4">
             <span>Build faster with shortcuts</span>
             <span>Loom v1.0</span>
        </div>
      </div>
    </div>
  );
};