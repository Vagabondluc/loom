
export interface ExportNode {
  type: 'element' | 'text' | 'comment' | 'raw';
  tagName?: string;
  attributes?: Record<string, string>;
  children?: ExportNode[];
  content?: string; // For text, comment, or raw nodes
  isSelfClosing?: boolean;
}

export interface ExportResult {
  root: ExportNode;
  metadata: {
    generatedAt: string;
    generator: string;
  };
}
