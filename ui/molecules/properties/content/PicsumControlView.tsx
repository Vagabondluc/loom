import React from 'react';
import { Input, FormField, Button, Checkbox } from '../../../..//ui';
import { Image as ImageIcon, RefreshCw } from 'lucide-react';
import { BuilderNode } from '../../../../types';

type PicsumConfig = {
  width: number;
  height: number;
  seed: string;
  grayscale: boolean;
  blur: number;
};

type Props = {
  config: PicsumConfig;
  onUpdate: (updates: Partial<PicsumConfig>) => void;
  onRandomize: () => void;
  onSnapshot?: () => void;
};

export const PicsumControlView: React.FC<Props> = ({ config, onUpdate, onRandomize }) => {
  return (
    <div className="space-y-3 bg-base-100 p-3 rounded-lg border border-base-300">
      <div className="flex items-center gap-2 mb-2 text-xs font-bold opacity-70">
        <ImageIcon className="w-3 h-3" /> Picsum Config
      </div>

      <div className="grid grid-cols-2 gap-2">
        <FormField label="Width">
          <Input type="number" size="xs" value={config.width || 400} onChange={(e) => onUpdate({ width: parseInt(e.target.value) })} />
        </FormField>
        <FormField label="Height">
          <Input type="number" size="xs" value={config.height || 300} onChange={(e) => onUpdate({ height: parseInt(e.target.value) })} />
        </FormField>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2 py-0">
          <Checkbox size="xs" checked={!!config.grayscale} onChange={(e) => onUpdate({ grayscale: e.target.checked })} />
          <span className="label-text text-xs">Grayscale</span>
        </label>
      </div>

      <div className="form-control">
        <label className="label py-0">
          <span className="label-text text-xs">Blur Level ({config.blur || 0})</span>
        </label>
        <input type="range" min="0" max="10" step="1" className="range range-xs" value={config.blur || 0} onChange={(e) => onUpdate({ blur: parseInt(e.target.value) })} />
      </div>

      <Button size="xs" variant="neutral" className="w-full gap-2" onClick={onRandomize}>
        <RefreshCw className="w-3 h-3" /> Randomize Image
      </Button>
    </div>
  );
};

export default PicsumControlView;
