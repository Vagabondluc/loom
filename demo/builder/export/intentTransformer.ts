
import { BuilderNode } from '../../../types';
import { COMPONENT_REGISTRY } from '../registries';
import { generateIntentJson as serviceGenerateIntentJson } from '../../../../services/export/intentTransformer';

export const generateIntentJson = (nodes: Record<string, BuilderNode>, rootId: string): string => {
    return serviceGenerateIntentJson(nodes, rootId, COMPONENT_REGISTRY);
};
