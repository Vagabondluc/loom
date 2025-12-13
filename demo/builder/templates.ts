
import { Template } from '../../types';

export const TEMPLATE_REGISTRY: Template[] = [
  {
    id: 'hero-basic',
    label: 'Hero Section',
    category: 'Marketing',
    rootId: 'root',
    nodes: {
      'root': {
        id: 'root',
        type: 'container',
        data: { className: 'hero min-h-[400px] bg-base-200 rounded-box' },
        layout: { mode: 'flex', justify: 'center', align: 'center' },
        children: ['content'],
        parentId: null
      },
      'content': {
        id: 'content',
        type: 'container',
        data: { className: 'hero-content text-center' },
        layout: { mode: 'flex', direction: 'col', gap: 4, align: 'center' },
        children: ['title', 'desc', 'btn'],
        parentId: 'root'
      },
      'title': {
        id: 'title',
        type: 'heading',
        data: { label: 'Hello there', className: 'text-5xl font-bold' },
        children: [],
        parentId: 'content'
      },
      'desc': {
        id: 'desc',
        type: 'paragraph',
        data: { label: 'Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi.', className: 'py-6 max-w-md' },
        children: [],
        parentId: 'content'
      },
      'btn': {
        id: 'btn',
        type: 'btn',
        data: { label: 'Get Started', className: 'btn btn-primary' },
        children: [],
        parentId: 'content'
      }
    }
  },
  {
    id: 'feature-grid',
    label: 'Feature Grid (3-Col)',
    category: 'Layout',
    rootId: 'root',
    nodes: {
      'root': {
        id: 'root',
        type: 'container',
        data: { className: 'p-8 bg-base-100' },
        layout: { mode: 'grid', cols: 3, gap: 6 },
        children: ['card1', 'card2', 'card3'],
        parentId: null
      },
      'card1': { id: 'card1', type: 'card', data: { className: 'card bg-base-200 shadow-sm p-4' }, layout: { mode: 'flex', direction: 'col', gap: 2 }, children: ['t1', 'p1'], parentId: 'root' },
      't1': { id: 't1', type: 'heading', data: { label: 'Feature 1', className: 'text-xl font-bold' }, children: [], parentId: 'card1' },
      'p1': { id: 'p1', type: 'paragraph', data: { label: 'Description for feature one.' }, children: [], parentId: 'card1' },
      
      'card2': { id: 'card2', type: 'card', data: { className: 'card bg-base-200 shadow-sm p-4' }, layout: { mode: 'flex', direction: 'col', gap: 2 }, children: ['t2', 'p2'], parentId: 'root' },
      't2': { id: 't2', type: 'heading', data: { label: 'Feature 2', className: 'text-xl font-bold' }, children: [], parentId: 'card2' },
      'p2': { id: 'p2', type: 'paragraph', data: { label: 'Description for feature two.' }, children: [], parentId: 'card2' },

      'card3': { id: 'card3', type: 'card', data: { className: 'card bg-base-200 shadow-sm p-4' }, layout: { mode: 'flex', direction: 'col', gap: 2 }, children: ['t3', 'p3'], parentId: 'root' },
      't3': { id: 't3', type: 'heading', data: { label: 'Feature 3', className: 'text-xl font-bold' }, children: [], parentId: 'card3' },
      'p3': { id: 'p3', type: 'paragraph', data: { label: 'Description for feature three.' }, children: [], parentId: 'card3' },
    }
  },
  {
    id: 'tabs-basic',
    label: 'Tabs (3 Sections)',
    category: 'Layout',
    rootId: 'root',
    nodes: {
        'root': {
            id: 'root',
            type: 'tabs',
            data: { className: 'tabs tabs-lifted w-full' },
            layout: { mode: 'static' },
            children: ['tab1', 'content1', 'tab2', 'content2', 'tab3', 'content3'],
            parentId: null
        },
        'tab1': { id: 'tab1', type: 'tab', data: { className: 'tab', props: { ariaLabel: 'Tab 1', checked: true } }, children: [], parentId: 'root' },
        'content1': { id: 'content1', type: 'tab-content', data: { className: 'tab-content bg-base-100 border-base-300 rounded-box p-6' }, layout: { mode: 'flex', direction: 'col', gap: 4 }, children: ['p1'], parentId: 'root' },
        'p1': { id: 'p1', type: 'paragraph', data: { label: 'Content for Tab 1' }, children: [], parentId: 'content1' },

        'tab2': { id: 'tab2', type: 'tab', data: { className: 'tab', props: { ariaLabel: 'Tab 2' } }, children: [], parentId: 'root' },
        'content2': { id: 'content2', type: 'tab-content', data: { className: 'tab-content bg-base-100 border-base-300 rounded-box p-6' }, layout: { mode: 'flex', direction: 'col', gap: 4 }, children: ['p2'], parentId: 'root' },
        'p2': { id: 'p2', type: 'paragraph', data: { label: 'Content for Tab 2' }, children: [], parentId: 'content2' },

        'tab3': { id: 'tab3', type: 'tab', data: { className: 'tab', props: { ariaLabel: 'Tab 3' } }, children: [], parentId: 'root' },
        'content3': { id: 'content3', type: 'tab-content', data: { className: 'tab-content bg-base-100 border-base-300 rounded-box p-6' }, layout: { mode: 'flex', direction: 'col', gap: 4 }, children: ['p3'], parentId: 'root' },
        'p3': { id: 'p3', type: 'paragraph', data: { label: 'Content for Tab 3' }, children: [], parentId: 'content3' },
    }
  },
  {
    id: 'accordion-basic',
    label: 'Accordion (Basic)',
    category: 'Layout',
    rootId: 'root',
    nodes: {
        'root': {
            id: 'root',
            type: 'accordion',
            data: { className: 'join join-vertical w-full' },
            layout: { mode: 'static' },
            children: ['item1', 'item2', 'item3'],
            parentId: null
        },
        'item1': { id: 'item1', type: 'accordion-item', data: { className: 'collapse collapse-arrow join-item border border-base-300' }, layout: { mode: 'static' }, children: ['radio1', 'title1', 'content1'], parentId: 'root' },
        'radio1': { id: 'radio1', type: 'tab', data: { className: '', props: { type: 'radio', name: 'my-accordion', checked: true } }, children: [], parentId: 'item1' },
        'title1': { id: 'title1', type: 'container', data: { className: 'collapse-title text-xl font-medium' }, layout: { mode: 'static' }, children: ['txt1'], parentId: 'item1' },
        'txt1': { id: 'txt1', type: 'paragraph', data: { label: 'Click to open this 1' }, children: [], parentId: 'title1' },
        'content1': { id: 'content1', type: 'container', data: { className: 'collapse-content' }, layout: { mode: 'static' }, children: ['p1'], parentId: 'item1' },
        'p1': { id: 'p1', type: 'paragraph', data: { label: 'hello world' }, children: [], parentId: 'content1' },

        'item2': { id: 'item2', type: 'accordion-item', data: { className: 'collapse collapse-arrow join-item border border-base-300' }, layout: { mode: 'static' }, children: ['radio2', 'title2', 'content2'], parentId: 'root' },
        'radio2': { id: 'radio2', type: 'tab', data: { className: '', props: { type: 'radio', name: 'my-accordion' } }, children: [], parentId: 'item2' },
        'title2': { id: 'title2', type: 'container', data: { className: 'collapse-title text-xl font-medium' }, layout: { mode: 'static' }, children: ['txt2'], parentId: 'item2' },
        'txt2': { id: 'txt2', type: 'paragraph', data: { label: 'Click to open this 2' }, children: [], parentId: 'title2' },
        'content2': { id: 'content2', type: 'container', data: { className: 'collapse-content' }, layout: { mode: 'static' }, children: ['p2'], parentId: 'item2' },
        'p2': { id: 'p2', type: 'paragraph', data: { label: 'hello world 2' }, children: [], parentId: 'content2' },

        'item3': { id: 'item3', type: 'accordion-item', data: { className: 'collapse collapse-arrow join-item border border-base-300' }, layout: { mode: 'static' }, children: ['radio3', 'title3', 'content3'], parentId: 'root' },
        'radio3': { id: 'radio3', type: 'tab', data: { className: '', props: { type: 'radio', name: 'my-accordion' } }, children: [], parentId: 'item3' },
        'title3': { id: 'title3', type: 'container', data: { className: 'collapse-title text-xl font-medium' }, layout: { mode: 'static' }, children: ['txt3'], parentId: 'item3' },
        'txt3': { id: 'txt3', type: 'paragraph', data: { label: 'Click to open this 3' }, children: [], parentId: 'title3' },
        'content3': { id: 'content3', type: 'container', data: { className: 'collapse-content' }, layout: { mode: 'static' }, children: ['p3'], parentId: 'item3' },
        'p3': { id: 'p3', type: 'paragraph', data: { label: 'hello world 3' }, children: [], parentId: 'content3' },
    }
  },
  {
    id: 'pricing-card',
    label: 'Pricing Card',
    category: 'Marketing',
    rootId: 'root',
    nodes: {
      'root': {
        id: 'root',
        type: 'card',
        data: { className: 'card w-full bg-base-100 shadow-xl border border-primary' },
        layout: { mode: 'flex', direction: 'col' },
        children: ['body'],
        parentId: null
      },
      'body': {
        id: 'body',
        type: 'card-body',
        data: { className: 'card-body items-center text-center' },
        layout: { mode: 'flex', direction: 'col', gap: 4, align: 'center' },
        children: ['title', 'price', 'features', 'action'],
        parentId: 'root'
      },
      'title': { id: 'title', type: 'heading', data: { label: 'Pro Plan', className: 'card-title' }, children: [], parentId: 'body' },
      'price': { id: 'price', type: 'heading', data: { label: '$29/mo', className: 'text-4xl font-black' }, children: [], parentId: 'body' },
      'features': {
        id: 'features',
        type: 'container',
        data: { className: 'space-y-2 py-4' },
        layout: { mode: 'flex', direction: 'col', gap: 2 },
        children: ['f1', 'f2', 'f3'],
        parentId: 'body'
      },
      'f1': { id: 'f1', type: 'paragraph', data: { label: '✓ Unlimited Access' }, children: [], parentId: 'features' },
      'f2': { id: 'f2', type: 'paragraph', data: { label: '✓ Priority Support' }, children: [], parentId: 'features' },
      'f3': { id: 'f3', type: 'paragraph', data: { label: '✓ Cloud Storage' }, children: [], parentId: 'features' },
      'action': {
        id: 'action',
        type: 'btn',
        data: { label: 'Choose Plan', className: 'btn btn-primary btn-wide' },
        children: [],
        parentId: 'body'
      }
    }
  }
];
