import React from 'react';
import { Card, CardTitle, CodeLabel, Badge } from '../../../ui';

export const AvatarsAndBadges: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Avatars & Badges</CardTitle>
      <div className="flex gap-4 items-center mb-4">
        <div className="text-center">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
            </div>
          </div>
          <div><CodeLabel label="avatar" /></div>
        </div>
        <div className="text-center">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
            </div>
          </div>
          <div><CodeLabel label="avatar online" /></div>
        </div>
        <div className="text-center">
          <div className="avatar placeholder">
             <div className="bg-neutral text-neutral-content rounded-full w-16">
               <span className="text-xl">UI</span>
             </div>
          </div>
          <div><CodeLabel label="avatar placeholder" /></div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-wrap gap-2">
        <Badge>neutral</Badge>
        <Badge variant="primary">primary</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="accent">accent</Badge>
        <Badge variant="ghost">ghost</Badge>
        <Badge outline>outline</Badge>
      </div>
      <CodeLabel label="badge" />
    </Card>
  );
};