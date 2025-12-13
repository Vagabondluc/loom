
import React from 'react';
import { AvatarsAndBadges } from './data-display/AvatarsAndBadges';
import { StatsDisplay } from './data-display/StatsDisplay';
import { ChatAndTimeline } from './data-display/ChatAndTimeline';
import { AccordionAndDiff } from './data-display/AccordionAndDiff';
import { CountdownAndKbd } from './data-display/CountdownAndKbd';

export const DataDisplaySection: React.FC = () => {
  return (
    <section id="display" className="space-y-6 scroll-mt-24">
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Data Display</h2>
        <p className="text-base-content/70">
          Components designed to present information in a clear and organized way. 
          Includes <strong>Avatars</strong>, <strong>Stats</strong>, <strong>Chat Bubbles</strong>, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AvatarsAndBadges />
        <StatsDisplay />
        <ChatAndTimeline />
        <AccordionAndDiff />
        <CountdownAndKbd />
      </div>
    </section>
  );
};
