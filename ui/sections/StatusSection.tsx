import React from 'react';
import { Card, CardTitle, CodeLabel } from '../index';

export const StatusSection: React.FC = () => {
  return (
    <section id="status" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Status & Interactive</h2>
        <p className="text-base-content/70">
          Indicators for background processes and temporary notifications. 
          Includes <strong>Loading</strong> states and <strong>Toast</strong> notifications.
        </p>
      </div>

      <Card bordered>
        <CardTitle>Loading Indicators</CardTitle>
        <div className="flex flex-wrap gap-8 items-center justify-center p-8">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
                <div><CodeLabel label="loading-spinner" /></div>
            </div>
            <div className="text-center">
                <span className="loading loading-dots loading-lg text-primary"></span>
                <div><CodeLabel label="loading-dots" /></div>
            </div>
            <div className="text-center">
                <span className="loading loading-ring loading-lg text-secondary"></span>
                <div><CodeLabel label="loading-ring" /></div>
            </div>
            <div className="text-center">
                <span className="loading loading-ball loading-lg text-accent"></span>
                <div><CodeLabel label="loading-ball" /></div>
            </div>
            <div className="text-center">
                <span className="loading loading-bars loading-lg text-info"></span>
                <div><CodeLabel label="loading-bars" /></div>
            </div>
            <div className="text-center">
                <span className="loading loading-infinity loading-lg text-success"></span>
                <div><CodeLabel label="loading-infinity" /></div>
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Toast Bottom End Demo */}
         <Card bordered>
            <CardTitle>Toast (Bottom End)</CardTitle>
            <p className="text-sm opacity-60 mb-4">Simulating viewport corner positioning.</p>
            
            <div className="mockup-window border border-base-300 bg-base-200 h-64 shadow-sm">
              <div className="relative h-full bg-base-100 flex justify-center items-center">
                <div className="opacity-10 text-4xl font-black rotate-45 select-none">CONTENT</div>
                
                {/* Toast Wrapper */}
                <div className="toast toast-end absolute">
                  <div className="alert alert-info shadow-lg">
                    <span>New mail arrived.</span>
                  </div>
                  <div className="alert alert-success shadow-lg">
                    <span>Message sent.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <CodeLabel label="toast toast-end" />
         </Card>

         {/* Toast Top Center Demo */}
         <Card bordered>
             <CardTitle>Toast (Top Center)</CardTitle>
             <p className="text-sm opacity-60 mb-4">Simulating top-center notification.</p>
             
             <div className="mockup-window border border-base-300 bg-base-200 h-64 shadow-sm">
               <div className="relative h-full bg-base-100 flex justify-center items-center">
                 <div className="opacity-10 text-4xl font-black -rotate-12 select-none">VIEWPORT</div>

                 {/* Toast Wrapper */}
                 <div className="toast toast-top toast-center absolute">
                   <div className="alert alert-error shadow-lg">
                     <span>Connection failed.</span>
                   </div>
                 </div>
               </div>
             </div>
             
             <CodeLabel label="toast toast-top toast-center" />
         </Card>
      </div>
    </section>
  );
};
