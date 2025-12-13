import React from 'react';
import { Card, CodeLabel, Alert } from '../../ui';

export const FeedbackSection: React.FC = () => {
  return (
    <section id="feedback" className="space-y-6 scroll-mt-24">
       <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Feedback</h2>
        <p className="text-base-content/70">
          Communicate system state to the user. Use <strong>Alerts</strong> for messages, 
          <strong>Progress</strong> bars for loading states, and <strong>Skeletons</strong> for placeholders.
        </p>
       </div>
       
       <Card bordered>
         <div className="space-y-8">
           <div className="flex flex-col gap-2">
             <Alert variant="info">
               New software update available.
             </Alert>
             <CodeLabel label="alert alert-info" />
             
             <Alert variant="success" className="mt-2">
               Your changes have been saved.
             </Alert>
             <CodeLabel label="alert alert-success" />
           </div>

           <div className="divider">Progress Indicators</div>
           <div className="flex flex-col gap-4">
             <div>
               <progress className="progress w-full"></progress>
               <CodeLabel label="progress" />
             </div>
             <div>
               <progress className="progress progress-primary w-full" value="40" max="100"></progress>
               <CodeLabel label="progress progress-primary" />
             </div>
             <div>
               <progress className="progress progress-error w-full" value="70" max="100"></progress>
               <CodeLabel label="progress progress-error" />
             </div>
           </div>

           <div className="flex gap-12 items-end">
             <div className="text-center">
               <div className="radial-progress text-primary" style={{"--value":70} as React.CSSProperties} role="progressbar">70%</div>
               <div><CodeLabel label="radial-progress" /></div>
             </div>
             <div className="text-center">
               <div className="tooltip" data-tip="hello">
                  <button className="btn">Hover me for Tooltip</button>
               </div>
               <div><CodeLabel label="tooltip" /></div>
             </div>
           </div>

           <div>
             <div className="flex flex-col gap-4 w-full">
               <div className="skeleton h-32 w-full"></div>
               <div className="skeleton h-4 w-28"></div>
               <div className="skeleton h-4 w-full"></div>
               <div className="skeleton h-4 w-full"></div>
             </div>
             <CodeLabel label="skeleton" />
           </div>
         </div>
       </Card>
    </section>
  );
};