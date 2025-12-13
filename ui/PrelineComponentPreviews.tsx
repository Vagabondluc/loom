import React from 'react';
import { Card, CardTitle, CodeLabel } from './index';

export const PrelineComponentPreviews: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Component Previews</CardTitle>
      <p className="text-xs opacity-70 mb-4">
        This section shows both static components (like Alerts) and static previews of JS-driven components.
        Interactivity for marked components is enabled in Preview Mode or the Playground.
      </p>
      <div className="space-y-8">
        
        {/* Preline Alert */}
        <div>
            <h3 className="font-semibold mb-2">Alerts</h3>
            <div className="space-y-4">
                <div className="bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4" role="alert">
                  <span className="font-bold">Info!</span> This is an informational alert.
                </div>
                <div className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4" role="alert">
                  <span className="font-bold">Danger!</span> This is a warning alert.
                </div>
                 <div className="bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4" role="alert">
                  <span className="font-bold">Warning!</span> Please be careful.
                </div>
            </div>
            <CodeLabel label="<div class='bg-blue-100 border...'>" />
        </div>

        <div className="divider"></div>

        {/* Static Accordion */}
        <div>
          <h3 className="font-semibold mb-2">Accordion (Interactive in Preview)</h3>
          <div className="hs-accordion-group">
            <div className="hs-accordion active">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start">
                Accordion #1 (Open by default)
                <svg className="hs-accordion-active:block hidden w-4 h-4" width="24" height="24"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              <div className="hs-accordion-content w-full overflow-hidden">
                <p>This content is visible because the 'active' class is present.</p>
              </div>
            </div>
            <div className="hs-accordion">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start">
                Accordion #2
                <svg className="hs-accordion-active:hidden block w-4 h-4" width="24" height="24"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className="hs-accordion-content hidden w-full overflow-hidden">
                <p>This content is hidden.</p>
              </div>
            </div>
          </div>
          <CodeLabel label="<div class='hs-accordion active'>" />
        </div>
        
        <div className="divider"></div>

        {/* Static Tabs */}
        <div>
          <h3 className="font-semibold mb-2">Tabs (Interactive in Preview)</h3>
          <div className="border-b">
            <nav className="flex space-x-2">
              <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 border-b-2 font-semibold border-blue-600 text-blue-600">
                Tab 1
              </button>
              <button type="button" className="py-4 px-1 border-b-2 border-transparent">
                Tab 2
              </button>
            </nav>
          </div>
          <div className="mt-3">
            <div><p>Content for Tab 1 is shown.</p></div>
            <div className="hidden"><p>Content for Tab 2 is hidden.</p></div>
          </div>
          <CodeLabel label="<button class='... hs-tab-active:border-blue-600 active'>" />
        </div>

        <div className="divider"></div>

        {/* Static Modal */}
        <div>
           <h3 className="font-semibold mb-2">Modal (Interactive in Preview)</h3>
           <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 w-full max-w-lg">
              <div className="flex justify-between items-center py-3 px-4 border-b"><h3 className="font-bold">Modal Preview</h3></div>
              <div className="p-4"><p>This is the modal body, shown statically.</p></div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button className="py-2 px-3 btn btn-sm btn-ghost">Close</button>
                <button className="py-2 px-3 btn btn-sm btn-primary">Save</button>
              </div>
          </div>
          <CodeLabel label="Static modal markup (not an overlay)" />
        </div>
      </div>
    </Card>
  );
};
