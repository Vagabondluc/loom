

import React from 'react';
import { Card, CardTitle, Button, CodeLabel } from '../../ui';
import { useRuntimeStore } from '../../stores/runtimeStore';
import { RefreshCw, Database } from 'lucide-react';

export const HtmxSection: React.FC = () => {
  const { variables, fetchData } = useRuntimeStore();
  const demoKey = 'demo.users';

  // Manual Trigger for demonstration outside builder
  const handleFetch = () => {
    fetchData('https://jsonplaceholder.typicode.com/users', 'GET', demoKey);
  };

  const users = variables['demo']?.['users'];
  const loading = variables['demo.users_loading'];
  const error = variables['demo.users_error'];

  return (
    <section id="htmx" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">HTMX-Style Interactions</h2>
        <p className="text-base-content/70">
            Declarative data fetching directly from HTML attributes. In the Builder, you can add 
            <code>data-url</code>, <code>data-trigger</code>, and <code>data-key</code> props to any element 
            to wire up API calls without writing code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <Card bordered>
          <CardTitle className="flex justify-between items-center">
             <span>Runtime Store Demo</span>
             <Button size="sm" onClick={handleFetch} loading={loading}>
                <RefreshCw className="w-3 h-3 mr-2" /> Fetch Users
             </Button>
          </CardTitle>
          
          <div className="bg-base-200 rounded-box p-4 h-64 overflow-y-auto font-mono text-xs">
             {loading && <div className="text-info">Loading data...</div>}
             {error && <div className="text-error">Error: {error}</div>}
             {!loading && !users && <div className="opacity-50">Click fetch to load data into <code>demo.users</code></div>}
             {users && (
                 <pre>{JSON.stringify(users, null, 2)}</pre>
             )}
          </div>
          <CodeLabel label="fetchData('...', 'GET', 'demo.users')" />
        </Card>

        <Card bordered>
           <CardTitle>How it works in Builder</CardTitle>
           <div className="space-y-4">
              <div className="p-4 border border-dashed border-primary/30 rounded-lg bg-base-100">
                  <div className="flex flex-col gap-2">
                      <div className="badge badge-primary badge-outline text-xs">Data Panel</div>
                      <div className="text-sm font-bold">User: {'{{api.user.name}}'}</div>
                      <div className="text-xs opacity-70">Email: {'{{api.user.email}}'}</div>
                  </div>
              </div>
              
              <div className="text-sm space-y-2">
                  <p>1. Drag a <strong>Data Panel</strong> from the palette.</p>
                  <p>2. Set props:</p>
                  <ul className="list-disc list-inside opacity-70 pl-2">
                      <li><code>data-url</code>: https://api.example.com/user/1</li>
                      <li><code>data-key</code>: api.user</li>
                      <li><code>data-trigger</code>: load</li>
                  </ul>
                  <p>3. Use interpolation <code>{'{{api.user.name}}'}</code> in child text nodes.</p>
              </div>
           </div>
        </Card>

      </div>
    </section>
  );
};