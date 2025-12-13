import React from 'react';
import { Button, Card, CardTitle, CodeLabel } from '../../ui';
import { Zap, X, Menu } from 'lucide-react';

interface ActionsSectionProps {
  onOpenModal: () => void;
}

export const ActionsSection: React.FC<ActionsSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="actions" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Actions</h2>
        <p className="text-base-content/70">
          Action components allow users to trigger events, navigate, or make choices. 
          This section includes standard <strong>Buttons</strong>, <strong>Dropdowns</strong> for menus, 
          <strong>Swaps</strong> for toggle states, and <strong>Modals</strong> for focused tasks.
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card bordered>
          <CardTitle>Buttons (Variants)</CardTitle>
          <p className="text-sm mb-4 opacity-70">Use variants to indicate the hierarchy of actions.</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'btn-primary', el: <Button variant="primary">Primary</Button> },
              { label: 'btn-secondary', el: <Button variant="secondary">Secondary</Button> },
              { label: 'btn-accent', el: <Button variant="accent">Accent</Button> },
              { label: 'btn-neutral', el: <Button variant="neutral">Neutral</Button> },
              { label: 'btn-info', el: <Button variant="info">Info</Button> },
              { label: 'btn-success', el: <Button variant="success">Success</Button> },
              { label: 'btn-warning', el: <Button variant="warning">Warning</Button> },
              { label: 'btn-error', el: <Button variant="error">Error</Button> },
              { label: 'btn-ghost', el: <Button variant="ghost">Ghost</Button> },
              { label: 'btn-link', el: <Button variant="link">Link</Button> },
            ].map((item, i) => (
              <div key={i} className="text-center">
                {item.el}
                <CodeLabel label={item.label} className="block w-fit mx-auto" />
              </div>
            ))}
          </div>
          
          <div className="divider">Sizes & Shapes</div>
          <p className="text-sm mb-4 opacity-70">Adjust dimensions to fit your layout density.</p>
          <div className="flex flex-wrap gap-4 items-end">
            {[
              { label: 'btn-lg', el: <Button size="lg">Large</Button> },
              { label: 'btn-md', el: <Button size="md">Normal</Button> },
              { label: 'btn-sm', el: <Button size="sm">Small</Button> },
              { label: 'btn-xs', el: <Button size="xs">Tiny</Button> },
            ].map((item, i) => (
              <div key={i} className="text-center">
                {item.el}
                <CodeLabel label={item.label} className="block w-fit mx-auto" />
              </div>
            ))}
            <div className="text-center">
              <button className="btn btn-circle btn-primary"><Zap className="w-4 h-4" /></button>
              <CodeLabel label="btn-circle" className="block w-fit mx-auto" />
            </div>
            <div className="text-center">
              <button className="btn btn-square btn-outline"><X className="w-4 h-4" /></button>
              <CodeLabel label="btn-square" className="block w-fit mx-auto" />
            </div>
            <div className="text-center">
              <Button wide>Wide</Button>
              <CodeLabel label="btn-wide" className="block w-fit mx-auto" />
            </div>
            <div className="text-center">
              <Button disabled>Disabled</Button>
              <CodeLabel label="[disabled]" className="block w-fit mx-auto" />
            </div>
            <div className="text-center">
              <Button loading>Loading</Button>
              <CodeLabel label="[loading]" className="block w-fit mx-auto" />
            </div>
          </div>
        </Card>

        <Card bordered>
          <CardTitle>Dropdowns</CardTitle>
          <p className="text-sm mb-4 opacity-70">Overlay menus for navigation or selection.</p>
          <div className="flex flex-wrap gap-20">
            <div>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">Click Me</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
              <CodeLabel label="dropdown" className="block w-fit mx-auto" />
            </div>
            <div>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">Hover Me</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
              <CodeLabel label="dropdown-hover" className="block w-fit mx-auto" />
            </div>
            <div>
              <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn m-1">Right Align</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
              <CodeLabel label="dropdown-right" className="block w-fit mx-auto" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card bordered>
            <CardTitle>Swap</CardTitle>
            <p className="text-sm mb-4 opacity-70">Toggle between two visual states (e.g., icons).</p>
            <div className="flex gap-8">
              <div className="text-center">
                <label className="swap swap-rotate btn btn-circle btn-ghost">
                  <input type="checkbox" />
                  <div className="swap-on"><X /></div>
                  <div className="swap-off"><Menu /></div>
                </label>
                <CodeLabel label="swap-rotate" className="block w-fit mx-auto" />
              </div>
              <div className="text-center">
                <label className="swap btn btn-outline">
                  <input type="checkbox" />
                  <div className="swap-on">ON</div>
                  <div className="swap-off">OFF</div>
                </label>
                <CodeLabel label="swap" className="block w-fit mx-auto" />
              </div>
            </div>
          </Card>

          <Card bordered>
            <CardTitle>Modal</CardTitle>
            <p className="text-sm mb-4 opacity-70">Native <code>&lt;dialog&gt;</code> element styled for interactions.</p>
            <div className="text-center sm:text-left">
              <Button onClick={onOpenModal}>Open Modal</Button>
              <CodeLabel label="dialog.modal" className="block w-fit mx-auto sm:mx-0" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};