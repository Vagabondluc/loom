
import React from 'react';
import { useBuilderStore } from '../store';
import { BuilderNode } from '../../../types';
import { Input, TextArea, FormField } from '../../../ui';
import { LoremControl } from './content/LoremControl';
import { PicsumControl } from './content/PicsumControl';
import { IconControl } from './content/IconControl';
import { ImageControl } from './content/ImageControl';
import { ContentEditorView } from '../../../ui/molecules/properties/ContentEditorView';

interface ContentEditorProps {
  node: BuilderNode;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ node }) => {
  const updateNodeData = useBuilderStore(s => s.updateNodeData);
  const snapshot = useBuilderStore(s => s.snapshot);

  return (
    <ContentEditorView
      node={node}
      onChangeLabel={(v) => updateNodeData(node.id, { label: v }, { skipHistory: true })}
      onSnapshot={() => snapshot()}
    >
      {/* Lorem Generator */}
      {node.type === 'lorem' && (
        <LoremControl node={node} updateNodeData={updateNodeData} />
      )}

      {/* Picsum Image */}
      {node.type === 'picsum' && (
        <PicsumControl node={node} updateNodeData={updateNodeData} snapshot={snapshot} />
      )}

      {/* Generic Image */}
      {(node.type === 'image' || node.type === 'picsum') && (
        <ImageControl node={node} updateNodeData={updateNodeData} snapshot={snapshot} />
      )}

      {/* Icon Config */}
      {node.type === 'icon' && (
        <IconControl node={node} updateNodeData={updateNodeData} snapshot={snapshot} />
      )}

      {/* Tab Config */}
      {node.type === 'tab' && (
        <FormField label="Aria Label">
          <Input
            size="sm"
            value={node.data.props?.ariaLabel || ''}
            onFocus={() => snapshot()}
            onChange={(e) => updateNodeData(node.id, { props: { ...node.data.props, ariaLabel: e.target.value } }, { skipHistory: true })}
          />
        </FormField>
      )}
    </ContentEditorView>
  );
};
