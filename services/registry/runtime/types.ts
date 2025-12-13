import { BuilderNode } from '../../../types';

export interface RuntimeEvent {
  source: string;
  event: string;
  payload?: any;
  timestamp: number;
}

export interface AdapterContext {
  node: BuilderNode;
  element: HTMLElement;
  log: (event: string, payload?: any) => void;
  scope?: any;
}

export interface RuntimeAdapter {
  id: string;
  /** Optional human-friendly label used for tooling */
  label?: string;
  /** Check if this adapter can handle the given node. */
  supports(node: BuilderNode): boolean;
  /** Initialize the runtime behavior on the element. Returns a cleanup function (teardown). */
  init(ctx: AdapterContext): (() => void) | void;
  /** Optional programmatic action executor for adapters (e.g., open/close modal) */
  executeAction?: (context: AdapterContext, action: string, args: any) => Promise<void>;
}
