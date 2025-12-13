import React from 'react';
import { Card, CardTitle, CodeLabel, Badge } from '../../index';

export const AvatarsAndBadges: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Avatars & Badges</CardTitle>
      <div className="flex items-center gap-4">
         <div className="avatar">
           <div className="w-12 rounded-full">
             <img src="https://i.pravatar.cc/100" alt="avatar" />
           </div>
         </div>
         <div>
           <div className="font-bold">Jane Doe <Badge className="ml-2">Pro</Badge></div>
           <div className="text-sm opacity-60">Product Designer</div>
         </div>
      </div>
      <div className="mt-4"><CodeLabel label="avatar badge" /></div>
    </Card>
  );
};
