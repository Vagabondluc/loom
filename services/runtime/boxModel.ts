export interface BoxModel {
  margin: { top: number; right: number; bottom: number; left: number };
  padding: { top: number; right: number; bottom: number; left: number };
  rect: { top: number; left: number; width: number; height: number };
}

export const getBoxModel = (nodeId: string): BoxModel | null => {
  const el = document.getElementById(nodeId);
  const container = document.getElementById('builder-canvas-stage');
  
  if (!el || !container) return null;

  const style = window.getComputedStyle(el);
  const elRect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const parse = (val: string) => parseFloat(val) || 0;

  const margin = {
    top: parse(style.marginTop),
    right: parse(style.marginRight),
    bottom: parse(style.marginBottom),
    left: parse(style.marginLeft),
  };

  const padding = {
    top: parse(style.paddingTop),
    right: parse(style.paddingRight),
    bottom: parse(style.paddingBottom),
    left: parse(style.paddingLeft),
  };

  // Calculate position relative to the container's content box
  // We include scrollTop to ensure the overlay moves with the content if the container scrolls
  const top = elRect.top - containerRect.top + container.scrollTop;
  const left = elRect.left - containerRect.left + container.scrollLeft;

  return {
    rect: { top, left, width: elRect.width, height: elRect.height },
    margin,
    padding
  };
};

export default getBoxModel;
