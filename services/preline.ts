// Lightweight service to centralize Preline/DOM init for preview/inert modes
export function autoInitPreview(collection?: string) {
  if (typeof window === 'undefined') return;
  const win = window as any;
  if (!win.HSStaticMethods || !win.HSStaticMethods.autoInit) return;
  // small delay to allow DOM to settle when called from preview contexts
  setTimeout(() => {
    try {
      win.HSStaticMethods.autoInit(collection);
    } catch (e) {
      // Ignore errors; runtime adapter may not be present in all environments
      // (avoid logging to keep the production console clean)
    }
  }, 10);
}

export default {
  autoInitPreview
};
