
import React, { useState } from 'react';
import { Card, CardTitle, Button } from '../ui';
import { useLogicStore } from '../stores/logicStore';
import { LogicNode } from '../types';
import { Play, RotateCcw, CheckCircle, Loader2, Info, Settings2 } from 'lucide-react';
import { clsx } from 'clsx';

export const LogicLab: React.FC = () => {
  const { flows, activeFlowId, isRunning, runFlow, resetFlows, updateNodeConfig } = useLogicStore();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Default to first flow if none active, or the currently active one
  const displayFlow = activeFlowId ? flows.find(f => f.id === activeFlowId) : flows[0];

  if (!displayFlow) return <div>No flows definition found.</div>;

  const selectedNode = selectedNodeId ? displayFlow.nodes.find(n => n.id === selectedNodeId) : null;

  const handleSelectFlow = (id: string) => {
      useLogicStore.setState({ activeFlowId: id });
      setSelectedNodeId(null); // Reset step selection when flow changes
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Behavior Engine</h2>
          <p className="text-base-content/70">Visualize and simulate abstract logic flows and state machines.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="join">
                {flows.map(f => (
                    <button 
                        key={f.id}
                        className={`btn join-item ${displayFlow.id === f.id ? 'btn-neutral' : ''}`}
                        onClick={() => handleSelectFlow(f.id)}
                    >
                        {f.name}
                    </button>
                ))}
            </div>
            <div className="divider divider-horizontal mx-0"></div>
            <Button variant="ghost" onClick={resetFlows} disabled={isRunning}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button variant="primary" onClick={() => runFlow(displayFlow.id)} disabled={isRunning}>
                {isRunning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                Run Flow
            </Button>
        </div>
      </div>

      <Card className="bg-base-200">
        <div className="p-8">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            {displayFlow.nodes.map((node) => (
              <li 
                key={node.id} 
                className={clsx(
                    `step`,
                    node.status === 'success' ? 'step-primary' : (node.status === 'running' ? 'step-secondary' : ''),
                    'cursor-pointer transition-transform duration-200 hover:scale-105'
                )}
                data-content={node.status === 'success' ? '✓' : (node.status === 'running' ? '●' : '?')}
                onClick={() => setSelectedNodeId(node.id)}
              >
                <div className={clsx("flex flex-col items-center gap-2 mt-2 p-2 rounded-lg", selectedNodeId === node.id && "bg-primary/10 ring-2 ring-primary")}>
                  <span className="font-bold text-sm">{node.label}</span>
                  <StatusBadge status={node.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card bordered>
          <CardTitle className="text-sm uppercase tracking-wider text-base-content/50">Flow Context (JSON)</CardTitle>
          <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto text-xs font-mono h-64">
            {JSON.stringify(displayFlow, null, 2)}
          </pre>
        </Card>

        <Card bordered>
           <CardTitle>Step Inspector</CardTitle>
           <div className="h-64 overflow-y-auto p-4">
             {selectedNode ? (
                <div className="space-y-4 animate-in fade-in">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold">{selectedNode.label}</h4>
                        <span className="badge badge-ghost badge-sm font-mono uppercase">{selectedNode.type}</span>
                    </div>
                    <p className="text-sm text-base-content/80">
                      {selectedNode.description}
                    </p>
                    
                    {/* Logic Editor */}
                    {selectedNode.type === 'action' && (
                        <div className="mt-4 pt-4 border-t border-base-content/10 space-y-3 bg-base-200/50 p-3 rounded-lg">
                            <div className="text-xs font-bold uppercase opacity-50 flex items-center gap-2">
                                <Settings2 className="w-3 h-3" /> Runtime Config
                            </div>
                            
                            <div className="form-control">
                                <label className="label text-xs font-bold opacity-70 py-1">Action Type</label>
                                <select 
                                    className="select select-bordered select-xs w-full"
                                    value={selectedNode.config?.actionType || 'wait'}
                                    onChange={(e) => updateNodeConfig(displayFlow.id, selectedNode.id, { actionType: e.target.value as any })}
                                >
                                    <option value="wait">Wait (Delay)</option>
                                    <option value="setVariable">Set Variable</option>
                                    <option value="log">Log to Console</option>
                                </select>
                            </div>

                            {selectedNode.config?.actionType === 'wait' && (
                                <div className="form-control">
                                    <label className="label text-xs font-bold opacity-70 py-1">Duration (ms)</label>
                                    <input 
                                        type="number" 
                                        className="input input-bordered input-xs" 
                                        value={selectedNode.config?.duration || 0}
                                        onChange={(e) => updateNodeConfig(displayFlow.id, selectedNode.id, { duration: parseInt(e.target.value) })}
                                    />
                                </div>
                            )}

                            {selectedNode.config?.actionType === 'setVariable' && (
                                <>
                                    <div className="form-control">
                                        <label className="label text-xs font-bold opacity-70 py-1">Target Variable</label>
                                        <input 
                                            type="text" 
                                            className="input input-bordered input-xs" 
                                            placeholder="e.g. user.isLoggedIn"
                                            value={selectedNode.config?.targetVar || ''}
                                            onChange={(e) => updateNodeConfig(displayFlow.id, selectedNode.id, { targetVar: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-xs font-bold opacity-70 py-1">Value (JSON)</label>
                                        <input 
                                            type="text" 
                                            className="input input-bordered input-xs" 
                                            placeholder="true, 100, 'hello'"
                                            value={typeof selectedNode.config?.value === 'object' ? JSON.stringify(selectedNode.config?.value) : selectedNode.config?.value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Try to parse number or boolean, else keep as string
                                                let finalVal: any = val;
                                                if (val === 'true') finalVal = true;
                                                else if (val === 'false') finalVal = false;
                                                else if (!isNaN(Number(val)) && val.trim() !== '') finalVal = Number(val);
                                                
                                                updateNodeConfig(displayFlow.id, selectedNode.id, { value: finalVal });
                                            }}
                                        />
                                        <label className="label text-[10px] opacity-50 py-0">
                                            Supports primitives and simple strings.
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="text-xs text-base-content/50 italic pt-2 border-t border-base-content/10">
                        {selectedNode.type === 'action' 
                            ? "Configure side effects that will execute against the Runtime Store." 
                            : "Triggers are simulated in this view."}
                    </div>
                </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-base-content/50 animate-in fade-in">
                    <Info className="w-8 h-8 mb-2" />
                    <h4 className="font-bold">Flow Overview</h4>
                    <p className="text-sm">Select a step above to inspect or edit its logic.</p>
                </div>
             )}
           </div>
        </Card>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: LogicNode['status'] }) => {
  switch (status) {
    case 'idle': return <span className="badge badge-ghost badge-sm">Pending</span>;
    case 'running': return <span className="badge badge-info badge-sm animate-pulse">Running</span>;
    case 'success': return <span className="badge badge-success badge-sm">Done</span>;
    case 'error': return <span className="badge badge-error badge-sm">Error</span>;
    default: return null;
  }
};
