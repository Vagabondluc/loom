import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../index';

export const CountdownAndKbd: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Countdown & Keyboard</CardTitle>
      <div className="flex items-center justify-between">
         <div className="countdown font-mono text-2xl">00:02:30</div>
         <div><kbd className="kbd">Space</kbd></div>
      </div>
      <div className="mt-4"><CodeLabel label="countdown kbd" /></div>
    </Card>
  );
};
