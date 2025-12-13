import { BuilderNode, LayoutConfig, Breakpoint } from '../../types';

export const getLayoutClasses = (layout?: Partial<LayoutConfig>, prefix = '') => {
  if (!layout) return '';
  if (layout.mode === 'static') return '';

  const classes: string[] = [];
  
  if (layout.mode === 'flex') {
    classes.push(`${prefix}flex`);
    if (layout.direction === 'row') classes.push(`${prefix}flex-row`);
    if (layout.direction === 'col') classes.push(`${prefix}flex-col`);
    if (layout.direction === 'row-reverse') classes.push(`${prefix}flex-row-reverse`);
    if (layout.direction === 'col-reverse') classes.push(`${prefix}flex-col-reverse`);
    if (layout.wrap === 'wrap') classes.push(`${prefix}flex-wrap`);
    if (layout.wrap === 'nowrap') classes.push(`${prefix}flex-nowrap`);
    if (layout.justify) classes.push(`${prefix}justify-${layout.justify}`);
    if (layout.align) classes.push(`${prefix}items-${layout.align}`);
  }

  if (layout.mode === 'grid') {
    classes.push(`${prefix}grid`);
    if (layout.cols) classes.push(`${prefix}grid-cols-${layout.cols}`);
    if (layout.rows) classes.push(`${prefix}grid-rows-${layout.rows}`);
  }

  if (layout.gap !== undefined) classes.push(`${prefix}gap-${layout.gap}`);

  return classes.join(' ');
};

export const resolveEffectiveLayout = (node: BuilderNode, bp: Breakpoint): Partial<LayoutConfig> => {
    let effective = { ...node.layout };

    if (bp === 'tablet' || bp === 'desktop') {
        if (node.responsive?.tablet) {
            effective = { ...effective, ...node.responsive.tablet };
        }
    }

    if (bp === 'desktop') {
        if (node.responsive?.desktop) {
            effective = { ...effective, ...node.responsive.desktop };
        }
    }

    return effective;
};

export const generateResponsiveClasses = (node: BuilderNode) => {
    const base = getLayoutClasses(node.layout);
    
    const tablet = node.responsive?.tablet 
        ? getLayoutClasses(node.responsive.tablet, 'md:') 
        : '';
    
    const desktop = node.responsive?.desktop 
        ? getLayoutClasses(node.responsive.desktop, 'lg:') 
        : '';

    return [base, tablet, desktop].filter(Boolean).join(' ');
};
import { BuilderNode, LayoutConfig, Breakpoint } from '../../types';

export const getLayoutClasses = (layout?: Partial<LayoutConfig>, prefix = '') => {
  if (!layout) return '';
  if (layout.mode === 'static') return '';

  const classes = [] as string[];
  
  if (layout.mode === 'flex') {
    classes.push(`${prefix}flex`);
    if (layout.direction === 'row') classes.push(`${prefix}flex-row`);
    if (layout.direction === 'col') classes.push(`${prefix}flex-col`);
    if (layout.direction === 'row-reverse') classes.push(`${prefix}flex-row-reverse`);
    if (layout.direction === 'col-reverse') classes.push(`${prefix}flex-col-reverse`);
    if (layout.wrap === 'wrap') classes.push(`${prefix}flex-wrap`);
    if (layout.wrap === 'nowrap') classes.push(`${prefix}flex-nowrap`);
    if (layout.justify) classes.push(`${prefix}justify-${layout.justify}`);
    if (layout.align) classes.push(`${prefix}items-${layout.align}`);
  }

  if (layout.mode === 'grid') {
    classes.push(`${prefix}grid`);
    if (layout.cols) classes.push(`${prefix}grid-cols-${layout.cols}`);
    if (layout.rows) classes.push(`${prefix}grid-rows-${layout.rows}`);
  }

  if (layout.gap !== undefined) classes.push(`${prefix}gap-${layout.gap}`);

  return classes.join(' ');
};

export const resolveEffectiveLayout = (node: BuilderNode, bp: Breakpoint): Partial<LayoutConfig> => {
    let effective = { ...node.layout };

    if (bp === 'tablet' || bp === 'desktop') {
        if (node.responsive?.tablet) {
            effective = { ...effective, ...node.responsive.tablet };
        }
    }

    if (bp === 'desktop') {
        if (node.responsive?.desktop) {
            effective = { ...effective, ...node.responsive.desktop };
        }
    }

    return effective;
};

export const generateResponsiveClasses = (node: BuilderNode) => {
    const base = getLayoutClasses(node.layout);
    
    const tablet = node.responsive?.tablet 
        ? getLayoutClasses(node.responsive.tablet, 'md:') 
        : '';
    
    const desktop = node.responsive?.desktop 
        ? getLayoutClasses(node.responsive.desktop, 'lg:') 
        : '';

    return [base, tablet, desktop].filter(Boolean).join(' ');
};
