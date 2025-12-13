
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Button } from '../ui';
import { COMPONENT_REGISTRY } from './builder/registries';
import { runtimeAdapterRegistry } from './builder/registry/runtime/registry';
import { RuntimeVariableEditor } from './builder/properties/RuntimeVariableEditor';
import { useRuntimeStore } from '../stores/runtimeStore';
import { componentToTemplate } from './builder/palette/utils';
import { Play, RotateCcw, Bug, Terminal, Activity, XCircle } from 'lucide-react';
import StageErrorView from '../ui/molecules/StageErrorView';
import { prelineAccordionTemplate, prelineModalTemplate, prelineTabsTemplate, genericFallbackTemplate } from '../../ui/molecules/RuntimeTemplateStrings';
import { clsx } from 'clsx';

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  payload?: any;
}

// Error Boundary for Stage
class StageErrorBoundary extends React.Component<{ children: React.ReactNode, onReset: () => void }, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
            return <StageErrorView message={this.state.error?.message} onReset={() => { this.setState({ hasError: false }); this.props.onReset(); }} />;
    }
    return this.props.children;
  }
}

// Stage Container - Mounts the node and initializes the adapter
const StageContainer: React.FC<{ targetId: string, log: any }> = ({ targetId, log }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const def = COMPONENT_REGISTRY[targetId];

    useEffect(() => {
        if (!containerRef.current) return;
        
        // 1. Mount Node (Simulated)
        const template = componentToTemplate(def);
        const rootNode = template.nodes[template.rootId];
        
        // Render Static HTML (Simplified for Workbench Isolation)
        const el = document.createElement(def.defaultTag || 'div');
        el.className = def.defaultClass;
        el.id = rootNode.id; 
        
        // Set Data Attributes
        if (rootNode.data.props) {
            Object.entries(rootNode.data.props).forEach(([k, v]) => {
                el.setAttribute(k, String(v));
            });
        }
        
        // Pre-fill content based on type for meaningful testing
        import { prelineAccordionTemplate, prelineModalTemplate, prelineTabsTemplate, genericFallbackTemplate } from '../../ui/molecules/RuntimeTemplateStrings';
        if (targetId === 'preline-accordion') {
             el.innerHTML = prelineAccordionTemplate;
        } else if (targetId === 'preline-modal') {
             el.innerHTML = prelineModalTemplate;
        } else if (targetId === 'preline-tabs') {
             el.innerHTML = prelineTabsTemplate;
        } else {
             // Generic Fallback
             el.innerHTML = genericFallbackTemplate(def.label);
        }

        containerRef.current.appendChild(el);
        log('System', 'DOM Mounted', { id: el.id });

        // 2. Initialize Adapter
        const adapter = runtimeAdapterRegistry.getAdapterForNode(rootNode);
        let cleanup: any;
        
        if (adapter) {
            const start = performance.now();
            cleanup = adapter.init({
                node: rootNode,
                element: el,
                log: (evt, payload) => log('Adapter', evt, payload)
            });
            const duration = (performance.now() - start).toFixed(2);
            log('System', `Adapter Init: ${adapter.id}`, { duration: `${duration}ms` });
        } else {
            log('System', 'No Adapter Found', { type: targetId });
        }

        return () => {
            if (cleanup) cleanup();
            if (containerRef.current) containerRef.current.innerHTML = '';
            log('System', 'Teardown Complete');
        };
    }, [targetId, def, log]);

    return <div ref={containerRef} className="w-full h-full p-4" />;
};

