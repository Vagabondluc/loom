import React from 'react';
import { CodeLabel } from '../../ui';

export const MockupSection: React.FC = () => {
  return (
    <section id="mockup" className="space-y-6 scroll-mt-24">
       <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Mockups</h2>
        <p className="text-base-content/70">
          Pre-designed containers that mimic operating system windows, mobile devices, 
          or browser frames to showcase content or screenshots.
        </p>
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div>
           <div className="mockup-code">
             <pre data-prefix="$"><code>npm install daisyui</code></pre> 
             <pre data-prefix=">" className="text-warning"><code>installing...</code></pre> 
             <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
           </div>
           <CodeLabel label="mockup-code" />
         </div>

         <div>
           <div className="mockup-window border bg-base-300">
             <div className="flex justify-center px-4 py-16 bg-base-200">Hello!</div>
           </div>
           <CodeLabel label="mockup-window" />
         </div>

         <div>
           <div className="mockup-phone">
              <div className="camera"></div> 
              <div className="display">
                <div className="artboard artboard-demo phone-1">Hi.</div>
              </div>
           </div>
           <CodeLabel label="mockup-phone" />
         </div>

         <div>
           <div className="mockup-browser border bg-base-300">
             <div className="mockup-browser-toolbar">
               <div className="input">https://daisyui.com</div>
             </div>
             <div className="flex justify-center px-4 py-16 bg-base-200">Browser Content</div>
           </div>
           <CodeLabel label="mockup-browser" />
         </div>
       </div>
    </section>
  );
};