import { BuilderNode } from '../../types';
import { ExportTarget } from './manifest';

export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
}

export const validateExport = (nodes: Record<string, BuilderNode>, target: ExportTarget, componentRegistry: Record<string, any>): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const nodeList = Object.values(nodes);

  // 1. Check for Mock Data (UX-PRE-EXP-03)
  const hasMockData = nodeList.some(n => n.type === 'lorem' || n.type === 'picsum');
  if (hasMockData) {
    issues.push({
      id: 'mock-data',
      type: 'info',
      message: 'Contains mock data (Lorem/Picsum) marked with data-loom-mock="true".'
    });
  }

  // 2. Check for Applets / Runtime Adapters
  const applets = nodeList.filter(n => {
      const def = componentRegistry[n.type];
      return def?.kind === 'applet';
  });

  if (applets.length > 0) {
      if (target.id === 'html') {
          issues.push({
              id: 'applet-html',
              type: 'warning',
              message: `Contains ${applets.length} runtime applet(s) (e.g. Preline). Static shells will render, but interactivity requires the included scripts.`
          });
      } else if (target.id === 'jsx') {
          issues.push({
              id: 'applet-react',
              type: 'info',
              message: `Contains ${applets.length} runtime applet(s). You must install corresponding libraries and handle initialization.`
          });
      } else if (target.id === 'intent') {
           issues.push({
              id: 'applet-intent',
              type: 'info',
              message: `Applets are exported as abstract intents. Specific implementation details are discarded.`
          });
      }
  }

  // 3. Check for Logic / Events (UX-PRE-EXP-01)
  const hasLogic = nodeList.some(n => 
      (n.events?.['onClick'] && n.events['onClick'].length > 0) || 
      n.logic?.visibleWhen
  );

  if (hasLogic) {
      if (target.id === 'html') {
          issues.push({
              id: 'logic-html',
              type: 'error',
              message: 'Loom Logic (Events & Visibility) cannot be exported to Static HTML. Interactions defined in the editor will be lost.'
          });
      } else if (target.id === 'jsx') {
          issues.push({
              id: 'logic-react',
              type: 'warning',
              message: 'Editor Logic relies on the Loom Runtime Store. You will need to reimplement state management in your React app.'
          });
      }
  }

  return issues;
};

export default validateExport;
