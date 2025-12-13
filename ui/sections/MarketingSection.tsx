import React from 'react';
import { Button, Card, CodeLabel } from '../index';

export const MarketingSection: React.FC = () => {
  return (
    <section id="marketing" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Marketing</h2>
        <p className="text-base-content/70">
          Large visual components for landing pages and structural areas. 
          Includes <strong>Hero</strong> banners, <strong>Footers</strong>, and <strong>Glass</strong> effects.
        </p>
      </div>

      <div className="space-y-6">
        <div className="hero min-h-[300px] rounded-box overflow-hidden" style={{backgroundImage: 'url(https://picsum.photos/id/1015/1000/400)'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.</p>
              <Button variant="primary">Get Started</Button>
            </div>
          </div>
        </div>
        <div className="text-center"><CodeLabel label="hero hero-overlay hero-content" /></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="bg-neutral text-neutral-content">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Glass Effect</h2>
                <div className="mockup-phone border-primary">
                    <div className="camera"></div> 
                    <div className="display">
                        <div className="artboard artboard-demo phone-1 bg-[url('https://picsum.photos/id/1035/300/600')] bg-cover">
                            <div className="card glass text-black m-4 mt-20">
                                <div className="card-body">
                                    <h2 className="card-title">Glass</h2>
                                    <p>Renders a frosted glass effect over the background.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CodeLabel label=".glass" />
              </div>
           </Card>

           <div className="flex flex-col gap-4">
              <footer className="footer p-10 bg-base-200 text-base-content rounded-box">
                <nav>
                  <h6 className="footer-title">Services</h6> 
                  <a className="link link-hover">Branding</a>
                  <a className="link link-hover">Design</a>
                  <a className="link link-hover">Marketing</a>
                </nav> 
                <nav>
                  <h6 className="footer-title">Company</h6> 
                  <a className="link link-hover">About us</a>
                  <a className="link link-hover">Contact</a>
                  <a className="link link-hover">Jobs</a>
                </nav> 
              </footer>
              <div className="text-center"><CodeLabel label="footer" /></div>
           </div>
        </div>
      </div>
    </section>
  );
};
