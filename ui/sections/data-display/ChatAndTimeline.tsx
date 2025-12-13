import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../index';
import { Check } from 'lucide-react';

export const ChatAndTimeline: React.FC = () => {
  return (
    <Card bordered className="md:col-span-2">
      <CardTitle>Chat & Timeline</CardTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div>
           <div className="chat chat-start">
             <div className="chat-bubble chat-bubble-primary">What kind of nonsensical gibberish is this?</div>
           </div>
           <div className="chat chat-end">
             <div className="chat-bubble chat-bubble-secondary">Put me on the Council and not make me a Master!??</div>
           </div>
           <CodeLabel label="chat chat-start/end" />
         </div>
         
         <div>
           <ul className="timeline timeline-vertical lg:timeline-horizontal">
             <li>
               <div className="timeline-start timeline-box">Start</div>
               <div className="timeline-middle"><Check className="w-4 h-4 text-primary" /></div>
               <hr className="bg-primary"/>
             </li>
             <li>
               <hr className="bg-primary"/>
               <div className="timeline-middle"><Check className="w-4 h-4 text-primary" /></div>
               <div className="timeline-end timeline-box">Middle</div>
               <hr/>
             </li>
             <li>
               <hr/>
               <div className="timeline-middle"><Check className="w-4 h-4" /></div>
               <div className="timeline-start timeline-box">End</div>
             </li>
           </ul>
           <CodeLabel label="timeline" />
         </div>
      </div>
    </Card>
  );
};
