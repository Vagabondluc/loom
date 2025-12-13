
import { BuilderNode, Template } from '../types';

interface ProceduralOptions {
  archetype: string;
  style: string;
  sections: string[];
}

const generateId = (prefix = 'node') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// --- Section Definitions ---

const getHeader = (style: string): BuilderNode => ({
  id: generateId('header'),
  type: 'toolbar',
  data: { className: `navbar ${style === 'Corporate' ? 'bg-neutral text-neutral-content' : 'bg-base-100 border-b border-base-200'}` },
  layout: { mode: 'flex', direction: 'row', align: 'center', justify: 'between' },
  children: [],
  parentId: null // Reassigned later
});

const getHero = (style: string): BuilderNode => ({
  id: generateId('hero'),
  type: 'container',
  data: { 
    className: `hero min-h-[400px] ${style === 'Playful' ? 'bg-secondary/10 rounded-[3rem]' : 'bg-base-200 rounded-box'} my-4` 
  },
  layout: { mode: 'flex', justify: 'center', align: 'center' },
  children: [], // Populated dynamically
  parentId: null
});

const getFeatures = (style: string): BuilderNode => ({
  id: generateId('features'),
  type: 'container',
  data: { className: "py-12 px-4" },
  layout: { mode: 'grid', cols: 3, gap: 8 },
  children: [],
  parentId: null
});

const getFooter = (style: string): BuilderNode => ({
  id: generateId('footer'),
  type: 'container',
  data: { className: `footer p-10 ${style === 'Corporate' ? 'bg-neutral text-neutral-content' : 'bg-base-200'} mt-12` },
  layout: { mode: 'grid', cols: 3, gap: 4 },
  children: [],
  parentId: null
});

// --- Generator Function ---

export const generateProceduralTemplate = (options: ProceduralOptions): Template => {
  const rootId = 'root';
  const nodes: Record<string, BuilderNode> = {};

  // 1. Create Root
  nodes[rootId] = {
    id: rootId,
    type: 'container',
    data: { 
      className: `min-h-screen w-full ${options.style === 'Corporate' ? 'font-sans' : ''} ${options.style === 'Playful' ? 'font-rounded' : ''}` 
    },
    layout: { mode: 'flex', direction: 'col', gap: 0 },
    children: [],
    parentId: null
  };

  const addNode = (node: BuilderNode, parentId: string) => {
    nodes[node.id] = { ...node, parentId };
    nodes[parentId].children.push(node.id);
    return node.id;
  };

  // 2. Build Sections
  options.sections.forEach(section => {
    if (section === 'Header') {
        const headerId = addNode(getHeader(options.style), rootId);
        // Add Logo Text
        const logoId = generateId('logo');
        nodes[logoId] = { id: logoId, type: 'heading', data: { label: 'Brand', className: 'text-xl font-bold' }, parentId: headerId, children: [] };
        nodes[headerId].children.push(logoId);
    } 
    else if (section === 'Hero') {
        const heroId = addNode(getHero(options.style), rootId);
        
        // Hero Content Wrapper
        const contentId = generateId('hero-content');
        nodes[contentId] = { 
            id: contentId, 
            type: 'container', 
            data: { className: 'hero-content text-center' }, 
            layout: { mode: 'flex', direction: 'col', gap: 4 }, 
            parentId: heroId, 
            children: [] 
        };
        nodes[heroId].children.push(contentId);

        // Hero Text
        const h1Id = generateId('h1');
        nodes[h1Id] = { id: h1Id, type: 'heading', data: { label: 'Welcome to Loom', className: 'text-5xl font-bold' }, parentId: contentId, children: [] };
        nodes[contentId].children.push(h1Id);

        const pId = generateId('p');
        nodes[pId] = { id: pId, type: 'paragraph', data: { label: 'Rapidly build layouts with the procedural engine.', className: 'py-6' }, parentId: contentId, children: [] };
        nodes[contentId].children.push(pId);

        const btnId = generateId('btn');
        nodes[btnId] = { id: btnId, type: 'btn', data: { label: 'Get Started', className: options.style === 'Playful' ? 'btn btn-secondary rounded-full' : 'btn btn-primary' }, parentId: contentId, children: [] };
        nodes[contentId].children.push(btnId);
    }
    else if (section === 'Features') {
        const gridId = addNode(getFeatures(options.style), rootId);
        
        // Add 3 Feature Cards
        [1, 2, 3].forEach(i => {
            const cardId = generateId('card');
            nodes[cardId] = { 
                id: cardId, 
                type: 'card', 
                data: { className: 'card bg-base-100 shadow-sm border border-base-200' }, 
                layout: { mode: 'flex', direction: 'col' }, 
                parentId: gridId, 
                children: [] 
            };
            nodes[gridId].children.push(cardId);

            const bodyId = generateId('card-body');
            nodes[bodyId] = { id: bodyId, type: 'card-body', data: { className: 'card-body' }, parentId: cardId, children: [] };
            nodes[cardId].children.push(bodyId);

            const titleId = generateId('ft-title');
            nodes[titleId] = { id: titleId, type: 'heading', data: { label: `Feature ${i}`, className: 'card-title' }, parentId: bodyId, children: [] };
            nodes[bodyId].children.push(titleId);

            const descId = generateId('ft-desc');
            nodes[descId] = { id: descId, type: 'paragraph', data: { label: 'Description of this feature goes here.' }, parentId: bodyId, children: [] };
            nodes[bodyId].children.push(descId);
        });
    }
    else if (section === 'Footer') {
        const footerId = addNode(getFooter(options.style), rootId);
        // Add footer cols
        ['Services', 'Company', 'Legal'].forEach(title => {
            const colId = generateId('foot-col');
            nodes[colId] = { id: colId, type: 'container', data: { className: 'flex flex-col gap-2' }, parentId: footerId, children: [] };
            nodes[footerId].children.push(colId);

            const headId = generateId('foot-head');
            nodes[headId] = { id: headId, type: 'heading', data: { label: title, className: 'footer-title' }, parentId: colId, children: [] };
            nodes[colId].children.push(headId);

            ['Link 1', 'Link 2', 'Link 3'].forEach(link => {
                const linkId = generateId('link');
                nodes[linkId] = { id: linkId, type: 'paragraph', data: { label: link, className: 'link link-hover' }, parentId: colId, children: [] };
                nodes[colId].children.push(linkId);
            });
        });
    }
  });

  return {
    id: `proc-${Date.now()}`,
    label: `${options.archetype} (${options.style})`,
    category: 'Procedural',
    rootId,
    nodes
  };
};
