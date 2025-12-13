
import React, { useState, useMemo } from 'react';
import { Modal, Button, Badge } from '../../ui';
import { useBuilderStore } from './store';
import { validateImport } from './serialization';
import { EXPORT_TARGETS, ExportFidelity } from './export/manifest';
import { validateExport } from './export/validator';
import { Upload, Check, Copy, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import ExportTargetItemView from '../../ui/molecules/ExportTargetItemView';
import ValidationIssueView from '../../ui/molecules/ValidationIssueView';
import { clsx } from 'clsx';

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

const FidelityBadge = ({ fidelity }: { fidelity: ExportFidelity }) => {
    switch (fidelity) {
        case 'lossless':
            return <Badge variant="success" size="sm" outline>Lossless</Badge>;
        case 'source':
            return <Badge variant="info" size="sm" outline>Dev Source</Badge>;
        case 'structural':
            return <Badge variant="warning" size="sm" outline>Structural</Badge>;
        case 'semantic':
            return <Badge variant="accent" size="sm" outline>Semantic</Badge>;
        case 'design-tokens':
            return <Badge variant="neutral" size="sm" outline>Tokens</Badge>;
        default:
            return null;
    }
};

export const ExportModal: React.FC<ExportModalProps> = ({ open, onClose }) => {
  const nodes = useBuilderStore(s => s.nodes);
  const rootId = useBuilderStore(s => s.rootNodeId);
  const loadProject = useBuilderStore(s => s.loadProject);
  
  const [selectedTargetId, setSelectedTargetId] = useState<string>('jsx');
  const [mode, setMode] = useState<'export' | 'import'>('export');
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedTarget = EXPORT_TARGETS.find(t => t.id === selectedTargetId) || EXPORT_TARGETS[0];

  const content = useMemo(() => {
      if (mode === 'import') return '';
      if (!selectedTarget.generator) return '';
      return selectedTarget.generator(nodes, rootId);
  }, [selectedTarget, nodes, rootId, mode]);

  const validationIssues = useMemo(() => {
      if (mode === 'import') return [];
      return validateExport(nodes, selectedTarget);
  }, [selectedTarget, nodes, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    const importedNodes = validateImport(importText);
    if (importedNodes) {
        loadProject(importedNodes, 'root');
        onClose();
    } else {
        alert("Invalid JSON structure. Please check your input.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Export Wizard" className="max-w-5xl w-full h-[80vh]">
      <div className="flex h-full -mx-6 -mb-6 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-base-200 border-r border-base-300 flex-shrink-0 flex flex-col">
            <div className="p-4 border-b border-base-300 bg-base-200/50">
                <div className="join w-full">
                    <button 
                        className={clsx("join-item btn btn-sm flex-1", mode === 'export' ? "btn-active btn-neutral" : "btn-ghost")}
                        onClick={() => setMode('export')}
                    >
                        Export
                    </button>
                    <button 
                        className={clsx("join-item btn btn-sm flex-1", mode === 'import' ? "btn-active btn-neutral" : "btn-ghost")}
                        onClick={() => setMode('import')}
                    >
                        Import
                    </button>
                </div>
            </div>

            {mode === 'export' ? (
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase opacity-50 tracking-wider">Targets</div>
                    {EXPORT_TARGETS.map(target => (
                        <ExportTargetItemView key={target.id} target={target as any} selected={selectedTargetId === target.id} onSelect={(id) => setSelectedTargetId(id)} />
                    ))}
                </div>
            ) : (
                <div className="p-4 text-xs opacity-70">
                    Paste a JSON Blueprint here to restore a project.
                </div>
            )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-base-100">
            {mode === 'export' ? (
                <>
                    <div className="p-4 border-b border-base-300 flex justify-between items-start bg-base-100">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-lg font-bold">{selectedTarget.label}</h2>
                                <FidelityBadge fidelity={selectedTarget.fidelity} />
                            </div>
                            <p className="text-sm opacity-70">{selectedTarget.description}</p>
                        </div>
                        <Button 
                            size="sm" 
                            variant="primary" 
                            onClick={handleCopy}
                            className="gap-2"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy Code'}
                        </Button>
                    </div>

                    {validationIssues.length > 0 && (
                        <div className="bg-base-200/50 border-b border-base-300 p-3 space-y-1">
                            <div className="text-[10px] font-bold uppercase opacity-50 tracking-wider mb-1 px-1">Fidelity Report</div>
                                    {validationIssues.map((issue) => (
                                        <ValidationIssueView key={issue.id} issue={issue as any} />
                                    ))}
                        </div>
                    )}

                    <div className="flex-1 relative bg-neutral text-neutral-content font-mono text-xs overflow-auto">
                        <textarea 
                            className="w-full h-full bg-transparent p-6 resize-none focus:outline-none font-mono leading-relaxed"
                            readOnly
                            value={content}
                        />
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Upload className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold">Import Blueprint</h2>
                    </div>
                    <textarea 
                        className="flex-1 textarea textarea-bordered font-mono text-xs mb-4"
                        placeholder='Paste project JSON here: { "rootId": "...", "nodes": { ... } }'
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setImportText('')}>Clear</Button>
                        <Button variant="primary" onClick={handleImport} disabled={!importText.trim()}>
                            Import Project
                        </Button>
                    </div>
                </div>
            )}
        </div>

      </div>
    </Modal>
  );
};
