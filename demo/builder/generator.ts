
import { BuilderNode } from '../../types';
import { COMPONENT_REGISTRY } from './registries';
import { generateJSX as serviceGenerateJSX, generateFullCode as serviceGenerateFullCode } from '../../services/export/generator';

export const generateJSX = (nodes: Record<string, BuilderNode>, nodeId: string, indentLevel = 0): string => {
  return serviceGenerateJSX(nodes, nodeId, COMPONENT_REGISTRY, indentLevel);
};

export const generateFullCode = (nodes: Record<string, BuilderNode>, rootId: string) => {
  return serviceGenerateFullCode(nodes, rootId, COMPONENT_REGISTRY);
};
