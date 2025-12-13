import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

type Props = {
  id: string;
  desc: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

export const PageTypeCardView: React.FC<Props> = ({ id, desc, selected, onSelect }) => {
  return (
    <div
      className={clsx(
        "card card-bordered cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]",
        selected ? "border-primary ring-1 ring-primary bg-base-100" : "bg-base-100 border-base-300 hover:border-base-content/30"
      )}
      onClick={() => onSelect(id)}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-sm">{id}</h4>
          {selected && <Check className="w-4 h-4 text-primary" />}
        </div>
        <p className="text-xs text-base-content/70">{desc}</p>
      </div>
    </div>
  );
};

export default PageTypeCardView;
