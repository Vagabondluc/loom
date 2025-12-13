import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../../ui';

export const AccordionAndDiff: React.FC = () => {
  return (
    <Card bordered className="md:col-span-2">
       <CardTitle>Accordion & Diff</CardTitle>
       <div className="flex flex-col lg:flex-row gap-6">
         <div className="join join-vertical w-full lg:w-1/2">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="acc" defaultChecked /> 
              <div className="collapse-title font-medium">Click me to show content</div>
              <div className="collapse-content"><p>hello world</p></div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="acc" /> 
              <div className="collapse-title font-medium">Click me to show content</div>
              <div className="collapse-content"><p>hello world</p></div>
            </div>
            <CodeLabel label="collapse" />
         </div>
         
         <div className="w-full lg:w-1/2">
           <div className="diff aspect-[16/9] rounded-box h-48">
             <div className="diff-item-1">
               <div className="bg-primary text-primary-content text-4xl font-black grid place-content-center">DAISY</div>
             </div>
             <div className="diff-item-2">
               <div className="bg-base-200 text-4xl font-black grid place-content-center">DAISY</div>
             </div>
             <div className="diff-resizer"></div>
           </div>
           <CodeLabel label="diff" />
         </div>
       </div>
    </Card>
  );
};