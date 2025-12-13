import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../../ui';

export const StatsDisplay: React.FC = () => {
  return (
    <Card bordered>
       <CardTitle>Stats</CardTitle>
       <div className="stats shadow w-full">
         <div className="stat">
           <div className="stat-title">Downloads</div>
           <div className="stat-value">31K</div>
           <div className="stat-desc">Jan 1st - Feb 1st</div>
         </div>
         <div className="stat">
           <div className="stat-title">New Users</div>
           <div className="stat-value text-secondary">4,200</div>
           <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
         </div>
       </div>
       <CodeLabel label="stats" />
    </Card>
  );
};