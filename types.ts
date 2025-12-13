
export interface ThemeConfig {
  fontFamily: string;
  fontType: 'sans' | 'serif' | 'mono';
  radius: number; // rem value equivalent
  borderWidth: number; // px value
  animationDuration: number; // seconds (e.g. 0.25)
  focusScale: number; // scale factor (e.g. 0.95)
}

export interface ThemeState {
  theme: string;
  config: ThemeConfig;
  setTheme: (theme: string) => void;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  resetConfig: () => void;
}

export type DemoView = 'material-library' | 'behavior-engine' | 'narrative-weaver' | 'color-mill' | 'design-canvas' | 'inspector' | 'runtime-workbench';

export interface LogicNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  label: string;
  description: string;
  status: 'idle' | 'running' | 'success' | 'error';
  // Runtime configuration
  config?: {
    actionType?: 'setVariable' | 'wait' | 'log';
    targetVar?: string; // Variable path e.g. "user.isLoggedIn"
    value?: any;        // Value to set
    duration?: number;  // Duration for wait (ms)
  };
}

export interface LogicFlow {
  id: string;
  name: string;
  nodes: LogicNode[];
}

export interface StoryNode {
  id: string;
  title: string;
  content: string;
  image?: string;
  choices: { label: string; nextNodeId: string }[];
}

// Visual Builder Types
export type LayoutMode = 'static' | 'flex' | 'grid';
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface PageSettings {
  heightMode: 'grow' | 'fit';
  maxWidth: 'full' | '7xl' | '5xl' | '3xl';
}

export interface LayoutConfig {
  mode: LayoutMode;
  // Flex specific
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  wrap?: 'wrap' | 'nowrap';
  gap?: number; // Tailwind gap scale (0, 1, 2, 4, 8, etc.)
  // Grid specific
  cols?: number; // 1-12
  rows?: number;
}

// Logic Integration
export type TriggerType = 'onClick';
export type ActionType = 'navigate' | 'toast' | 'alert' | 'triggerFlow';

export interface BuilderAction {
  type: ActionType;
  payload: Record<string, any>;
}

export interface BuilderNode {
  id: string;
  type: string; // Refers to ComponentDefinition.id
  data: {
    label?: string; // For text/content
    className?: string;
    style?: Record<string, string | number>;
    tagName?: string; // Override default tag
    props?: Record<string, any>;
    // Icon specific properties
    iconName?: string;
    size?: number;
    strokeWidth?: number;
    // Zod Schema properties
    schemaId?: string; // For form containers
    field?: string;    // For input elements binding
    // Placeholder specific properties
    picsumConfig?: {
      width: number;
      height: number;
      seed: string;
      grayscale: boolean;
      blur: number;
    };
    loremConfig?: {
      mode: 'short' | 'medium' | 'long' | 'paragraph';
    };
  };
  layout?: LayoutConfig;
  responsive?: {
    tablet?: Partial<LayoutConfig>;
    desktop?: Partial<LayoutConfig>;
  };
  events?: Record<string, BuilderAction[]>; // Key is TriggerType (e.g. 'onClick')
  logic?: {
    visibleWhen?: string; // Expression string e.g. "user.isLoggedIn"
  };
  children: string[]; // IDs of child nodes
  parentId?: string | null;
}

export type NodeKind = 'static' | 'container' | 'interactive' | 'applet';

export interface ComponentDefinition {
  id: string;
  label: string;
  category: 'layout' | 'daisyui' | 'html' | 'typography' | 'media' | 'patterns' | 'preline' | 'data' | 'forms';
  kind?: NodeKind;
  defaultTag: string;
  defaultClass: string;
  defaultData?: Record<string, any>;
  defaultLayout?: LayoutConfig;
  allowChildren?: boolean;
  icon?: any;
  meta?: {
    composed?: boolean; // If true, treats children as internal to the component (for selection)
    minDimensions?: { width: number; height: number }; // Interaction envelope minimums
    runtimeOnly?: boolean; // If true, interactivity is only available in Preview Mode
    runtimeAdapterId?: string; // ID of the RuntimeAdapter to activate in Preview
  };
}

export interface Template {
  id: string;
  label: string;
  category: string;
  rootId: string;
  nodes: Record<string, BuilderNode>;
}
