import React from 'react';
import { FileText, AlignLeft, Heading, Ban, Image as ImageIcon, Box, Link as LinkIcon } from 'lucide-react';
import { clsx } from 'clsx';

type Props = {
  textMode: string;
  imageMode: string;
  onChangeTextMode: (mode: string) => void;
  onChangeImageMode: (mode: string) => void;
};

export const TemplateWizardContentStrategyView: React.FC<Props> = ({ textMode, imageMode, onChangeTextMode, onChangeImageMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
      <div className="form-control w-full">
        <label className="label text-sm font-bold opacity-70">Text Placeholders</label>
        <div className="join w-full">
          {[
            { id: 'realistic', label: 'Realistic', icon: FileText },
            { id: 'lorem', label: 'Lorem', icon: AlignLeft },
            { id: 'headings', label: 'Heads', icon: Heading },
            { id: 'empty', label: 'None', icon: Ban }
          ].map(opt => (
            <input
              key={opt.id}
              className="join-item btn btn-sm flex-1"
              type="radio"
              name="textMode"
              aria-label={opt.label}
              checked={textMode === opt.id}
              onChange={() => onChangeTextMode(opt.id)}
            />
          ))}
        </div>
        <div className="label">
          <span className="label-text-alt opacity-60">
            {textMode === 'realistic' && 'Context-aware marketing copy.'}
            {textMode === 'lorem' && 'Standard Latin filler text.'}
            {textMode === 'headings' && 'Headlines only, no body text.'}
            {textMode === 'empty' && 'Structural skeleton only.'}
          </span>
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label text-sm font-bold opacity-70">Image Placeholders</label>
        <div className="join w-full">
          {[
            { id: 'picsum', label: 'Picsum', icon: ImageIcon },
            { id: 'solid', label: 'Solid', icon: Box },
            { id: 'custom', label: 'URL', icon: LinkIcon },
            { id: 'none', label: 'None', icon: Ban }
          ].map(opt => (
            <input
              key={opt.id}
              className="join-item btn btn-sm flex-1"
              type="radio"
              name="imageMode"
              aria-label={opt.label}
              checked={imageMode === opt.id}
              onChange={() => onChangeImageMode(opt.id)}
            />
          ))}
        </div>
        <div className="label">
          <span className="label-text-alt opacity-60">
            {imageMode === 'picsum' && 'Random stock photography.'}
            {imageMode === 'solid' && 'Neutral colored blocks.'}
            {imageMode === 'custom' && 'Static placeholder URL.'}
            {imageMode === 'none' && 'Layout containers only.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemplateWizardContentStrategyView;
