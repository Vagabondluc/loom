
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
  scope?: any; // For storing instance references
}

export interface RuntimeAdapter {
  id: string;
  label: string;
  /**
   * Check if this adapter can handle the given node.
   */
  supports: (node: BuilderNode) => boolean;
  
  /**
   * Initialize the runtime behavior on the element.
   * Returns a cleanup function (teardown).
   */
  init: (context: AdapterContext) => (() => void) | void;
  
  /**
   * Execute a specific logic action on the active instance.
   */
  executeAction?: (context: AdapterContext, action: string, args: any) => Promise<void>;
}
