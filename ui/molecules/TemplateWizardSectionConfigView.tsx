import React from 'react';
import { Layout } from 'lucide-react';

type Props = {
  section: string;
  config: any;
  onChange: (key: string, value: any) => void;
};

export const TemplateWizardSectionConfigView: React.FC<Props> = ({ section, config = {}, onChange }) => {
  return (
    <div className="bg-base-200/50 p-4 border-t border-base-200 rounded-b-xl animate-in slide-in-from-top-1">
      <div className="text-[10px] font-bold uppercase opacity-40 mb-3 tracking-wider flex items-center gap-2">
        <Layout className="w-3 h-3" /> Section Configuration
      </div>

      {section === 'Hero' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label text-xs py-1">Layout</label>
            <select className="select select-bordered select-xs" value={config.layout || 'split'} onChange={(e) => onChange('layout', e.target.value)}>
              <option value="split">Split (Left/Right)</option>
              <option value="centered">Centered</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label text-xs py-1">Media</label>
            <select className="select select-bordered select-xs" value={config.image || 'default'} onChange={(e) => onChange('image', e.target.value)}>
              <option value="default">Image</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      )}

      {(section === 'Feature Grid' || section === 'Features') && (
        <div className="form-control">
          <label className="label text-xs py-1">Count</label>
          <div className="join">
            {[3, 4, 6].map(n => (
              <button key={n} className={`join-item btn btn-xs ${config.count === n ? 'btn-active' : ''}`} onClick={() => onChange('count', n)}>{n}</button>
            ))}
          </div>
        </div>
      )}

      {section === 'Footer' && (
        <div className="form-control">
          <label className="label text-xs py-1">Complexity</label>
          <div className="join">
            <button className={`join-item btn btn-xs ${config.style === 'simple' ? 'btn-active' : ''}`} onClick={() => onChange('style', 'simple')}>Simple</button>
            <button className={`join-item btn btn-xs ${config.style === 'complex' ? 'btn-active' : ''}`} onClick={() => onChange('style', 'complex')}>Multi-Column</button>
          </div>
        </div>
      )}

      {section !== 'Hero' && section !== 'Feature Grid' && section !== 'Features' && section !== 'Footer' && (
        <div className="text-xs opacity-50 italic">No specific overrides available for this section.</div>
      )}
    </div>
  );
};

export default TemplateWizardSectionConfigView;
