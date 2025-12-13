import React from 'react';
import { clsx } from 'clsx';

type StyleOption = { id: string; desc: string };

type Props = {
  options: StyleOption[];
  selected: string;
  onSelect: (id: string) => void;
};

export const VisualStyleSelectorView: React.FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(style => (
        <button
          key={style.id}
          className={clsx(
            "btn btn-sm",
            selected === style.id ? "btn-secondary" : "btn-ghost border-base-300"
          )}
          onClick={() => onSelect(style.id)}
        >
          {style.id}
        </button>
      ))}
    </div>
  );
};

export default VisualStyleSelectorView;
