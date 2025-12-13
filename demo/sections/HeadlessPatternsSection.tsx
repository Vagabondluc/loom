import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../ui';

export const HeadlessPatternsSection: React.FC = () => {
  return (
    <section id="patterns" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Headless Patterns</h2>
        <p className="text-base-content/70">
          Pure CSS, state-driven components that work without JavaScript logic. 
          These patterns use <code>input[type="radio"]</code> and sibling selectors to manage state, 
          making them ideal for the Visual Builder export.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CSS Tabs */}
        <Card bordered>
          <CardTitle>CSS Tabs (Lifted)</CardTitle>
          <p className="text-xs opacity-60 mb-4">
            Uses hidden radio inputs to switch content panes.
          </p>
          
          <div role="tablist" className="tabs tabs-lifted w-full">
            <input type="radio" name="demo_tabs_1" role="tab" className="tab" aria-label="Tab 1" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              Tab content 1. This content is revealed when the first radio is checked.
            </div>

            <input type="radio" name="demo_tabs_1" role="tab" className="tab" aria-label="Tab 2" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              Tab content 2. Notice how the state persists without React state.
            </div>

            <input type="radio" name="demo_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
              Tab content 3. Pure CSS magic.
            </div>
          </div>
          
          <div className="mt-4">
             <CodeLabel label="tabs tabs-lifted" />
             <CodeLabel label="input.tab[type='radio']" className="ml-2" />
          </div>
        </Card>

        {/* CSS Accordion */}
        <Card bordered>
           <CardTitle>CSS Accordion</CardTitle>
           <p className="text-xs opacity-60 mb-4">
             Uses radio inputs for exclusive expansion (one at a time).
           </p>

           <div className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="demo_accordion_1" defaultChecked /> 
                <div className="collapse-title text-xl font-medium">
                  Click to open this one and close others
                </div>
                <div className="collapse-content"> 
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="demo_accordion_1" /> 
                <div className="collapse-title text-xl font-medium">
                  Click to open this one and close others
                </div>
                <div className="collapse-content"> 
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="demo_accordion_1" /> 
                <div className="collapse-title text-xl font-medium">
                  Click to open this one and close others
                </div>
                <div className="collapse-content"> 
                  <p>hello</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
             <CodeLabel label="collapse join-item" />
             <CodeLabel label="input[type='radio']" className="ml-2" />
            </div>
        </Card>

      </div>
    </section>
  );
};