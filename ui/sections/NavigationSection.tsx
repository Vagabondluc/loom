import React from 'react';
import { Card, CodeLabel, Tabs, Tab } from '../index';
import { Home, Search, Settings } from 'lucide-react';

export const NavigationSection: React.FC = () => {
  return (
    <section id="navigation" className="space-y-6 scroll-mt-24">
       <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Navigation</h2>
        <p className="text-base-content/70">
          Components to help users move through your application. From top-level <strong>Navbars</strong> 
          to context-aware <strong>Breadcrumbs</strong> and multi-step processes.
        </p>
       </div>
       
       <Card bordered>
         <div className="space-y-12">
           
           <div>
             <h3 className="font-bold mb-4">Navbar</h3>
             <div className="navbar bg-base-300 rounded-box">
               <div className="flex-1">
                 <a className="btn btn-ghost text-xl">daisyUI</a>
               </div>
               <div className="flex-none">
                 <ul className="menu menu-horizontal px-1">
                   <li><a>Link</a></li>
                   <li>
                     <details>
                       <summary>Parent</summary>
                       <ul className="p-2 bg-base-100 rounded-t-none">
                         <li><a>Link 1</a></li>
                         <li><a>Link 2</a></li>
                       </ul>
                     </details>
                   </li>
                 </ul>
               </div>
             </div>
             <CodeLabel label="navbar" className="block w-fit mt-2" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <h3 className="font-bold mb-4">Breadcrumbs</h3>
               <div className="text-sm breadcrumbs mb-4 bg-base-200 p-2 rounded-lg">
                 <ul>
                   <li><a>Home</a></li>
                   <li><a>Documents</a></li>
                   <li>Add Document</li>
                 </ul>
               </div>
               <CodeLabel label="breadcrumbs" className="block w-fit mt-2" />
             </div>
             
             <div>
               <h3 className="font-bold mb-4">Bottom Nav</h3>
               <div className="btm-nav relative z-0 rounded-box border border-base-200 h-16">
                  <button className="text-primary active">
                    <Home className="w-5 h-5" />
                  </button>
                  <button className="text-primary">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="text-primary">
                    <Settings className="w-5 h-5" />
                  </button>
               </div>
               <CodeLabel label="btm-nav" className="block w-fit mt-2" />
             </div>
           </div>

           <div>
             <h3 className="font-bold mb-4">Tabs</h3>
             <div className="flex flex-col gap-6">
                <div>
                   <Tabs variant="boxed">
                     <Tab>Tab 1</Tab>
                     <Tab active>Tab 2</Tab>
                     <Tab>Tab 3</Tab>
                   </Tabs>
                   <CodeLabel label="tabs tabs-boxed" className="block w-fit mt-2" />
                </div>
                <div>
                   <Tabs variant="lifted">
                     <Tab>Lifted 1</Tab>
                     <Tab active>Lifted 2</Tab>
                     <Tab>Lifted 3</Tab>
                   </Tabs>
                   <CodeLabel label="tabs tabs-lifted" className="block w-fit mt-2" />
                </div>
             </div>
           </div>

           <div>
             <h3 className="font-bold mb-4">Steps & Pagination</h3>
             <div className="mb-6">
               <ul className="steps w-full">
                 <li className="step step-primary">Register</li>
                 <li className="step step-primary">Choose plan</li>
                 <li className="step">Purchase</li>
                 <li className="step">Receive Product</li>
               </ul>
               <CodeLabel label="steps" className="block w-fit mt-2" />
             </div>
             
             <div>
               <div className="join">
                 <button className="join-item btn">1</button>
                 <button className="join-item btn btn-active">2</button>
                 <button className="join-item btn">3</button>
                 <button className="join-item btn">4</button>
               </div>
               <CodeLabel label="join" className="block w-fit mt-2" />
             </div>
           </div>

         </div>
       </Card>
    </section>
  );
};
