import React from 'react';
import { Input, FormField } from '../../../../index';

const COMMON_ICONS = ['Star', 'Smile', 'Bell', 'User', 'Settings', 'Heart', 'AlertCircle', 'Check', 'X', 'Menu', 'Search', 'ArrowRight', 'ChevronDown'];

type Props = {
  iconName: string;
  size: number;
  strokeWidth: number;
  onSetIconName: (name: string) => void;
  onUpdateSize: (size: number) => void;
  onUpdateStroke: (stroke: number) => void;
  onSnapshot?: () => void;
};

export const IconControlView: React.FC<Props> = ({ iconName, size, strokeWidth, onSetIconName, onUpdateSize, onUpdateStroke }) => {
  return (
    <div className="space-y-3">
      <FormField label="Icon Name">
        <input className="input input-sm input-bordered" value={iconName || ''} onChange={(e) => onSetIconName(e.target.value)} placeholder="e.g. Star" />
      </FormField>

      <div className="flex flex-wrap gap-1">
        {COMMON_ICONS.map(icon => (
          <button key={icon} className="btn btn-xs btn-ghost border border-base-200" onClick={() => onSetIconName(icon)} title={icon}>{icon}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <FormField label="Size (px)">
          <Input size="sm" type="number" value={size} onChange={(e) => onUpdateSize(parseInt(e.target.value))} />
        </FormField>
        <FormField label="Stroke">
          <Input size="sm" type="number" value={strokeWidth} onChange={(e) => onUpdateStroke(parseFloat(e.target.value))} />
        </FormField>
      </div>
    </div>
  );
};

export default IconControlView;
