
import React from 'react';
import { useBuilderStore } from './store';
import { COMPONENT_REGISTRY } from './registries';
import { Trash2, Settings2, PlayCircle } from 'lucide-react';
import { LayoutEditor } from './properties/LayoutEditor';
import { InteractionEditor } from './properties/InteractionEditor';
import { ContentEditor } from './properties/ContentEditor';
import { StyleEditor } from './properties/StyleEditor';
import { LogicEditor } from './properties/LogicEditor';
import { SchemaEditor } from './properties/SchemaEditor';
import { RuntimeVariableEditor } from './properties/RuntimeVariableEditor';
import { PageSettingsEditor } from './properties/PageSettingsEditor';
import { DocumentEditor } from './properties/DocumentEditor';
import { Alert, PanelHeaderView } from '../../ui';

export const BuilderProperties: React.FC = () => {
  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const nodes = useBuilderStore(s => s.nodes);
  const deleteNode = useBuilderStore(s => s.deleteNode);

    if (!selectedNodeId) {
     return (
      <div className="w-72 bg-base-200 border-l border-base-300 flex flex-col h-full">
        <PanelHeaderView title="Settings" icon={<Settings2 className="w-4 h-4" />} />
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <PageSettingsEditor />
          <div className="divider"></div>
          <RuntimeVariableEditor />
        </div>
      </div>
     );
    }

  const node = nodes[selectedNodeId];
  if (!node) return null;

  const def = COMPONENT_REGISTRY[node.type];
  const isRoot = node.id === 'root';
  const isApplet = def.kind === 'applet';
  const isDocument = node.type === 'markdown';
  
  return (
    <div className="w-72 bg-base-200 border-l border-base-300 flex flex-col h-full">
      <div className="p-4 border-b border-base-300 bg-base-300/50 flex justify-between items-center">
        <div className="overflow-hidden">
          <h2 className="font-bold text-sm truncate">{isRoot ? 'Project Root' : def.label}</h2>
          <div className="text-[10px] font-mono opacity-50 truncate">{node.id}</div>
        </div>
        {!isRoot && (
          <button 
            className="btn btn-square btn-ghost btn-sm text-error"
            onClick={() => deleteNode(selectedNodeId)}
            title="Delete Node"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {isApplet && (
            <Alert variant="info" className="text-xs p-2 gap-2" icon={<PlayCircle className="w-4 h-4" />}>
              Interactive only in <strong>Preview Mode</strong> (`Ctrl+P`).
            </Alert>
        )}
        
        {/* Root Node: Runtime Variables */}
        {isRoot && <PageSettingsEditor />}
        {isRoot && <div className="divider m-0"></div>}
        {isRoot && <RuntimeVariableEditor />}

        {!isRoot && <LogicEditor node={node} />}
        
        {!isRoot && <SchemaEditor node={node} />}

        {def.allowChildren && <LayoutEditor node={node} />}

        {isDocument ? (
            <DocumentEditor node={node} />
        ) : (
            <ContentEditor node={node} />
        )}

        <InteractionEditor node={node} />

        <StyleEditor node={node} />

      </div>
    </div>
  );
};
