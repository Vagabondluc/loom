
import { BuilderNode } from '../../../types';
import { COMPONENT_REGISTRY } from '../registries';
import { transformNode as serviceTransformNode, transformToExportAST as serviceTransformToExportAST } from '../../../../services/export/transformer';
import { ExportNode } from './types';

// Recursive Transformer
export const transformNode = (nodeId: string, nodes: Record<string, BuilderNode>): ExportNode | null => {
  return serviceTransformNode(nodeId, nodes, COMPONENT_REGISTRY);
};

export const transformToExportAST = (nodes: Record<string, BuilderNode>, rootId: string): ExportNode => {
  return serviceTransformToExportAST(nodes, rootId, COMPONENT_REGISTRY);
};
