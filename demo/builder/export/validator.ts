
import { BuilderNode } from '../../../types';
import { ExportTarget } from './manifest';
import { COMPONENT_REGISTRY } from '../registries';
import { validateExport as serviceValidateExport, ValidationIssue } from '../../../../services/export/validator';

export const validateExport = (nodes: Record<string, BuilderNode>, target: ExportTarget): ValidationIssue[] => {
  return serviceValidateExport(nodes, target, COMPONENT_REGISTRY);
};
