
import React from 'react';
import { Card, CardTitle, CodeLabel } from '../../../ui';

export const PrelineStyleComparison: React.FC = () => {
  return (
    <Card bordered>
      <CardTitle>Style Comparison</CardTitle>
      <div className="space-y-6">
          <div>
              <h4 className="text-xs font-bold uppercase opacity-50 mb-2">Preline (Utility Heavy)</h4>
              <div className="flex flex-wrap gap-2">
                  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Solid
                  </button>
                  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
                    Outline
                  </button>
                  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
                    Ghost
                  </button>
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
