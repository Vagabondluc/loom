export const prelineAccordionTemplate = `
<div class="hs-accordion active" id="acc-1">
  <button class="hs-accordion-toggle py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    Accordion Item #1
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  </button>
  <div id="acc-content-1" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region">
    <div class="pb-4 px-1">
      <p class="text-gray-800 dark:text-gray-200">
        This is the accordion body.
      </p>
    </div>
  </div>
</div>
<div class="hs-accordion" id="acc-2">
  <button class="hs-accordion-toggle py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
    Accordion Item #2
    <svg class="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    <svg class="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
  </button>
  <div id="acc-content-2" class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region">
    <div class="pb-4 px-1">
      <p class="text-gray-800 dark:text-gray-200">
        This is the second item.
      </p>
    </div>
  </div>
</div>
`;

export const prelineModalTemplate = `
<div id="my-modal" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
  <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
    <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
        <h3 class="font-bold text-gray-800 dark:text-white">Modal title</h3>
        <button type="button" class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" data-hs-overlay="#my-modal">
          <span class="sr-only">Close</span>
          <span class="size-4">X</span>
        </button>
      </div>
      <div class="p-4 overflow-y-auto">
        <p class="text-gray-800 dark:text-neutral-400">Modal content goes here.</p>
      </div>
    </div>
  </div>
</div>
<button type="button" class="btn btn-primary" data-hs-overlay="#my-modal">Open Modal</button>
`;

export const prelineTabsTemplate = `
<div class="border-b border-gray-200 dark:border-gray-700">
  <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
    <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab">
      Tab 1
    </button>
    <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab">
      Tab 2
    </button>
  </nav>
</div>
<div class="mt-3">
  <div id="tabs-with-underline-1" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
    <p class="text-gray-500 dark:text-gray-400">Content for Tab 1.</p>
  </div>
  <div id="tabs-with-underline-2" class="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
    <p class="text-gray-500 dark:text-gray-400">Content for Tab 2.</p>
  </div>
</div>
`;

export const genericFallbackTemplate = (label: string) => `
<div class="p-4 border border-dashed border-base-content/20 rounded opacity-50 flex items-center justify-center h-32">
   ${label} Content
</div>
`;
