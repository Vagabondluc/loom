
import { BuilderNode } from '../../../types';
import { COMPONENT_REGISTRY } from '../registries';

interface IntentNode {
  id: string;
  role: 'action' | 'input' | 'structure' | 'content' | 'feedback' | 'navigation' | 'indicator' | 'unknown';
  semantics: Record<string, any>;
  label?: string;
  behavior?: Record<string, any>;
  children?: IntentNode[];
}

interface IntentExport {
  view: string;
  archetype: string;
  intents: IntentNode[];
}

const inferRoleAndSemantics = (node: BuilderNode, def: any): { role: IntentNode['role']; semantics: any } => {
  const classes = (node.data.className || '').split(' ');
  const semantics: any = {};
  let role: IntentNode['role'] = 'structure';

  // 1. Actions (Buttons & Links)
  if (node.type === 'btn' || classes.includes('btn') || classes.includes('link')) {
    role = 'action';
    semantics.type = 'button';
    
    // Importance
    if (classes.some(c => ['btn-primary', 'btn-accent'].includes(c))) semantics.importance = 'high';
    else if (classes.some(c => ['btn-secondary', 'btn-neutral'].includes(c))) semantics.importance = 'medium';
    else if (classes.some(c => ['btn-ghost', 'btn-link'].includes(c))) semantics.importance = 'low';
    else semantics.importance = 'default';
    
    // Intent
    if (classes.includes('btn-error')) semantics.intent = 'destructive';
    else semantics.intent = 'neutral';
  }

  // 2. Inputs
  else if (['input', 'select', 'textarea', 'checkbox', 'radio', 'toggle', 'file-input', 'range'].includes(node.type)) {
    role = 'input';
    semantics.dataType = node.type;
    // Basic validation inference from props
    if (node.data.props?.required) semantics.validation = 'required';
    if (node.data.props?.type === 'email') semantics.dataType = 'email';
    if (node.data.props?.type === 'password') semantics.dataType = 'secret';
  }

  // 3. Feedback (Alerts)
  else if (classes.some(c => c.startsWith('alert'))) {
    role = 'feedback';
    semantics.type = 'alert';
    if (classes.includes('alert-info')) semantics.severity = 'info';
    else if (classes.includes('alert-success')) semantics.severity = 'success';
    else if (classes.includes('alert-warning')) semantics.severity = 'warning';
    else if (classes.includes('alert-error')) semantics.severity = 'error';
    else semantics.severity = 'neutral';
  }

  // 4. Indicators (Badges)
  else if (classes.includes('badge')) {
      role = 'indicator';
      semantics.type = 'status';
  }

  // 5. Structure & Grouping
  else if (classes.includes('card')) semantics.container = 'card';
  else if (classes.includes('hero')) semantics.container = 'featured';
  else if (classes.includes('drawer')) semantics.container = 'overlay';
  else if (classes.includes('modal')) semantics.container = 'dialog';
  else if (classes.includes('collapse') || classes.includes('accordion') || classes.some(c => c.startsWith('hs-accordion'))) semantics.container = 'disclosure';

  // 6. Navigation
  else if (classes.includes('steps')) { role = 'navigation'; semantics.flow = 'sequence'; }
  else if (classes.includes('tabs') || classes.some(c => c.startsWith('hs-tab'))) { role = 'navigation'; semantics.flow = 'parallel-group'; }
  else if (classes.includes('breadcrumbs')) { role = 'navigation'; semantics.flow = 'hierarchy'; }
  else if (classes.includes('navbar') || classes.includes('menu')) { role = 'navigation'; semantics.flow = 'menu'; }
  
  // 7. Content
  else if (['heading', 'paragraph', 'markdown', 'image', 'icon', 'lorem', 'picsum'].includes(node.type)) {
      role = 'content';
      if (node.type === 'heading') semantics.level = def?.defaultTag;
      
      // Fake Data Policy
      if (node.type === 'lorem' || node.type === 'picsum') {
          semantics.mock = true;
      }
  }

  return { role, semantics };
};

const transformNodeRecursive = (nodeId: string, nodes: Record<string, BuilderNode>): IntentNode | null => {
    const node = nodes[nodeId];
    if (!node) return null;
    
    const def = COMPONENT_REGISTRY[node.type];
    const { role, semantics } = inferRoleAndSemantics(node, def);

    const intentNode: IntentNode = {
        id: node.id,
        role,
        semantics,
    };

    if (node.data.label) {
        intentNode.label = node.data.label;
    }

    // Extract behavior from events (Logic Logic)
    if (node.events?.onClick && node.events.onClick.length > 0) {
        intentNode.behavior = {
            trigger: 'click',
            actions: node.events.onClick.map(a => ({ type: a.type, ...a.payload }))
        };
    }

    // Data Binding (Logic Logic)
    if (node.data.props?.['data-key']) {
        intentNode.semantics.dataBinding = node.data.props['data-key'];
    }

    if (node.children && node.children.length > 0) {
        const children = node.children
            .map(cid => transformNodeRecursive(cid, nodes))
            .filter((n): n is IntentNode => n !== null);
        
        if (children.length > 0) {
            intentNode.children = children;
        }
    }

    return intentNode;
};

export const generateIntentJson = (nodes: Record<string, BuilderNode>, rootId: string): string => {
    const rootIntent = transformNodeRecursive(rootId, nodes);
    
    const exportData: IntentExport = {
        view: "Canvas Export",
        archetype: "detecting...", // Future: Infer from Page Settings or Wizard meta
        intents: rootIntent ? [rootIntent] : []
    };

    return JSON.stringify(exportData, null, 2);
};
