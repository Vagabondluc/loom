
export { createExportTargets, ExportTarget, ExportFidelity } from '../../../../services/export/manifest';

import { createExportTargets } from '../../../../services/export/manifest';
import { COMPONENT_REGISTRY } from '../registries';

export const EXPORT_TARGETS = createExportTargets(COMPONENT_REGISTRY);
