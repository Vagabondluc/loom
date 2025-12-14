
import React from 'react';
import { Card, CardTitle, CodeLabel, PrelineButtonView } from '../../../ui';

export const PrelineStyleComparison: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Style Comparison</CardTitle>
      <div className="space-y-6">
          <div>
              <h4 className="text-xs font-bold uppercase opacity-50 mb-2">Preline (Utility Heavy)</h4>
              <div className="flex flex-wrap gap-2">
                  <PrelineButtonView variant="solid">Solid</PrelineButtonView>
                  <PrelineButtonView variant="outline">Outline</PrelineButtonView>
                  <PrelineButtonView variant="ghost">Ghost</PrelineButtonView>
              </div>
              <CodeLabel label="py-3 px-4 inline-flex ... bg-blue-600" />
          </div>

          <div className="divider">VS</div>

          <div>
              <h4 className="text-xs font-bold uppercase opacity-50 mb-2">DaisyUI (Component Class)</h4>
              <div className="flex flex-wrap gap-2">
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-outline">Outline</button>
                  <button className="btn btn-ghost">Ghost</button>
              </div>
              <CodeLabel label="btn btn-primary" />
          </div>
      </div>
    </Card>
  );
};
