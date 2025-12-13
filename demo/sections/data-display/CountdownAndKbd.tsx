import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../../ui';

export const CountdownAndKbd: React.FC = () => {
  return (
    <Card bordered className="md:col-span-2">
      <CardTitle>Countdown & Kbd</CardTitle>
      <div className="flex items-center gap-12">
         <div className="text-center">
           <span className="countdown font-mono text-4xl">
             <span style={{"--value":55} as React.CSSProperties}></span>
           </span>
           <div><CodeLabel label="countdown" /></div>
         </div>
         <div>
           <div className="flex gap-2">
             <kbd className="kbd">Ctrl</kbd>
             <kbd className="kbd">Shift</kbd>
             <kbd className="kbd">Del</kbd>
           </div>
           <CodeLabel label="kbd" />
         </div>
      </div>
    </Card>
  );
};