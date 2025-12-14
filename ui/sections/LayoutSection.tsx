import React from 'react';
import { Card, CardTitle, CodeLabel, Badge, SectionHeaderView } from '../index';

export const LayoutSection: React.FC = () => {
  return (
    <section id="layout" className="space-y-6 scroll-mt-24">
       <SectionHeaderView title={"Layout"} subtitle={<p className="text-base-content/70">Utility components for positioning and grouping elements. <strong>Join</strong> groups items together, <strong>Stack</strong> creates a depth effect, and <strong>Mask</strong> crops images into shapes.</p>} />

       <div className="grid gap-6">
          <Card bordered>
            <CardTitle>Join (Input Group)</CardTitle>
            <div className="join">
               <input className="input input-bordered join-item" placeholder="Search..." />
               <button className="btn join-item rounded-r-full">Subscribe</button>
            </div>
            <CodeLabel label="join" />
          </Card>

          <Card bordered>
            <CardTitle>Indicator</CardTitle>
            <div className="indicator">
              <Badge variant="primary" className="indicator-item">new</Badge> 
              <div className="grid w-32 h-32 bg-base-300 place-items-center rounded-lg">content</div>
            </div>
            <br />
            <CodeLabel label="indicator" />
          </Card>

          <Card bordered>
            <CardTitle>Stack</CardTitle>
            <div className="stack">
              <div className="card shadow-md bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title">Notification 1</h2> 
                  <p>You have 3 unread messages.</p>
                </div>
              </div> 
              <div className="card shadow bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title">Notification 2</h2> 
                  <p>You have 3 unread messages.</p>
                </div>
              </div> 
              <div className="card shadow-sm bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title">Notification 3</h2> 
                  <p>You have 3 unread messages.</p>
                </div>
              </div>
            </div>
            <br />
            <CodeLabel label="stack" />
          </Card>

          <Card bordered>
            <CardTitle>Mask</CardTitle>
            <div className="flex gap-8 items-end">
              <div className="text-center">
                <img className="mask mask-squircle w-24" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" alt="mask" />
                <CodeLabel label="mask-squircle" />
              </div>
              <div className="text-center">
                <img className="mask mask-hexagon w-24" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" alt="mask" />
                <CodeLabel label="mask-hexagon" />
              </div>
              <div className="text-center">
                <img className="mask mask-triangle w-24" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" alt="mask" />
                <CodeLabel label="mask-triangle" />
              </div>
            </div>
          </Card>
       </div>
    </section>
  );
};
