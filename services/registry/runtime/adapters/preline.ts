import { RuntimeAdapter } from '../types';

declare global {
  interface Window {
    HSStaticMethods: {
      autoInit: (collection?: string) => void;
    };
    HSAccordion: {
      new (el: HTMLElement): any;
      show: (el: HTMLElement) => void;
      hide: (el: HTMLElement) => void;
    };
    HSOverlay: {
      open: (el: HTMLElement) => void;
      close: (el: HTMLElement) => void;
    };
    HSTabs: {
      open: (el: HTMLElement) => void;
    };
  }
}

export const prelineAdapter: RuntimeAdapter = {
  id: 'preline',
  label: 'Preline UI Adapter',
  
  supports: (node) => {
    return node.type.startsWith('preline-');
  },

  init: ({ node, element, log }) => {
    const type = node.type;
    log('adapter:init', { type });

    if (!window.HSStaticMethods) {
      log('adapter:error', { message: 'Preline runtime not found (window.HSStaticMethods missing)' });
      return;
    }

    if (type === 'preline-modal') {
      const openHandler = (e: Event) => log('overlay:open', { target: (e.target as HTMLElement).id });
      const closeHandler = (e: Event) => log('overlay:close', { target: (e.target as HTMLElement).id });

      element.addEventListener('open.hs.overlay', openHandler);
      element.addEventListener('close.hs.overlay', closeHandler);

      setTimeout(() => window.HSStaticMethods.autoInit('overlay'), 10);

      return () => {
        element.removeEventListener('open.hs.overlay', openHandler);
        element.removeEventListener('close.hs.overlay', closeHandler);
        log('adapter:teardown');
      };
    }

    if (type === 'preline-accordion') {
      setTimeout(() => window.HSStaticMethods.autoInit('accordion'), 10);
      
      const clickHandler = (e: Event) => {
        const toggle = (e.target as HTMLElement).closest('.hs-accordion-toggle');
        if (toggle) {
            log('accordion:interaction', { toggle: toggle.id });
        }
      };
      element.addEventListener('click', clickHandler);

      return () => {
        element.removeEventListener('click', clickHandler);
        log('adapter:teardown');
      };
    }

    if (type === 'preline-tabs') {
      setTimeout(() => window.HSStaticMethods.autoInit('tabs'), 10);
      
      const changeHandler = (e: Event) => {
         log('tabs:change', { target: (e.target as HTMLElement).id });
      };
      const tabs = element.querySelectorAll('[role="tab"]');
      tabs.forEach(t => t.addEventListener('click', changeHandler));

      return () => {
        tabs.forEach(t => t.removeEventListener('click', changeHandler));
        log('adapter:teardown');
      };
    }

    setTimeout(() => window.HSStaticMethods.autoInit(), 10);
    return () => log('adapter:teardown');
  },

  executeAction: async ({ element, log }, action, args) => {
    log('action:execute', { action, args });

    if (action === 'openOverlay') {
        const targetId = args.targetId;
        const target = targetId ? document.querySelector(targetId) : element;
        if (target && window.HSOverlay) {
            window.HSOverlay.open(target as HTMLElement);
            log('action:success', { method: 'HSOverlay.open' });
        } else {
            log('action:error', { message: 'Target or HSOverlay not found' });
        }
    }
    
    if (action === 'closeOverlay') {
        const targetId = args.targetId;
        const target = targetId ? document.querySelector(targetId) : element;
        if (target && window.HSOverlay) {
            window.HSOverlay.close(target as HTMLElement);
            log('action:success', { method: 'HSOverlay.close' });
        }
    }
  }
};
