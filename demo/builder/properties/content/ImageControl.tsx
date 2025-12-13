
import React from 'react';
import { BuilderNode } from '../../../../types';
import { Input, FormField } from '../../../../ui';
import { ImageControlView } from '../../../../ui/molecules/properties/content/ImageControlView';

interface ImageControlProps {
  node: BuilderNode;
  updateNodeData: (id: string, updates: Partial<BuilderNode['data']>, options?: { skipHistory?: boolean }) => void;
  snapshot: () => void;
}

export const ImageControl: React.FC<ImageControlProps> = ({ node, updateNodeData, snapshot }) => {
  return (
    <ImageControlView
      src={node.data.props?.src || ''}
      alt={node.data.props?.alt || ''}
      onUpdateSrc={(s) => updateNodeData(node.id, { props: { ...node.data.props, src: s } }, { skipHistory: true })}
      onUpdateAlt={(a) => updateNodeData(node.id, { props: { ...node.data.props, alt: a } }, { skipHistory: true })}
    />
  );
};
