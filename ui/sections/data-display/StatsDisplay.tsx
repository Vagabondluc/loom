import React from 'react';
import { Card, CardTitle } from '../../index';

export const StatsDisplay: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Stats</CardTitle>
      <div className="grid grid-cols-3 gap-4">
         <div className="stat">23K</div>
         <div className="stat">4.5</div>
         <div className="stat">12</div>
      </div>
    </Card>
  );
};
