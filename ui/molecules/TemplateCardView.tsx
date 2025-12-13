import React from 'react';
import { LayoutTemplate } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Card } from '../molecules/Card';

type Props = {
  id: string;
  label: string;
  category: string;
  onPress?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
};

export const TemplateCardView: React.FC<Props> = ({ id, label, category, onPress, onKeyDown, onPointerDown }) => {
  return (
    <div
      tabIndex={0}
      role="button"
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onClick={onPress}
      className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:border-primary cursor-grab active:cursor-grabbing active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    >
      <div className="card-body p-3 flex-row items-center gap-3">
        <div className="p-2 bg-base-200 rounded-lg">
          <LayoutTemplate className="w-5 h-5 opacity-70" />
        </div>
        <div>
          <h3 className="text-sm font-bold">{label}</h3>
          <Badge size="xs" variant="ghost">{category}</Badge>
        </div>
      </div>
    </div>
  );
};

export default TemplateCardView;
