export interface Envelope {
  top: number;
  left: number;
  width: number;
  height: number;
  type: 'layout' | 'interaction';
}

const MIN_INTERACTION_SIZE = 24;

export const getEnvelopeRect = (nodeId: string, nodeType: string, componentRegistry: Record<string, any>): Envelope | null => {
  const el = document.getElementById(nodeId);
  const container = document.getElementById('builder-canvas-stage');
  
  if (!el || !container) return null;

  const def = componentRegistry[nodeType];
  const elRect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  // Base coordinates relative to the stage container
  // Note: We use the visual viewport coordinates difference
  let top = elRect.top - containerRect.top;
  let left = elRect.left - containerRect.left;
  let width = elRect.width;
  let height = elRect.height;

  // Interaction Envelope Logic
  // Expand small elements to meet minimum interaction sizes
  const minW = def?.meta?.minDimensions?.width ?? MIN_INTERACTION_SIZE;
  const minH = def?.meta?.minDimensions?.height ?? MIN_INTERACTION_SIZE;

  if (width < minW) {
      const diff = minW - width;
      left -= diff / 2;
      width = minW;
  }
  
  if (height < minH) {
      const diff = minH - height;
      top -= diff / 2;
      height = minH;
  }

  return { 
      top, 
      left, 
      width, 
      height,
      type: (width > elRect.width || height > elRect.height) ? 'interaction' : 'layout'
  };
};

export default getEnvelopeRect;