export const RuntimeWorkbench: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('preline-accordion');
  const [mountKey, setMountKey] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const resetVariables = useRuntimeStore(s => s.resetVariables);

  // Applets only
  const targets = Object.values(COMPONENT_REGISTRY).filter(c => c.kind === 'applet');

  const addLog = useCallback((source: string, event: string, payload?: any) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      source,
      event,
      payload
    }]);
  }, []);

  const handleReset = () => {
    setMountKey(k => k + 1);
    setLogs([]);
    resetVariables();
    addLog('System', 'Stage Reset');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-base-200 p-4 gap-4 animate-in fade-in">
      {/* 1. Stimulus Panel */}
      <div className="lg:w-80 flex flex-col gap-4">
        <Card className="flex-1 flex flex-col overflow-hidden bg-base-100 shadow-sm" bordered>
            <div className="p-3 border-b border-base-200 bg-base-100 font-bold flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-primary" /> Stimulus
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                
                <div className="form-control">
                    <label className="label text-xs font-bold opacity-70">Target (DUT)</label>
                    <select 
                        className="select select-bordered select-sm w-full"
                        value={selectedTargetId}
                        onChange={(e) => { setSelectedTargetId(e.target.value); handleReset(); }}
                    >
                        {targets.map(t => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                    </select>
                </div>

                <div className="divider text-xs">Runtime State</div>
                <div className="text-[10px] opacity-60 mb-2">Edit values to test data binding.</div>
                <RuntimeVariableEditor />

                <div className="divider text-xs">Action Triggers</div>
                <div className="grid grid-cols-1 gap-2">
                    <Button size="sm" variant="ghost" className="border border-base-300 justify-start h-auto py-2" onClick={() => addLog('User', 'Trigger: Manual Logic')}>
                        <span className="text-left">
                            <span className="block font-bold text-xs">Fire: Custom Event</span>
                            <span className="block text-[10px] opacity-50 font-normal">Simulate logic trigger</span>
                        </span>
                    </Button>
                </div>
            </div>
        </Card>
      </div>

      {/* 2. Stage (Center) */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
         <Card className="flex-1 bg-base-100 shadow-sm relative overflow-hidden flex flex-col" bordered>
            <div className="p-3 border-b border-base-200 bg-base-100 font-bold flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-success" /> Stage (Runtime Active)
                </div>
                <Button size="xs" variant="ghost" onClick={handleReset}>
                    <RotateCcw className="w-3 h-3 mr-1" /> Reset
                </Button>
            </div>
            
            {/* Checkerboard Background */}
            <div className="flex-1 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 flex items-center justify-center bg-base-200/30 overflow-auto">
                <StageErrorBoundary key={mountKey} onReset={handleReset}>
                    <StageContainer targetId={selectedTargetId} log={addLog} />
                </StageErrorBoundary>
            </div>
         </Card>
      </div>

      {/* 3. Logs (Bottom/Right) */}
      <div className="lg:w-80 flex flex-col">
         <Card className="h-full flex flex-col bg-neutral text-neutral-content shadow-sm overflow-hidden" bordered={false}>
            <div className="p-3 border-b border-neutral-content/10 font-bold flex justify-between items-center text-sm bg-neutral">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Oscilloscope
                </div>
                <button onClick={() => setLogs([])} className="btn btn-xs btn-ghost btn-square text-neutral-content/50 hover:text-white">
                    <XCircle className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1 bg-neutral/90">
                {logs.length === 0 && (
                    <div className="opacity-30 text-center mt-10">Waiting for runtime events...</div>
                )}
                {logs.map(log => (
                    <div key={log.id} className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity border-b border-white/5 pb-1 mb-1">
                        <span className="opacity-40 select-none w-14 shrink-0">[{log.timestamp}]</span>
                        <div className="flex-1 break-all">
                            <span className={clsx(
                                "font-bold mr-2",
                                log.source === 'Adapter' ? "text-success" : (log.source === 'System' ? "text-warning" : "text-info")
                            )}>{log.source}:</span>
                            <span className="mr-2">{log.event}</span>
                            {log.payload && (
                                <span className="opacity-50 block mt-0.5 text-[10px]">{JSON.stringify(log.payload)}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
         </Card>
      </div>
    </div>
  );
};
