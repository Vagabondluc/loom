import { runtimeAdapterRegistry } from './RuntimeAdapterRegistry';

export const getAdapter = (node: any) => runtimeAdapterRegistry.getAdapterForNode(node);
export { runtimeAdapterRegistry };
